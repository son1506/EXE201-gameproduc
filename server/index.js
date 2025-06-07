require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PayOS = require('@payos/node');

const app = express();

const payos = new PayOS(
  process.env.CLIENT_ID,
  process.env.API_KEY,
  process.env.CHECKSUM_KEY
);

app.use(cors());
app.use(bodyParser.json());

// Route mặc định
app.get('/', (req, res) => {
  res.send('Server is running. Welcome to GameProduc backend!');
});

// Tạo payment link
app.post('/api/create-payment-link', async (req, res) => {
  const { orderCode, amount, description } = req.body;

  const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN || 'http://localhost:5173';

  try {
    const paymentLink = await payos.createPaymentLink({
      orderCode,
      amount,
      description,
      returnUrl: `${FRONTEND_DOMAIN}/?success=true`,
      cancelUrl: `${FRONTEND_DOMAIN}/?canceled=true`,
    });

    res.json(paymentLink);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
