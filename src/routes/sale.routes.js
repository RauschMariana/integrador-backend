import express from 'express';
import { 
    deleteSale, 
    getAllSales, 
    getSaleById 
} from '../controllers/saleController.js';

const saleRouter = express.Router();

saleRouter.get('/sales', getAllSales);
saleRouter.get('/sales/:id', getSaleById);
saleRouter.delete('/sales/:id', deleteSale);

export default saleRouter;