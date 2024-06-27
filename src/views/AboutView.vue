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
  import { loadStripe } from '@stripe/stripe-js';
  import { onMounted } from 'vue';
  
  const stripePromise = loadStripe('pk_test_51PW8yARqyLQWA5CO0tCv3Zqf14PBzAQISSQwtOISuAadLoQlc1W1tfecsn6e31s81l0eBehVMCaWGEP3mgsNsaVY007BSpsCK5');
  
  onMounted(async () => {
    const stripe = await stripePromise;
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');
  });
  
  const handleSubmit = () => {
    // Your form submission logic here
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
  