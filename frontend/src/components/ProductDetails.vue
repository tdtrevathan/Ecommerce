<template>
    <div v-for="item in carouselImages" :key="item.itemGuid">
        <div v-if="isItem(item.itemGuid)">
            {{ item.imageUrl }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { mergeProps, onMounted } from 'vue'
import carouselImagesJson from '@/assets/data/carouselItems.json'
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const route = useRoute();
const itemGuid = ref(route.params.itemGuid);
console.log(itemGuid.value)
let carouselImages = carouselImagesJson

const isItem = (guid:string) => {
    return guid === itemGuid.value;
}
onMounted( async() => {
    //make call to obtain item information
})
</script>