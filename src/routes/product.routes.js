import express from 'express';
import { 
    createProduct, 
    deleteProduct, 
    getAllProducts, 
    getProductById, 
    getProductPriceById, 
    updateProduct 
} from '../controllers/productController.js';
import { isProvider } from '../middlewares/permissions.js';
import makeBody from '../middlewares/makeBody.js';

const productRouter = express.Router();

productRouter.get('/products/', getAllProducts);
productRouter.post('/products', makeBody, isProvider,  createProduct);
productRouter.patch('/products/:id', makeBody, isProvider, updateProduct);
productRouter.delete('/products/:id', isProvider, deleteProduct);

productRouter.get('/products/:id', getProductById);
productRouter.get('/products/:id/price', getProductPriceById);

export default productRouter;