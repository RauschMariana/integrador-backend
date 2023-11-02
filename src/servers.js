import express from 'express';
import db from './db/connection.js';

import authenticate from './middlewares/authenticate.js';
import makeBody from './middlewares/makeBody.js';

import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';
import cartRouter from './routes/cart.routes.js';
import clientRouter from './routes/client.routes.js';
// import providerRouter from './routes/provider.routes.js';
// import adminRouter from './routes/admin.routes.js';
// import saleRouter from './routes/sale.routes.js';

const app = express();
const expossedPort = process.env.PORT || 3100;

// Middlewares
app.use(makeBody);

app.post('/auth', authenticate);

// Routes
app.use('/', userRouter);
app.use('/', clientRouter);
// app.use('/', providerRouter);
// app.use('/', adminRouter);
// app.use('/', saleRouter);
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
