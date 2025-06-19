require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PayOS = require("@payos/node");

const app = express();
const payos = new PayOS(
  process.env.CLIENT_ID,
  process.env.API_KEY,
  process.env.CHECKSUM_KEY
);

app.use(cors());
app.use(bodyParser.json());

/* ------------------- Bộ nhớ tạm (dùng DB trong production) ------------------ */
const paymentLinksStore = [];   // Lưu payment-link đã tạo
const transactionsStore = [];   // Lưu giao dịch từ webhook

/* ------------------- 0. Route mặc định ------------------ */
app.get("/", (_, res) => {
  res.send("Server is running. Welcome to GameProduc backend!");
});

/* ------------------- 1. Tạo payment‑link ------------------ */
app.post("/api/create-payment-link", async (req, res) => {
  const { orderCode, amount, description } = req.body;
  const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN || "http://localhost:5173" ||"https://exe-201-gameproduct-2.vercel.app";

  try {
    const paymentLink = await payos.createPaymentLink({
      orderCode,
      amount,
      description,
      returnUrl: `${FRONTEND_DOMAIN}/return-url`,
      cancelUrl: `${FRONTEND_DOMAIN}/?canceled=true`,
    });

    paymentLinksStore.push({ ...paymentLink, createdAt: new Date() });
    res.json(paymentLink);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/* ------------------- 2. Lấy payment-link theo mã ------------------ */
app.get("/api/payment/:orderCode", async (req, res) => {
  try {
    const data = await payos.getPaymentLinkInformation(req.params.orderCode);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/* ------------------- 3. Lấy transaction theo mã ------------------ */
app.get("/api/transaction/:orderCode", async (req, res) => {
  try {
    const data = await payos.getTransaction(req.params.orderCode);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/* ------------------- 4. Nhận webhook từ PayOS ------------------ */
app.post("/api/payos-webhook", (req, res) => {
  try {
    const w = req.body;

    const mapStatus = (s) => {
      if (["SUCCEEDED", "SUCCESS", "PAID"].includes(s)) return "PAID";
      if (["CANCELED", "CANCELLED"].includes(s)) return "CANCELED";
      return s;
    };

    transactionsStore.push({
      orderCode: w.orderCode,
      amount: w.amount,
      status: mapStatus(w.status),
      bankName: w.bankCode || w.bankName || "Khác",
      channelName: w.channelCode || w.channelName || "Khác",
      description: w.description,
      createdAt: new Date(), // hoặc w.paidAt nếu có
    });

    console.log("📥 Webhook received:", w.orderCode, mapStatus(w.status));
    res.json({ success: true });
  } catch (err) {
    console.error("Webhook error:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ------------------- 5. Hủy payment-link ------------------ */
app.put("/api/cancel-payment/:orderCode", async (req, res) => {
  try {
    const result = await payos.cancelPaymentLink(
      req.params.orderCode,
      req.body.cancellationReason
    );
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/* ------------------- 6. Trả danh sách payment‑links ------------------ */
app.get("/api/payment-links", (_, res) => {
  res.json(paymentLinksStore);
});

/* ------------------- 7. Trả danh sách giao dịch ------------------ */
app.get("/api/transactions", (_, res) => {
  res.json(transactionsStore);
});

/* ------------------- 8. Thống kê hôm nay (tổng doanh thu + đơn) ------------------ */
app.get("/api/stats/today", (_, res) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const todayTx = transactionsStore.filter(
    (t) => new Date(t.createdAt) >= start && new Date(t.createdAt) <= end
  );

  const totalRevenue = todayTx.reduce((sum, t) => sum + t.amount, 0);
  res.json({
    totalRevenue,
    totalOrders: todayTx.length,
  });
});

/* ------------------- 9. Khởi động server ------------------ */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
