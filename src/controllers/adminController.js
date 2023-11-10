import Admin from '../models/admin.js';
import Sale from '../models/sale.js';

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

export async function createAdmin(req, res) {
  try {
    const adminToSave = new Admin(req.body);
    if (await Admin.findOne({ where: { email: adminToSave.email }})) {
      return res.status(400).json({ message: 'Admin existente' });
    }
    await adminToSave.save();
    return res.status(201).json({ message: 'success' });
  } catch (error) {
    return res.status(204).json({ message: 'error' });
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
  const adminId = req.params.id;

  try {
    await Sale.destroy({
      where: {
        id_admin: adminId
      },
      
    })
    const result = await Admin.destroy({
      where: {
        id: adminId
      },
    });

    if (result === 0) {
      return res.status(404).json({ 
        message: 'El administrador no fue encontrado' 
      });
    };

    // Devolver una respuesta vacía (sin contenido) en caso de éxito.
    return res.status(200).json({ 
      message: 'El administrador fue eliminado' 
    }); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      message: 'Error al eliminar el administrador y registros relacionados en OtraEntidad' 
    });
  };
};
