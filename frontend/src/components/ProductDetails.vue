<template>
<div v-if="loaded">
    <h1>{{ product.name }}</h1>
    <img class="detailsImg" :src="require(`@/assets/images/${product.imageUrl}`)"/>
    <p>${{ product.price }}</p>
    <p>{{ product.description }}</p>
    <div>
        <button class="btn btn-primary">Add to Cart</button>
    </div>
</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';

const route = useRoute();
const itemGuid = ref(route.params.itemGuid);

let product = ref({imageUrl: '',
    price: 0.00,
    description: '',
    name: ''
})
let loaded = ref(false);

onMounted( async() => {
    const response = await axios.get(`http://localhost:5000/product/${itemGuid.value}`);
    product.value = response.data.product;
    loaded.value = true;
})
</script>

<style>
    .detailsImg {
        max-width: 400px;
        width: 400px;
    }
</style>