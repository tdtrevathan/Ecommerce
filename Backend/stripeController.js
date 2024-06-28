
let stripe = null;

exports.setStripeSecret = async (secret) => {
    try{
      //onst response = await getSecret(secret);
      //const key = response.data;
      stripe = require('stripe')(secret);
    }
    catch(err){
      console.log(err)
    }
}

exports.createPaymentIntent = async (req, res) => {
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
};
  