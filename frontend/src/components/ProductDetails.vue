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
import { onMounted, ref, defineProps } from 'vue'
import { ProductService } from '@/services/productService';

const props = defineProps<{
  itemGuid: string;
}>();

const productService = new ProductService();
const itemGuid = ref<string>(props.itemGuid);

let product = ref({imageUrl: '',
    price: 0.00,
    description: '',
    name: ''
})
let loaded = ref(false);

onMounted( async() => {
    const response = await productService.getProduct(itemGuid.value);
    product.value = response;
    loaded.value = true;
})
</script>

<style>
    .detailsImg {
        max-width: 400px;
        width: 400px;
    }
</style>