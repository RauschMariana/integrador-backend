import express from 'express';
import db from './db/connection.js';

// import authenticate from './middlewares/authenticate.js';
// import makeBody from './middlewares/makeBody.js';
// import tokenAuthorization from './middlewares/tokenAuthorization.js';

import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';

const app = express();
const expossedPort = process.env.PORT || 3100;

// Middlewares
// app.post('/', authenticate);
// app.use(makeBody);
// app.use(tokenAuthorization);

// Routes
app.use('/', userRouter);
app.use('/', productRouter);

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
