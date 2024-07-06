<template>
    <div class="container">
        Test
        <div class="row">
            <div v-for="item in products" :key="item.product.productGuid">
                <img class="detailsImg" :src="require(`@/assets/images/${item.product.imageUrl}`)"/>
                {{ item.product.name }}
                {{ item.product.price }}
                {{ item.quantity }}
                <input type="number" v-model="item.quantity" min="1" :max="getMaxQuantity(item.quantity)">
                <button @click="removeFromCart(item.product, item.quantity)" class="btn btn-primary">Remove</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ProductModel } from '@/models/productModel';
import { CartItemModel } from '@/models/cartItemModel';
import { useCartStore } from '@/stores/cartStore';
import { ref } from 'vue';

const cartStore = useCartStore();

const getMaxQuantity = (quantity:number) => quantity + 1;

const deepClone = (obj:CartItemModel[]) => {
    if(obj){
        return JSON.parse(JSON.stringify(obj));
    }
    else{
        return []
    }

}
console.log('get cart',cartStore.getCart())
const products = ref(deepClone(cartStore.getCart()));

const removeFromCart = (product:ProductModel, quantity:number) => {
    cartStore.removeProduct(product, quantity);
}
</script>