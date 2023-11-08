import express from 'express';
import { 
    deleteCart, 
    getAllCarts, 
    getCartById, 
} from '../controllers/cartController.js';


const cartRouter = express.Router();

cartRouter.get('/carts/', getAllCarts);
cartRouter.delete('/carts/:id', deleteCart);
cartRouter.get('/carts/:id', getCartById);


export default cartRouter;