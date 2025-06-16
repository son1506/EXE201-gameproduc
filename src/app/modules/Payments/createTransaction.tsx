import { message } from "antd";

/* ------------------------------------------------------------------ */
/*  URL gốc của backend – đọc từ .env                                 */
/* ------------------------------------------------------------------ */
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

/* ------------------------------------------------------------------ */
/* 1.GET /api/transaction/:orderCode                                 */
/* ------------------------------------------------------------------ */
export async function getTransaction(orderCode: string | number) {
  if (!orderCode) throw new Error("Mã đơn hàng không được để trống.");

  const res = await fetch(`${BACKEND_API_URL}/api/transaction/${orderCode}`);
  if (!res.ok) throw new Error(`Không lấy được transaction (HTTP ${res.status})`);

  message.success("Lấy thông tin giao dịch thành công!");
  return res.json();
}

/* ------------------------------------------------------------------ */
/* 2.GET /api/payment/:orderCode                                     */
/* ------------------------------------------------------------------ */
export async function getPaymentInfo(orderCode: string | number) {
  if (!orderCode) throw new Error("Mã đơn hàng không được để trống.");

  const res = await fetch(`${BACKEND_API_URL}/api/payment/${orderCode}`);
  if (!res.ok) throw new Error(`Không lấy được payment (HTTP ${res.status})`);

  message.success("Lấy thông tin thanh toán thành công!");
  return res.json();
}

/* ------------------------------------------------------------------ */
/* 3.PUT /api/cancel-payment/:orderCode                              */
/* ------------------------------------------------------------------ */
export async function cancelPayment(
  orderCode: string | number,
  cancellationReason = "Người dùng yêu cầu hủy"
) {
  if (!orderCode) throw new Error("Mã đơn hàng không được để trống.");

  const res = await fetch(
    `${BACKEND_API_URL}/api/cancel-payment/${orderCode}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cancellationReason }),
    }
  );
  if (!res.ok) throw new Error(`Hủy thanh toán thất bại (HTTP ${res.status})`);

  message.success("Hủy thanh toán thành công!");
  return res.json();
}

/* ------------------------------------------------------------------ */
/* 4.GET /api/stats/today  → thống kê hôm nay                        */
/* ------------------------------------------------------------------ */
export async function getTodayStats() {
  const res = await fetch(`${BACKEND_API_URL}/api/stats/today`);
  if (!res.ok) throw new Error(`Không lấy được thống kê hôm nay (HTTP ${res.status})`);

  return res.json();   // { totalRevenue: number, totalOrders: number }
}

/* ------------------------------------------------------------------ */
/* 5.GET /api/transactions  → toàn bộ giao dịch (dùng cho dashboard) */
/* ------------------------------------------------------------------ */
export async function getAllTransactions() {
  const res = await fetch(`${BACKEND_API_URL}/api/transactions`);
  if (!res.ok) throw new Error(`Không lấy được danh sách giao dịch (HTTP ${res.status})`);

  return res.json();   // Transaction[]
}

/* ------------------------------------------------------------------ */
/* 6.GET /api/payment-links  → danh sách payment‑link                */
/* ------------------------------------------------------------------ */
export async function getAllPaymentLinks() {
  const res = await fetch(`${BACKEND_API_URL}/api/payment-links`);
  if (!res.ok) throw new Error(`Không lấy được danh sách payment‑link (HTTP ${res.status})`);

  return res.json();   // PaymentLink[]
}
