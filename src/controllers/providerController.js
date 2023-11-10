import Product from '../models/product.js';
import Provider from '../models/provider.js';

export async function getAllProviders(req, res) {
    try {
      const providers = await Provider.findAll({
        atributes: [
          'id', 
          'name', 
          'email', 
          'telephone', 
          'username', 
          'password'
        ]
      });
      res.json(providers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

export async function getProviderById(req, res) {
  try {
    const providerId = parseInt(req.params.id);
    const provider = await Provider.findByPk(providerId);
    if (!provider) return res.status(404).json({ message: 'Proveedor no encontrado' });
    res.json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export async function createProvider (req, res) {
  try {
    const providerToSave = new Provider(req.body);
    if (await Provider.findOne({ where: { email: providerToSave.email }})) {
      return res.status(400).json({ message: 'Proveedor existente' });
    }
    await providerToSave.save();
    return res.status(201).json({ message: 'success' });
  } catch (error) {
    return res.status(204).json({ message: 'error' });
  }
};

export async function updateProvider(req, res) {
const  providerId = parseInt(req.params.id);
try {
    const providerToUpdate = await Provider.findByPk(providerId);
    if (!providerToUpdate) return res.status(404).json({ message: 'Proveedor no encontrado'});
  
  let bodyTemp = '';
  req.on('data', (chunk) => {
    bodyTemp += chunk.toString();
  });

  req.on('end', async () => {
    const data = JSON.parse(bodyTemp)
    req.body = data;
  });

  await providerToUpdate.update(req.body);
  return res.status(200).send('Proveedor actualizado');
  
} catch (error) {
    res.status(204).json({ message: 'Proveedor no encontrado'});
}
};

export async function deleteProvider(req, res) {
  const providerId = req.params.id;

  try {
    await Product.destroy({
      where: {
        id_provider: providerId
      },
    });

    const result = await Provider.destroy({
      where: {
        id: providerId
      },
    });

    if (result === 0) {
      return res.status(404).json({ 
        message: 'El proveedor no fue encontrado' 
      });
    };

    // Devolver una respuesta vacía (sin contenido) en caso de éxito.
    return res.status(200).json({ 
      message: 'El proveedor fue eliminado' 
    }); 

  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      message: 'Error al eliminar el proveedor y registros relacionados en OtraEntidad' 
    });
  };
};


