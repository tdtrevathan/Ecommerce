import { CartItemModel } from "./cartItemModel";
import { ProductModel } from "./productModel";

export class CartModel {
    products:CartItemModel[] = [];

    addProduct = (product:ProductModel, quantity:number) => {
        try {
            const cartItemModel = this.getItemFromCart(product);

            if(cartItemModel.product.productGuid) {
                cartItemModel.incrimentQuantity(quantity);
            }
            else{
                cartItemModel.product = product;
                cartItemModel.quantity = quantity;
    
                this.products.push(cartItemModel);
            }
        }
        catch(err){
            console.log('failed to add to cart')
        }
    }
    
    removeProduct = (product:ProductModel, quantity:number) => {
        try{
            const cartItem = this.products.filter(item => item.product.productGuid === product.productGuid)[0];

            if(cartItem.product && cartItem.quantity){
                if(cartItem.quantity <= quantity){
                    this.products = this.products.filter(item => item.product.productGuid !== product.productGuid);
                }
                else{
                    const index = this.products.indexOf(cartItem);
                    this.products[index].decrementQuantity(quantity);
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

    getCart = () => {
        return this.products;
    }

    getItemFromCart = (product:ProductModel) => {
        const result = this.products.filter(item => item.product.productGuid === product.productGuid)[0];

        return result === undefined ? new CartItemModel() : result;
    }
}