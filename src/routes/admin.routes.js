import express from 'express';
import {
    createAdmin,
    deleteAdmin, 
    getAdminById, 
    getAllAdmins,
    updateAdmin 
} from '../controllers/adminController.js';
import tokenAuthentication from '../middlewares/tokenAuthentication.js';

const adminRouter = express.Router();

adminRouter.get('/admins', tokenAuthentication('admin'), getAllAdmins);
adminRouter.post('/admins', tokenAuthentication('admin'), createAdmin);
adminRouter.patch('/admins/:id', tokenAuthentication('admin'), updateAdmin);
adminRouter.delete('/admins/:id', tokenAuthentication('admin'), deleteAdmin);
adminRouter.get('/admins/:id', getAdminById);

export default adminRouter;