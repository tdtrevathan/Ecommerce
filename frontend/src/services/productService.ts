import axios from 'axios'
import { ProductModel } from '@/models/productModel'

export class ProductService {
    getProduct = async (productGuid:string) => {
        
        try{
            const response = await axios.get(`http://20.124.165.91:5000/product/${productGuid}`);

            if(response.status === 200 && response.data){
                return mapResponseToModel(response.data.product);
            }
            else{
                console.log('Product not found')
                return new ProductModel();
            }
        }
        catch (err){
            console.log("Failed to get product", err);
            return new ProductModel();
        }
    }

    getAllProducts = async () => {
        try{
            const response = await axios.get(`http://20.124.165.91:5000/product/`);
            
            if(response.status === 200 && response.data.products){
                
                const products:ProductModel[] = [];

                response.data.products.forEach((element:any) => {
                    products.push(mapResponseToModel(element));
                });

                return products;
            }
            else{
                console.log('Products not found')
                return [];
            }
        }
        catch (err){
            console.log("Failed to get products", err);
            return []
        }
    }
}

const mapResponseToModel = (productData:any) => {
    const product = new ProductModel();

    product.productGuid = productData._id;
    product.description = productData.description;
    product.name = productData.name;
    product.price = productData.price;
    product.imageUrl = productData.imageUrl;

    return product;
}