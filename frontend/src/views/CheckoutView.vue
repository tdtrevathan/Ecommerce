<template>
    <div class="checkout">
      <CartComoponent></CartComoponent>
      <CheckoutComponent/>
    </div>
  </template>
  
  <script setup lang="ts">
  import CheckoutComponent from '@/components/CheckoutComponent.vue'
  import CartComoponent from '@/components/CartComponent.vue'
  </script>