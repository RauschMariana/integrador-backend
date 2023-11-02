import express from 'express';
import {
    createAdmin,
    deleteAdmin, 
    getAllAdmins,
    updateAdmin 
} from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.get('/admins', getAllAdmins);
adminRouter.post('/admins', createAdmin);
adminRouter.patch('/admins/:id', updateAdmin);
adminRouter.delete('/admins/:id', deleteAdmin);

export default adminRouter;