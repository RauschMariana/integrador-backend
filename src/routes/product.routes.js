import express from 'express';
import { 
    createProduct, 
    deleteProduct, 
    getAllProducts, 
    getProductById, 
    getProductPriceById, 
    updateProduct 
} from '../controllers/productController.js';
import tokenAuthentication from '../middlewares/tokenAuthentication.js';

const productRouter = express.Router();

productRouter.get('/products/', getAllProducts);
productRouter.post('/products', tokenAuthentication('admin'), tokenAuthentication('provider'), createProduct);
productRouter.patch('/products/:id', tokenAuthentication('admin'), tokenAuthentication('provider'), updateProduct);
productRouter.delete('/products/:id',tokenAuthentication('admin'), tokenAuthentication('provider'), deleteProduct);

productRouter.get('/products/:id', getProductById);
productRouter.get('/products/:id/price', getProductPriceById);

export default productRouter;