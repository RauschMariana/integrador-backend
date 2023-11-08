import express from 'express';
import { 
    createProduct, 
    deleteProduct, 
    getAllProducts, 
    getProductById, 
    getProductPriceById, 
    updateProduct 
} from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get('/products/', getAllProducts);
productRouter.post('/products', createProduct);
productRouter.patch('/products/:id', updateProduct);
productRouter.delete('/products/:id', deleteProduct);

productRouter.get('/products/:id', getProductById);
productRouter.get('/products/:id/price', getProductPriceById);

export default productRouter;