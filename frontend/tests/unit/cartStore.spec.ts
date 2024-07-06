import { createPinia, setActivePinia } from 'pinia';
import { useCartStore } from '@/stores/cartStore';
import { CartModel } from '@/models/cartModel'
import { ProductModel } from '@/models/productModel';

describe('CartStore', () => {
    describe('Add to Cart', () => {

        beforeEach(() => {
            const pinia = createPinia();
            setActivePinia(pinia);
        });

        test('Add item to cart, cart now contains item', () => {

            const cartStore = useCartStore();
            cartStore.cartModel = new CartModel();
            const product = createProduct();
            const quantity = 1;
    
            cartStore.addProduct(product, quantity);
    
            const result = cartStore.getCart();
    
            expect(result[0].product).toBe(product);
            expect(result[0].quantity).toBe(1);
        })

        test('Add item to cart, item is already in cart, quantity is added to that item', () => {

            const cartStore = useCartStore();
            cartStore.cartModel = new CartModel();
            const product1 = createProduct();
            const product2 = createProduct();
            const quantity = 1;
    
            cartStore.addProduct(product1, quantity);
            cartStore.addProduct(product2, quantity);

            const result = cartStore.getCart();
    
            expect(result[0].product).toBe(product1);
            expect(result[0].quantity).toBe(2);
        })
    })
    describe('Remove from Cart, Only One Item', () => {

        beforeEach(() => {
            const pinia = createPinia();
            setActivePinia(pinia);
        });

        test('Remove item from cart, cart should be empty', () => {

            const cartStore = useCartStore();
            cartStore.cartModel = new CartModel();
            const product = createProduct();
            const quantity = 1;
    
            cartStore.addProduct(product, quantity);
    
            cartStore.removeProduct(product, quantity);
            const result = cartStore.getCart();
    
            expect(result[0]).toBe(undefined);
        })
    
        test('Remove qty 1 of item from cart, item has quantity 2, one is still left in cart', () => {
    
            const cartStore = useCartStore();
            cartStore.cartModel = new CartModel();
            const product = createProduct();
            const originalQuantity = 2;
            const quantityToRemove = 1;
    
            cartStore.addProduct(product, originalQuantity);
    
            cartStore.removeProduct(product, quantityToRemove);
            const result = cartStore.getCart();
    
            expect(result[0].product).toBe(product);
            expect(result[0].quantity).toBe(1);
        })
    
        test('Remove qty 2 of item from cart, item has quantity 2, cart is empty', () => {
    
            const cartStore = useCartStore();
            cartStore.cartModel = new CartModel();
            const product = createProduct();
            const originalQuantity = 2;
            const quantityToRemove = 2;
    
            cartStore.addProduct(product, originalQuantity);
    
            cartStore.removeProduct(product, quantityToRemove);
            const result = cartStore.getCart();
    
            expect(result[0]).toBe(undefined);
        })
    
        test('Remove qty 2 of item from cart, item has quantity 1, cart is empty', () => {
            
            const cartStore = useCartStore();
            cartStore.cartModel = new CartModel();
            const product = createProduct();
            const originalQuantity = 2;
            const quantityToRemove = 2;
    
            cartStore.addProduct(product, originalQuantity);
    
            cartStore.removeProduct(product, quantityToRemove);
            const result = cartStore.getCart();
    
            expect(result[0]).toBe(undefined);
        })
    })

    describe('Remove from Cart, With Other Items', () => {

        test('Remove item from cart, item is of qty 1, cart should not contain that item', () => {
            
            const cartStore = useCartStore();
            cartStore.cartModel = new CartModel();
            const hatProduct = createHatProduct();
            const shoeProduct = createShoesProduct();
            const hatQuantity = 1;
            const shoeQuantity = 1;
    
            cartStore.addProduct(hatProduct, hatQuantity);
            cartStore.addProduct(shoeProduct, shoeQuantity);
    
            cartStore.removeProduct(hatProduct, hatQuantity);
            const result = cartStore.getCart();
    
            expect(result[0].product).toBe(shoeProduct);
            expect(result[0].quantity).toBe(shoeQuantity);
        })
    })
})

const createProduct = () => {

    const product = new ProductModel();

    product.description = 'description'
    product.productGuid = '1234'
    product.name = 'name'
    product.imageUrl = 'url'

    return product;
}

const createHatProduct = () => {

    const product = new ProductModel();

    product.description = 'fluffy hat'
    product.productGuid = '1000'
    product.name = 'hat'
    product.imageUrl = 'url'

    return product;
}

const createShoesProduct = () => {

    const product = new ProductModel();

    product.description = 'compfy shoes'
    product.productGuid = '200'
    product.name = 'shoes'
    product.imageUrl = 'url'

    return product;
}