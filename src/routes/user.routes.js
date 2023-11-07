import express from 'express';
import { 
    getAllUsers,
    createUser,   
    updateUser,
    deleteUser, 
    getUserById, 
    getUserNameById
} from '../controllers/userController.js';

import tokenAuthorization from '../middlewares/tokenAuthorization.js';
import authenticate from '../middlewares/authenticate.js';
import makeBody from '../middlewares/makeBody.js';

const userRouter = express.Router();

userRouter.get('/users/', getAllUsers); // Obtener todos los usuarios
userRouter.post('/users', tokenAuthorization, makeBody, createUser); // Crear un nuevo usuario
userRouter.patch('/users/:id', tokenAuthorization, makeBody, updateUser); // Actualizar un usuario
userRouter.delete('/users/:id', tokenAuthorization, deleteUser); // Eliminar un usuario

userRouter.get('/users/:id', getUserById); // Obtener un usuario por ID
userRouter.get('/users/:id/name', getUserNameById); // Obtener nombre de usuario por ID
userRouter.post('/users/auth', authenticate);

export default userRouter;
