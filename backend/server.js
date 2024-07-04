require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const myRouter = require('./Router/router.js')

const secretController = require('./Controllers/secretController.js')
const stripeController = require('./Controllers/stripeController.js')

const setupStripe = async () => {
  const stripeSecret = await secretController.getSecretFromVault(process.env.AZURE_STRIPE_SECRET_NAME);
  stripeController.setStripeSecret(stripeSecret);
} 

setupStripe();

app.use(bodyParser.json());
app.use(cors());
app.use('/', myRouter);

app.listen(5000, () => console.log('Server running on port 5000'));
