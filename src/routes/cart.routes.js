import express from 'express';
import { 
    createCart,
    deleteCart, 
    getAllCarts, 
    getCartById, 
} from '../controllers/cartController.js';
import makeBody from '../middlewares/makeBody.js';


const cartRouter = express.Router();

cartRouter.get('/carts', getAllCarts);
cartRouter.post('/carts/', makeBody, createCart);
cartRouter.delete('/carts/:id', deleteCart);

cartRouter.get('/carts/:id', getCartById);


export default cartRouter;