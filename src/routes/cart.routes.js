import express from 'express';
import { 
    deleteCart, 
    getAllCarts, 
    getCartById, 
} from '../controllers/cartController.js';
import tokenAuthentication from '../middlewares/tokenAuthentication.js';


const cartRouter = express.Router();

cartRouter.get('/carts/', tokenAuthentication('admin'), tokenAuthentication('provider'), getAllCarts);
cartRouter.delete('/carts/:id', tokenAuthentication('admin'), tokenAuthentication('client'), deleteCart);
cartRouter.get('/carts/:id', getCartById);


export default cartRouter;