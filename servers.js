import express from 'express';
import db from './src/db/connection.js';

import makeBody from './src/middlewares/makeBody.js';
import authentication from './src/middlewares/authentication.js';

import userRouter from './src/routes/user.routes.js';
import productRouter from './src/routes/product.routes.js';
import cartRouter from './src/routes/cart.routes.js';
import clientRouter from './src/routes/client.routes.js';
import providerRouter from './src/routes/provider.routes.js';
import adminRouter from './src/routes/admin.routes.js';
import saleRouter from './src/routes/sale.routes.js';



const app = express();
const expossedPort = process.env.PORT || 3100;

// Middlewares
app.use(makeBody);

app.post('/auth', authentication);

// Routes
app.use('/', userRouter);
app.use('/', clientRouter);
app.use('/', providerRouter);
app.use('/', adminRouter);
app.use('/', saleRouter);
app.use('/', productRouter);
app.use('/', cartRouter);

try {
	await db.authenticate();
	console.log('Connection has been established successfully.');
} catch (error) {
	console.error('Unable to connect to the database:', error);
}

app.use(( req, res ) => {
    res.status(404).send('<h1>404</h1>');
});

app.listen(expossedPort, () => {
    console.log('Servidor iniciado en el puerto http://localhost:' + expossedPort);
});
