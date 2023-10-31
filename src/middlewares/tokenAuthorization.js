import jwt from 'jsonwebtoken';
// Middleware para la validación de los token recibidos

function tokenAuthorization(req, res, next) {
	const headerAuthorization = req.headers['authorization'];
	const recdToken = headerAuthorization.split(' ')[1];

	if (recdToken == null){
		return res.status(401).json({ message: 'Token inválido' });
	}

	let payload = null;

	try {
		payload = jwt.verify(recdToken, process.env.SECRET_KEY);
	} catch (error) {
		return res.status(401).json({ message: 'Token inválido' });
	};

	if (Date.now() > payload.exp) {
		return res.status(401).json({ message: 'Token expirado' });
	}

	res.user = payload.sub;

	next();
};

export default tokenAuthorization;