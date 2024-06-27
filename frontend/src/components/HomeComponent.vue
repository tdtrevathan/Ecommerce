<template>
  <h1>Tim's Website</h1>
  <div class="container">
    <CarouselComponent></CarouselComponent>
  </div>
</template>

<script setup lang="ts">
import CarouselComponent from '@/components/CarouselComponent.vue'
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: grey;
}
</style>