import User from '../models/user.js';
import jwt from 'jsonwebtoken';

async function authenticate( req, res ) {
	const findUser = req.body.username;
	const recdPassword = req.body.password;

	let foundUsername = '';

	try {
		foundUsername = await User.findAll({ where: { username: findUser }});
		if (foundUsername == ''){
			return res.status(400).json({ message: 'Nombre de usuario no encontrado' });
		}
	} catch (error) {
		return res.status(400).json({ message: 'Nombre de usuario no encontrado' });
	}

	// password validation
	if (foundUsername[0].password !== recdPassword) {
		return res.status(400).json({ message: 'Contraseña incorrecta'});
	} 

	// generación de token
	const sub = foundUsername[0].id;
	const user = foundUsername[0].username;
	const role = foundUsername[0].role;

	// firma y construcción del token
	const token = jwt.sign({
		sub,
		user,
		role,
		exp: Date.now() + (600000 * 1000)
	}, process.env.SECRET_KEY);

	res.status(200).json({ accessToken: token })
};

export default authenticate;