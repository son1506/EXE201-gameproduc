
const PayOS = require("@payos/node");

const payos = new PayOS(
  process.env.CLIENT_ID,
  process.env.API_KEY,
  process.env.CHECKSUM_KEY
);

// Helper to parse body for POST/PUT
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
  });
}

module.exports = async (req, res) => {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // In-memory stores (not persistent!)
  if (!global.paymentLinksStore) global.paymentLinksStore = [];
  if (!global.transactionsStore) global.transactionsStore = [];
  const paymentLinksStore = global.paymentLinksStore;
  const transactionsStore = global.transactionsStore;

  // Routing
  const url = req.url;

  // Root
  if (req.method === "GET" && url === "/") {
    res.statusCode = 200;
    res.end("Server is running. Welcome to GameProduc backend!");
    return;
  }

  // Create payment link
  if (req.method === "POST" && url === "/api/create-payment-link") {
    try {
      const body = await parseBody(req);
      const { orderCode, amount, description } = body;
      const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN || "https://exe-201-gameproduct-2.vercel.app/";
      const paymentLink = await payos.createPaymentLink({
        orderCode,
        amount,
        description,
        returnUrl: `${FRONTEND_DOMAIN}/return-url`,
        cancelUrl: `${FRONTEND_DOMAIN}/?canceled=true`,
      });
      paymentLinksStore.push({ ...paymentLink, createdAt: new Date() });
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(paymentLink));
    } catch (err) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // Get payment link info
  if (req.method === "GET" && url.startsWith("/api/payment/")) {
    try {
      const orderCode = url.split("/api/payment/")[1];
      const data = await payos.getPaymentLinkInformation(orderCode);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
    } catch (err) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // Get transaction info
  if (req.method === "GET" && url.startsWith("/api/transaction/")) {
    try {
      const orderCode = url.split("/api/transaction/")[1];
      const data = await payos.getTransaction(orderCode);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
    } catch (err) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // PayOS webhook
  if (req.method === "POST" && url === "/api/payos-webhook") {
    try {
      const w = await parseBody(req);
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
        createdAt: new Date(),
      });
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ success: true }));
    } catch (err) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // Cancel payment link
  if (req.method === "PUT" && url.startsWith("/api/cancel-payment/")) {
    try {
      const orderCode = url.split("/api/cancel-payment/")[1];
      const body = await parseBody(req);
      const result = await payos.cancelPaymentLink(orderCode, body.cancellationReason);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result));
    } catch (err) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // Get all payment links
  if (req.method === "GET" && url === "/api/payment-links") {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(paymentLinksStore));
    return;
  }

  // Get all transactions
  if (req.method === "GET" && url === "/api/transactions") {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(transactionsStore));
    return;
  }

  // Get today's stats
  if (req.method === "GET" && url === "/api/stats/today") {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const todayTx = transactionsStore.filter(
      (t) => new Date(t.createdAt) >= start && new Date(t.createdAt) <= end
    );
    const totalRevenue = todayTx.reduce((sum, t) => sum + t.amount, 0);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      totalRevenue,
      totalOrders: todayTx.length,
    }));
    return;
  }

  // Not found
  res.statusCode = 404;
  res.end("Not found");
};
