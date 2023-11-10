import express from 'express';
import {
    createClient,
    deleteClient, 
    getAllClients,
    updateClient, 
} from '../controllers/clientController.js';
import tokenAuthentication from '../middlewares/tokenAuthentication.js';

const clientRouter = express.Router();

clientRouter.get('/clients/', tokenAuthentication('admin'), tokenAuthentication('provider'), getAllClients);
clientRouter.post('/clients', tokenAuthentication('admin'), createClient);
clientRouter.patch('/clients/:id', tokenAuthentication('admin'), tokenAuthentication('client'), updateClient);
clientRouter.delete('/clients/:id', tokenAuthentication('admin'), tokenAuthentication('client'), deleteClient);

export default clientRouter;