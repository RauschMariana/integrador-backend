import express from 'express';
import {
    createClient,
    getClientCart,  
    deleteClient, 
    getAllClients,
    updateClient, 
} from '../controllers/clientController.js';
import makeBody from '../middlewares/makeBody.js';

const clientRouter = express.Router();

clientRouter.get('/clients/', getAllClients);
clientRouter.post('/clients', makeBody, createClient);
clientRouter.patch('/clients/:id', makeBody, updateClient);
clientRouter.delete('/clients/:id', deleteClient);

// Relacíon con el carrito
clientRouter.get('/clients/:id/cart', getClientCart);

export default clientRouter;