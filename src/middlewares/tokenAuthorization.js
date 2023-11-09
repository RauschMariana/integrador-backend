import jwt from 'jsonwebtoken';
// Middleware para la validación de los token recibidos

function tokenAuthorization(role) {
	return function (req, res, next) {
		const headerAuthorization = req.headers['authorization'];

		if (!headerAuthorization) {
			return res.status(401).json({ message: 'Token inválido' });
		}
		
		const receivedToken = headerAuthorization.split(' ')[1];
	
		if (receivedToken == null){
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

		if (payload.role !== role){
			return res.status(403).json({ message: 'Acceso denegado' });
		}
	
		res.user = payload.sub;
	
		next();
	};
};

export default tokenAuthorization;