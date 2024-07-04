import { ProductModel } from './productModel'

export class CartItemModel {
    product = new ProductModel();
    quantity = 0;

    incrimentQuantity = (quantity:number) => {
        this.quantity += quantity;
    }
    
    decrementQuantity = (quantity:number) => {
        if(this.quantity >= quantity){
            this.quantity -= quantity;
        }
        else{
            this.quantity = 0;
        }
    }
 }