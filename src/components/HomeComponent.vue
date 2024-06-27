<template>
  <h1>Tim's Website</h1>
  <div class="container">
    <CarouselComponent class="carousel">
    </CarouselComponent>
  </div>
</template>

<script setup lang="ts">
import CarouselComponent from '@/components/CarouselComponent.vue'
</script>

<style>

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: grey;
}

.carousel {
  position: relative;
  max-height: 70vh;
  height: 70vh;
  width: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>