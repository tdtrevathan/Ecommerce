import { defineStore } from 'pinia';
import { CartModel } from '@/models/cartModel'
import { ProductModel } from '@/models/productModel'
import { CartItemModel } from '@/models/cartItemModel';

export const useCartStore = defineStore('cart', () => {

    const cartModel = new CartModel();

    const addProduct = (product:ProductModel, quantity:number) => {
        try {
            const cartItemModel = getItemFromCart(product);

            if(cartItemModel.product.productGuid) {
                cartItemModel.incrimentQuantity(quantity);
            }
            else{
                cartItemModel.product = product;
                cartItemModel.quantity = quantity;
    
                cartModel.products.push(cartItemModel);
            }
        }
        catch(err){
            console.log('failed to add to cart')
        }
    }
    
    const removeProduct = (product:ProductModel, quantity:number) => {
        try{
            const cartItem = cartModel.products.filter(item => item.product.productGuid === product.productGuid)[0];

            if(cartItem.product && cartItem.quantity){
                if(cartItem.quantity <= quantity){
                    cartModel.products = cartModel.products.filter(item => item.product.productGuid !== product.productGuid);
                }
                else{
                    const index = cartModel.products.indexOf(cartItem);
                    cartModel.products[index].decrementQuantity(quantity);
                }
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
        return cartModel.products;
    }

    const getItemFromCart = (product:ProductModel) => {
        const result = cartModel.products.filter(item => item.product.productGuid === product.productGuid)[0];

        return result === undefined ? new CartItemModel() : result;
    }

    return { cartModel, addProduct, removeProduct, getCart, getItemFromCart }
})