<template>
    <div class="checkout">
      <ProductDetails :itemGuid="itemGuid"/>
    </div>
  </template>
  
  <script setup lang="ts">
    import ProductDetails from '../components/ProductDetails.vue'
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const itemGuid:string = route.params.itemGuid as string;
  </script>
