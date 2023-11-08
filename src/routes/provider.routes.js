import express from 'express';
import {
    createProvider,
    deleteProvider, 
    getAllProviders,
    getProviderById,
    updateProvider
} from '../controllers/providerController.js';

const providerRouter = express.Router();

providerRouter.get('/providers/', getAllProviders);
providerRouter.post('/providers', createProvider);
providerRouter.patch('/providers/:id', updateProvider);
providerRouter.delete('/providers/:id', deleteProvider);
providerRouter.get('/providers/:id', getProviderById);

export default providerRouter;