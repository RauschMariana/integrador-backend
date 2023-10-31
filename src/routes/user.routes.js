import express from 'express';
import { 
    getAllUsers,
    createUser,   
    updateUser,
    deleteUser, 
    getUserById, 
    getUserNameById
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/users/', getAllUsers); // Obtener todos los usuarios
userRouter.post('/users', createUser); // Crear un nuevo usuario
userRouter.patch('/users/:id', updateUser); // Actualizar un usuario
userRouter.delete('/users/:id', deleteUser); // Eliminar un usuario

userRouter.get('/users/:id', getUserById); // Obtener un usuario por ID
userRouter.get('/users/:id/name', getUserNameById); // Obtener nombre de usuario por ID

export default userRouter;
