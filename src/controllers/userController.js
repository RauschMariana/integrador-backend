import User from '../models/user.js';

export async function getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        atributes: [
          'id', 
          'role', 
          'name', 
          'email', 
          'telephone', 
          'username', 
          'password'
        ]
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};


export async function createUser(req, res) { 
  try {
    const userToSave = new User(req.body);
    if (await User.findOne({ where: { email: userToSave.email }})) {
      return res.status(400).json({ message: 'Usuario existente' });
    };
    await userToSave.save();
    return res.status(201).json({ message: 'success' });
  } catch (error) {
    return res.status(204).json({ message: 'error' });
  };
};

export async function updateUser(req, res) {
  const userId = parseInt(req.params.id);
  try {
    const userToUpdate = await User.findByPk(userId);
    if (!userToUpdate) return res.status(404).json({ message: 'Usuario no encontrado' });
    let bodyTemp = '';
    req.on('data', (chunk) => {
      bodyTemp += chunk.toString();
    });
    req.on('end', async () => {
      const data = JSON.parse(bodyTemp)
      req.body = data;
      await userToUpdate.update(req.body);
    });
    return res.status(200).send('Usuario actualizado');
  } catch (error) {
    res.status(204).json({ message: 'Usuario no encontrado' });
  }
};
  
export async function deleteUser(req, res) {
  try {
    const userId = parseInt(req.params.id);
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    await user.destroy();
    return res.status(200).json({message:'Usuario eliminado'});
    
  } catch (error) {
    return res.status(204).json({ message: 'Usuario no encontrado' });
  }
};

export async function getUserById(req, res) {
	const userId = parseInt(req.params.id);
	try {
		const userDate = await User.findByPk(userId);
		res.json(userDate);
	} catch (error) {
		res.status(204).json({ message: 'Usuario no encontrado'});
	}
};

export async function getUserNameById(req, res) {
	const userId = parseInt(req.params.id);
	try {
		const userName = await User.findByPk(userId);
		const name = userName.name;
		res.json(name);
	} catch (error) {
		res.status(204).json({ message:'Usuario no encontrado' });
	}
};
