<template>
    <div>
      <div class="modal">
        <div class="modal-content">
          <form id="payment-form" @submit.prevent='handleSubmit'>
            <div id="payment-element">
              <!--Stripe.js injects the Payment Element-->
            </div>
            <button id="submit">
              <div class="spinner hidden" id="spinner"></div>
              <span id="button-text">Pay now</span>
            </button>
            <div id="payment-message" class="hidden"></div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { StripeElements } from '@stripe/stripe-js';
  import { onMounted, ref } from 'vue';
  import { StripeSetupService } from '@/services/stripeSetupService'
  import axios from 'axios'
  
  //TODO turn key into secret
  let stripePromise: any = null;
  let stripe: any = null;
  
  const clientSecret = ref('')
  const elements = ref<StripeElements | null>(null);
  const stripeSetupService = new StripeSetupService();
  
  onMounted(async () => {
    try {

      stripe = await stripeSetupService.setupStripe();

      const response = await axios.post('http://localhost:5000/create-payment-intent', { amount: 100 }); // Amount in cents
      clientSecret.value = response.data.clientSecret;
  
      mountModal(clientSecret.value)
  
    }
    catch (error) {
      console.log(error)
    }
  });

  const mountModal = (clientSecret: string) => {
    const appearance = {
      theme: 'stripe',
    };
  
    elements.value = stripe.elements({ appearance, clientSecret });
  
    if(elements.value){
  
      const paymentElement = elements.value.create("payment");
      paymentElement.mount("#payment-element");
    
    }
    else {
      console.log('failed to mount')
    }
  }
  
  const handleSubmit = async () => {
    const errorMessage = ref('');
  
    try{
      const { error, paymentIntent } =
        await stripe.confirmPayment({
          elements: elements.value,
          confirmParams: {
              // Omit return_url if you don't want a redirect yet
              // return_url: 'https://your-return-url.com',
            },
            redirect: 'if_required',
        });
  
      if (error) {
        errorMessage.value = error.message ? error.message : 'message undefined';
      }
      else if (paymentIntent.status === 'succeeded') {
        alert('Payment succeeded!');
        //closeModal();
      }
    }
    catch(err){
      console.log(err)
    }
  }
  
  </script>
  
  <style scoped>
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
    display: inline-block;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 200px;
    height: 450px;
  }
  
  .modal {
    max-width: 15000px;
    width: 100%;
    height: 400px;
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