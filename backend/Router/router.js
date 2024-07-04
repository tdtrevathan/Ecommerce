const express = require('express');
const router = express.Router();

const secretController = require('../Controllers/secretController.js')
const stripeController = require('../Controllers/stripeController.js')
const productDetailsController = require('../Controllers/productDetailsController.js')

router.get('/secret/:param', async (req, res) => {
    const { param } = req.params;
  
    try {
      const secret = await secretController.getSecretFromVault(param);
      res.json({ secret });
    } catch (error) {
      console.error('Error fetching secret:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.post('/create-payment-intent', async (req, res) => {
    await stripeController.createPaymentIntent(req, res);
  });
  
  router.get('/product/:param', async (req, res) => {
    const { param } = req.params;
  
    try {
      const product = await productDetailsController.getProduct(param)
      res.json({ product });
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })
  
  router.get('/product/', async (req, res) => {
  
    try {
      const products = await productDetailsController.getAll();
      res.json({ products });
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })

  module.exports = router;