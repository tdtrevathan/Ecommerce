
const express = require('express');
const router = express.Router();
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const secretController = require('./secretController.js')
const stripeController = require('./stripeController.js')
const productDetailsController = require('./productDetailsController.js')

const setupStripe = async () => {
  const stripeSecret = await secretController.getSecretFromVault(process.env.AZURE_STRIPE_SECRET_NAME);
  stripeController.setStripeSecret(stripeSecret);
} 

setupStripe();

app.use(bodyParser.json());
app.use(cors());

app.get('/secret/:param', async (req, res) => {
  const { param } = req.params;

  try {
    const secret = await secretController.getSecretFromVault(param);
    res.json({ secret });
  } catch (error) {
    console.error('Error fetching secret:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/create-payment-intent', async (req, res) => {
  await stripeController.createPaymentIntent(req, res);
});

app.get('/product/:param', async (req, res) => {
  console.log(req)
  const { param } = req.params;
  console.log('made its')
  try {
    const product = await productDetailsController.getProduct(param)
    res.json({ product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.listen(5000, () => console.log('Server running on port 5000'));
