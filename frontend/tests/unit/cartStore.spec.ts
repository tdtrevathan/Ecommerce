import { createPinia, setActivePinia } from 'pinia';
import { useCartStore } from '@/stores/cartStore';
import { ProductModel } from '@/models/productModel';

describe('CartStore', () => {
    describe('Add to Cart', () => {

        beforeEach(() => {
            const pinia = createPinia();
            setActivePinia(pinia);
        });

        afterEach(() => {
            sessionStorage.clear();
        })

        test('Add item to cart, cart now contains item', () => {

            const cartStore = useCartStore();
            cartStore.initialize();
            const product = createProduct();
            const quantity = 1;
    
            cartStore.addProduct(product, quantity);
    
            const result = cartStore.getCart();
    
            expect(result[0].product).toStrictEqual(product);
            expect(result[0].quantity).toBe(1);
        })

        test('Add item to cart, item is already in cart, quantity is added to that item', () => {

            const cartStore = useCartStore();
            cartStore.initialize();
            const product1 = createProduct();
            const product2 = createProduct();
            const quantity = 1;
    
            cartStore.addProduct(product1, quantity);
            cartStore.addProduct(product2, quantity);

            const result = cartStore.getCart();
    
            expect(result[0].product).toStrictEqual(product1);
            expect(result[0].quantity).toBe(2);
        })
    })
    describe('Remove from Cart, Only One Item', () => {

        beforeEach(() => {
            const pinia = createPinia();
            setActivePinia(pinia);
        });

        afterEach(() => {
            sessionStorage.clear();
        })

        test('Remove item from cart, cart should be empty', () => {

            const cartStore = useCartStore();
            cartStore.initialize();
            const product = createProduct();
            const quantity = 1;
    
            cartStore.addProduct(product, quantity);
    
            cartStore.removeProduct(product, quantity);
            const result = cartStore.getCart();
    
            expect(result[0]).toBe(undefined);
        })
    
        test('Remove qty 1 of item from cart, item has quantity 2, one is still left in cart', () => {
    
            const cartStore = useCartStore();
            cartStore.initialize();
            const product = createProduct();
            const originalQuantity = 2;
            const quantityToRemove = 1;
    
            cartStore.addProduct(product, originalQuantity);
    
            cartStore.removeProduct(product, quantityToRemove);
            const result = cartStore.getCart();
    
            expect(result[0].product).toStrictEqual(product);
            expect(result[0].quantity).toBe(1);
        })
    
        test('Remove qty 2 of item from cart, item has quantity 2, cart is empty', () => {
    
            const cartStore = useCartStore();
            cartStore.initialize();
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
            cartStore.initialize();
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
            cartStore.initialize();
            const hatProduct = createHatProduct();
            const shoeProduct = createShoesProduct();
            const hatQuantity = 1;
            const shoeQuantity = 1;
    
            cartStore.addProduct(hatProduct, hatQuantity);
            cartStore.addProduct(shoeProduct, shoeQuantity);
    
            cartStore.removeProduct(hatProduct, hatQuantity);
            const result = cartStore.getCart();
    
            expect(result[0].product).toStrictEqual(shoeProduct);
            expect(result[0].quantity).toBe(shoeQuantity);
        })
    })
    describe('Calculate Total', () => {
        beforeEach(() => {
            const pinia = createPinia();
            setActivePinia(pinia);
        });

        afterEach(() => {
            sessionStorage.clear();
        })
        test('Add Two Items, Sum Is Calculated Accurately', () => {
            const cartStore = useCartStore();
            cartStore.initialize();
            const product1 = createHatProduct();
            const product2 = createShoesProduct();
            const quantity1 = 1;
            const quantity2 = 2;

            cartStore.addProduct(product1, quantity1);
            cartStore.addProduct(product2, quantity2);
            
            expect(quantity1*product1.price).toStrictEqual(8);
            expect(quantity2*product2.price).toStrictEqual(4);
            expect(cartStore.totalCharge).toStrictEqual(quantity1*product1.price + quantity2*product2.price);
        })
    })
})

const createProduct = () => {

    const product = new ProductModel();

    product.description = 'description'
    product.productGuid = '1234'
    product.name = 'name'
    product.imageUrl = 'url'
    product.price = 12

    return product;
}

const createHatProduct = () => {

    const product = new ProductModel();

    product.description = 'fluffy hat'
    product.productGuid = '1000'
    product.name = 'hat'
    product.imageUrl = 'url'
    product.price = 8

    return product;
}

const createShoesProduct = () => {

    const product = new ProductModel();

    product.description = 'compfy shoes'
    product.productGuid = '200'
    product.name = 'shoes'
    product.imageUrl = 'url'
    product.price = 2

    return product;
}