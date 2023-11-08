import express from 'express';
import {
    createClient,
    deleteClient, 
    getAllClients,
    updateClient, 
} from '../controllers/clientController.js';

const clientRouter = express.Router();

clientRouter.get('/clients/', getAllClients);
clientRouter.post('/clients', createClient);
clientRouter.patch('/clients/:id', updateClient);
clientRouter.delete('/clients/:id', deleteClient);

export default clientRouter;