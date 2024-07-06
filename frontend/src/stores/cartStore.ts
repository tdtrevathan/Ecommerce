import { defineStore } from 'pinia';
import { CartModel } from '@/models/cartModel'
import { ProductModel } from '@/models/productModel'
import { CartItemModel } from '@/models/cartItemModel';
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {

    const cartModel = ref(new CartModel())

    const addProduct = (product:ProductModel, quantity:number) => {
        console.log('product', product)
        console.log('quantity', quantity)
        try {

            const cartItemModel = getItemFromCart(product);

            if(cartItemModel.product.productGuid) {
                console.log('incriment')
                cartItemModel.incrimentQuantity(quantity);
            }
            else{
                console.log('push')
                cartItemModel.product = product;
                cartItemModel.quantity = quantity;
    
                cartModel.value.products.push(cartItemModel);
            }
            console.log('try to save state')
            saveState();
        }
        catch(err){
            console.log('failed to add to cart')
        }
    }
    
    const removeProduct = (product:ProductModel, quantity:number) => {
        try{
            const cartItem = cartModel.value.products.filter(item => item.product.productGuid === product.productGuid)[0];

            if(cartItem.product && cartItem.quantity){
                if(cartItem.quantity <= quantity){
                    console.log('erase product')
                    cartModel.value.products = cartModel.value.products.filter(item => item.product.productGuid !== product.productGuid);
                }
                else{
                    console.log('decriment')
                    const index = cartModel.value.products.indexOf(cartItem);
                    cartModel.value.products[index].decrementQuantity(quantity);
                }

                saveState();
            }
            else{
                console.log('Product not found');
            }
        }
        catch(err){
            console.log('failed to remove from cart');
        }
    }

    const getCart = () => {
        return cartModel.value.products;
    }

    const getItemFromCart = (product:ProductModel) => {
        console.log('before get item')
        console.log(cartModel.value.products)
        const result = cartModel.value.products.filter(item => item.product.productGuid === product.productGuid)[0];
console.log('agter get item')
        return result === undefined ? new CartItemModel() : result;
    }

    const saveState = () => {
        console.log('saving state')
        sessionStorage.setItem('cart', JSON.stringify(cartModel.value));
    }

    const initialize = () => {
        console.log('get state')
    
        const savedCart = sessionStorage.getItem('cart');
        
        if(savedCart){
            console.log('state found')
            cartModel.value = JSON.parse(savedCart)
        }
        else{
            console.log('state not found')
            cartModel.value = new CartModel();
            cartModel.value.products = [];
        }
    }

    return { cartModel, addProduct, removeProduct, getCart, getItemFromCart, initialize }
})