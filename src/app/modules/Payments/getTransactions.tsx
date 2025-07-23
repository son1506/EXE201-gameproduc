import { message } from "antd";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export interface Transaction {
  id: string;
  orderCode: string | number;
  amount: number;
  status: string;
  bankName?: string;
  channelName?: string;
  description: string;
  createdAt: string;
}

export interface PaymentLink {
  orderCode: number;
  amount: number;
  description: string;
  accountNumber: string;
  accountName: string;
  bin: string;
  paymentLinkId: string;
  status: string;
  checkoutUrl: string;
  qrCode: string;
  createdAt: string;
}

export interface TodayStats {
  totalRevenue: number;
  totalOrders: number;
  date?: string;
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  total?: number;
}

export async function getAllTransactions(): Promise<Transaction[]> {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/get-all-transactions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch transactions. Status: ${response.status}`);
    }

    const data: APIResponse<Transaction[]> = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching transactions:", error);
    message.error("Unable to load transactions.");
    return [];
  }
}

export async function getAllPaymentLinks(): Promise<PaymentLink[]> {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/get-payment-links`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch payment links. Status: ${response.status}`);
    }

    const data: APIResponse<PaymentLink[]> = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching payment links:", error);
    message.error("Unable to load payment links.");
    return [];
  }
}

export async function getTodayStats(): Promise<TodayStats> {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/stats/today`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch today stats. Status: ${response.status}`);
    }

    const data: TodayStats = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching today stats:", error);
    return { totalRevenue: 0, totalOrders: 0 };
  }
}