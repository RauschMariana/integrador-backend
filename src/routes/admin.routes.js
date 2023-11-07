import express from 'express';
import {
    createAdmin,
    deleteAdmin, 
    getAllAdmins,
    updateAdmin 
} from '../controllers/adminController.js';
import makeBody from '../middlewares/makeBody.js';

const adminRouter = express.Router();

adminRouter.get('/admins', getAllAdmins);
adminRouter.post('/admins', makeBody, createAdmin);
adminRouter.patch('/admins/:id', makeBody, updateAdmin);
adminRouter.delete('/admins/:id', deleteAdmin);

export default adminRouter;