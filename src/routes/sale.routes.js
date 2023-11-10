import express from 'express';
import { 
    deleteSale, 
    getAllSales, 
    getSaleById
} from '../controllers/saleController.js';
import tokenAuthentication from '../middlewares/tokenAuthentication.js';

const saleRouter = express.Router();

saleRouter.get('/sales', tokenAuthentication('admin'), tokenAuthentication('provider'), getAllSales);
saleRouter.get('/sales/:id', tokenAuthentication('admin'), tokenAuthentication('provider'), getSaleById);
saleRouter.delete('/sales/:id', tokenAuthentication('admin'), deleteSale);

export default saleRouter;