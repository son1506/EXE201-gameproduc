import { Button, message } from "antd";
import { useState } from "react";
import { createPaymentLink } from "../../../modules/Payments/createPaymentLink";

export default function PayOSRedirectPage() {
  const [loading, setLoading] = useState(false);

  const handleRedirect = async () => {
    setLoading(true);
    try {
      const paymentData = {
        amount: 10000, // Amount (VND)
        description: "Top up account",
        returnUrl: "http://localhost:5173/return-url", // Success URL (frontend route)
        cancelUrl: "http://localhost:5173/cancel-url", // Cancel URL (frontend route)
      };

      // Call backend API to create payment link
      const response = await createPaymentLink(paymentData);

      if (!response.checkoutUrl) {
        throw new Error("Payment URL not found.");
      }

      // Save amount to localStorage for use after redirect (if needed)
      localStorage.setItem("pendingAmount", paymentData.amount.toString());

      message.success("Redirecting to payment page...");

      // Delay 1s then redirect to checkoutUrl
      setTimeout(() => {
        window.location.href = response.checkoutUrl;
      }, 1000);
    } catch (error) {
      console.error("Error creating payment link:", error);
      message.error(error.message || "An error occurred while creating payment link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-3xl font-bold text-pink-500 mb-6">Payment Redirect</h1>
        <Button
          type="primary"
          onClick={handleRedirect}
          loading={loading}
          className="w-full h-10 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg flex items-center justify-center"
        >
          Pay Now
        </Button>
      </div>
    </div>
  );
}