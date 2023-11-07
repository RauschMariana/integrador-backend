import express from 'express';
import {
    createProvider,
    deleteProvider, 
    getAllProviders,
    updateProvider
} from '../controllers/providerController.js';
import makeBody from '../middlewares/makeBody.js';

const providerRouter = express.Router();

providerRouter.get('/providers/', getAllProviders);
providerRouter.post('/providers', makeBody, createProvider);
providerRouter.patch('/providers/:id', makeBody, updateProvider);
providerRouter.delete('/providers/:id', deleteProvider);

export default providerRouter;