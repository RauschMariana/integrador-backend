import express from 'express';
import {
    createClient,
    getClientCart,  
    deleteClient, 
    getAllClients,
    updateClient 
} from '../controllers/clientController.js';

const clientRouter = express.Router();

clientRouter.get('/clients/', getAllClients);
clientRouter.post('/clients', createClient);
clientRouter.patch('/clients/:id', updateClient);
clientRouter.delete('/clients/:id', deleteClient);

// Relacíon con el carrito
clientRouter.get('/clients/:id/cart', getClientCart);

export default clientRouter;