import express from 'express';
import {
    createProvider,
    deleteProvider, 
    getAllProviders,
    getProviderById,
    updateProvider
} from '../controllers/providerController.js';
import tokenAuthentication from '../middlewares/tokenAuthentication.js';

const providerRouter = express.Router();

providerRouter.get('/providers/', tokenAuthentication('admin'), getAllProviders);
providerRouter.post('/providers', tokenAuthentication('admin'), createProvider);
providerRouter.patch('/providers/:id', tokenAuthentication('admin'), tokenAuthentication('provider'), updateProvider);
providerRouter.delete('/providers/:id', tokenAuthentication('admin'), tokenAuthentication('provider'), deleteProvider);
providerRouter.get('/providers/:id', tokenAuthentication('admin'), getProviderById);

export default providerRouter;