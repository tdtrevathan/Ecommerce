<template>
    <div class="carousel">
        <div class="slide-info" v-for="slide, index in carouselSlides" :key="index">
            <transition name="slide" mode="in-out">
                <div v-show="currentSlide === index">
                    <router-link to="/checkout">
                        <img class="carousel-image" :src="slide" />
                    </router-link>
                </div>
            </transition>
        </div>

        <div class="navigate-buttons">
            <div class="toggle-page left">
                <i class="fas fa-chevron-left" @click="decriment"></i>
            </div>
            <div class="toggle-page right">
                <i class="fas fa-chevron-right" @click="incriment"></i>
            </div>
        </div>
        
        <div v-for="slide, index in carouselSlides" :key="index" class="carousel-nav">
            <i :class="{ 'active': currentSlide === index }" class="mini-nav-button" @click="selectImage(index)"></i>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CarouselImageSelector } from '@/services/carouselImageSeletor'

const carouselSlides = ['https://upload.wikimedia.org/wikipedia/commons/d/d8/Friedrich-Johann-Justin-Bertuch_Mythical-Creature-Dragon_1806.jpg',
'https://upload.wikimedia.org/wikipedia/commons/7/71/Ninedragonwallpic1.jpg',
'https://upload.wikimedia.org/wikipedia/commons/4/4f/Zmei_Gorynich_-_Ystad-2019.jpg']

const currentSlide = ref(0)
const carouselImageSelector = new CarouselImageSelector();

const incriment = () => {
    currentSlide.value = 
    carouselImageSelector.incriment(currentSlide.value, carouselSlides.length)
} 
const decriment = () => {
    currentSlide.value = 
    carouselImageSelector.decriment(currentSlide.value, carouselSlides.length)
}

const selectImage = (index: number) => {
    currentSlide.value = index;
}
</script>

<style scoped>
.navigate-buttons {
    position: absolute;
    padding: 0 16px;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
}

.toggle-page {
  display: flex;
  flex: 1;
}

.left {
    align-items: center;
}

.right {
  justify-content: flex-end;
  align-items: center;
}

i {
    cursor: pointer;
    display: flex;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    color: white;
    background-color: purple;
    justify-content: center;
    align-items: center;
}

.active {
    background-color: white !important;
}

.mini-nav-button {
    cursor: pointer;
    display: flex;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    color: white;
    background-color: purple;
    justify-content: center;
    align-items: center;
    margin: 5px;
    z-index: 1;
    transition: background-color 0.3s ease;
}

.carousel-nav {
    height: 40px;
    width: 100%;
    margin-top: 80%;
    display: flex;
    justify-content: center;
}

.slide-info {
  position: absolute;
  width: 70vh;
  cursor: pointer;
  z-index: 1;
}

.slide-info img {
  min-width: 100%;
  width: 100%;
  object-fit: cover;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.5s ease;
}
.slide-enter, .slide-leave-to {
  transform: translateX(100%);
}
.slide-enter-to, .slide-leave {
  transform: translateX(0%);
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