
const express = require('express');
const axios = require('axios');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

let stripe = null;

const { SecretClient } = require('@azure/keyvault-secrets');
const { ClientSecretCredential } = require('@azure/identity');

app.use(bodyParser.json());
app.use(cors());

const getSecret = async (secretName) => {
  const vaultName = process.env.AZURE_KEY_VAULT_NAME;
  const url = `https://${vaultName}.vault.azure.net`;

  const clientId = process.env.AZURE_CLIENT_ID;
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;

  const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
  const client = new SecretClient(url, credential);

  try {
    const secret = await client.getSecret(secretName);
    return secret.value;
  } catch (err) {
    console.error('Error retrieving secret:', err);
    throw err;
  }
};

app.get('/secret/:param', async (req, res) => {
  try {
    const secretValue = await getSecret(req.params.param);
    res.send(secretValue);
  } catch (err) {
    res.status(500).send('Error retrieving secret');
  }
});

const fetchSecret = async (secret) => {
  try{
    const response = await axios.get(`http://localhost:5000/secret/${secret}`);
    const key = response.data;
    stripe = require('stripe')(key);
  }
  catch(err){
    console.log(err)
  }
}

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

fetchSecret(process.env.AZURE_STRIPE_SECRET_NAME)

app.listen(5000, () => console.log('Server running on port 5000'));
