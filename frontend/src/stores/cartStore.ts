import { defineStore } from 'pinia';
import { CartModel } from '@/models/cartModel'
import { ProductModel } from '@/models/productModel'
import { CartItemModel } from '@/models/cartItemModel';
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {

    const cartModel = ref(new CartModel());

    const totalCharge = computed(() => {
        if(cartModel.value && cartModel.value.products){
            let sum = 0;
            cartModel.value.products.forEach(item => sum += (item.product.price * item.quantity));
            return sum;
        }
        else{
            return 0;
        }
    })

    const addProduct = (product:ProductModel, quantity:number) => {
        try {
            const cartItemModel = getItemFromCart(product);

            if(cartItemModel.product.productGuid) {
                cartItemModel.incrimentQuantity(quantity);
            }
            else{
                cartItemModel.product = product;
                cartItemModel.quantity = quantity;
    
                cartModel.value.products.push(cartItemModel);
            }
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
                    cartModel.value.products = cartModel.value.products.filter(item => item.product.productGuid !== product.productGuid);
                }
                else{
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
        const result = cartModel.value.products.filter(item => item.product.productGuid === product.productGuid)[0];
        return result === undefined ? new CartItemModel() : result;
    }

    const saveState = () => {
        sessionStorage.setItem('cart', JSON.stringify(cartModel.value));
    }

    const initialize = () => {
        const savedCart = sessionStorage.getItem('cart');
        
        if(savedCart){
            cartModel.value = JSON.parse(savedCart)
        }
        else{
            cartModel.value = new CartModel();
            cartModel.value.products = [];
        }
    }

    return { cartModel, addProduct, removeProduct, getCart, getItemFromCart, initialize, totalCharge }
})