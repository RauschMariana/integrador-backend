import express from 'express';
import { 
    getAllUsers,
    createUser,   
    updateUser,
    deleteUser, 
    getUserById, 
    getUserNameById
} from '../controllers/userController.js';
import tokenAuthentication from '../middlewares/tokenAuthentication.js';

const userRouter = express.Router();

userRouter.get('/users/', tokenAuthentication('admin'), getAllUsers); // Obtener todos los usuarios
userRouter.post('/users', tokenAuthentication('admin'), createUser); // Crear un nuevo usuario
userRouter.put('/users/:id', tokenAuthentication('admin'), updateUser); // Actualizar un usuario
userRouter.delete('/users/:id', tokenAuthentication('admin'), deleteUser); // Eliminar un usuario

userRouter.get('/users/:id', tokenAuthentication('admin'), getUserById); // Obtener un usuario por ID
userRouter.get('/users/:id/name', tokenAuthentication('admin'), getUserNameById); // Obtener nombre de usuario por ID

export default userRouter;
