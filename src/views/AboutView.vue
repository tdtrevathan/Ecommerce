<template>
    <div class="about">
      <div class="modal">
        <div class="modal-content">
          <form @submit.prevent="handleSubmit">
            <label for="card-element">Credit or debit card</label>
            <div id="card-element"></div>
            <button type="submit">Pay</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { StripeCardElement, loadStripe } from '@stripe/stripe-js';
  import { onMounted, ref } from 'vue';
  import axios from 'axios'
  
  //TODO turn key into secret
  const stripePromise = loadStripe('public key');
  const cardElement = ref<StripeCardElement | null>(null)
  const clientSecret = ref(''

  )
  onMounted(async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) {
        console.log("Stripe failed")
        return
      }
      const elements = stripe.elements();
      cardElement.value = elements.create('card');
      if (cardElement.value) {
        cardElement.value.mount('#card-element');
        const response = await axios.post('http://localhost:5000/create-payment-intent', { amount: 100.00 }); // Amount in cents
        clientSecret.value = response.data.clientSecret;
      }
      else {
        console.log('failed to mount')
      }
    }
    catch (error) {
      console.log(error)
    }
  });
  
  const handleSubmit = async () => {
    const errorMessage = ref('');
    const stripe = await stripePromise;
    
    if (cardElement.value) {

      const { error, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret.value, {
          payment_method: {
            card: cardElement.value,
          },
        });
      
      if (error) {
        errorMessage.value = error.message ? error.message : 'message undefined';
      } 
      else if (paymentIntent.status === 'succeeded') {
        alert('Payment succeeded!');
        //closeModal();
      }
    }
    else{
      alert('something went wrong')
    }
  }
  </script>
  
  <style scoped>

  #card-element{
    width: 400px;
  }

  .about {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .modal {
    max-width: 15000px;
    width: 100%;
  }
  
  button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #6772e5;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #5469d4;
  }
  </style>
  