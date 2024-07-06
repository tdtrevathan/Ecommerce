<template>
<div v-if="loaded">
    <h1>{{ product.name }}</h1>
    <img class="detailsImg" :src="require(`@/assets/images/${product.imageUrl}`)"/>
    <p>${{ product.price }}</p>
    <p>{{ product.description }}</p>
    <div>
        <button @click="addToCart()" class="btn btn-primary">Add to Cart</button>
        <input type="number" v-model="quantity" min="1"/>
    </div>
</div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps } from 'vue'
import { ProductService } from '@/services/productService';
import { ProductModel } from '@/models/productModel';
import { useCartStore } from '@/stores/cartStore';

const props = defineProps<{
  itemGuid: string;
}>();

const productService = new ProductService();
const cartStore = useCartStore();
const itemGuid = ref<string>(props.itemGuid);

const product = ref(new ProductModel());
const quantity = ref(1);
const loaded = ref(false);

onMounted( async() => {
    const response = await productService.getProduct(itemGuid.value);
    product.value = response;
    loaded.value = true;
})

const addToCart = () => {
    cartStore.addProduct(product.value, quantity.value);
    console.log(quantity.value)
    console.log(cartStore.getCart())
}

</script>

<style>
    .detailsImg {
        max-width: 400px;
        width: 400px;
    }
</style>