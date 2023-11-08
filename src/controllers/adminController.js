import Admin from '../models/admin.js';

export async function getAllAdmins(req, res) {
    try {
      const admins = await Admin.findAll({
        atributes: [
          'id', 
          'name', 
          'email', 
          'telephone', 
          'username', 
          'password'
        ]
      });
      res.json(admins);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

export async function getAdminById(req, res) {
  try {
    const adminId = parseInt(req.params.id);
    const admin = await Admin.findByPk(adminId);
    if (!admin) return res.status(404).json({ message: 'Admin no encontrado' });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createAdmin (req, res) {
  try{
      let bodyTemp = '';
      req.on('data', (chunk) => {
        bodyTemp += chunk.toString();
      });
      req.on('end', async () => {
        const data = JSON.parse(bodyTemp)
        req.body = data;

        const admin = await Admin.findOne({ where: { email: data.email }});
        if (admin) return res.status(400).json({ message: 'Admin existente' });
        
        const adminToSave = new Admin(data);
        await adminToSave.save();
        res.status(201).json({ message: 'success' });
      });

    } catch (error) {
      res.status(204).json({ message: 'error' });
    }
};

export async function updateAdmin(req, res) {
  const  adminId = parseInt(req.params.id);
  try {
  	const adminToUpdate = await Admin.findByPk(adminId);
  	if (!adminToUpdate) return res.status(404).json({ message: 'Admin no encontrado'});
    
    let bodyTemp = '';
    req.on('data', (chunk) => {
      bodyTemp += chunk.toString();
    });

    req.on('end', async () => {
      const data = JSON.parse(bodyTemp)
      req.body = data;
    });

    await adminToUpdate.update(req.body);
    return res.status(200).send('Admin actualizado');
    
  } catch (error) {
  	res.status(204).json({ message: 'Admin no encontrado'});
  }
};
  
export async function deleteAdmin(req, res) {
  try {
    const adminId = parseInt(req.params.id);
    const admin = await Admin.findByPk(adminId);
    if (!admin) return res.status(404).json({ message: 'Admin no encontrado' });

    await  Cart.destroy({ where: { id_client: clientId }});
    await client.destroy();
    return res.status(200).json({message:'Admin eliminado'});
    
  } catch (error) {
    return res.status(204).json({ message: 'Admin no encontrado' });
  }
};
