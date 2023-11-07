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

export async function createProvider (req, res) {
  try{
      let bodyTemp = '';
      req.on('data', (chunk) => {
        bodyTemp += chunk.toString();
      });
      req.on('end', async () => {
        const data = JSON.parse(bodyTemp)
        req.body = data;

        const provider = await Admin.findOne({ where: { email: data.email }});
        if (provider) return res.status(400).json({ message: 'Proveedor existente' });
        
        const providerToSave = new Provider(data);
        await providerToSave.save();
        res.status(201).json({ message: 'success' });
      });

    } catch (error) {
      res.status(204).json({ message: 'error' });
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
try {
  const providerId = parseInt(req.params.id);
  const provider = await Provider.findByPk(providerId);
  if (!provider) return res.status(404).json({ message: 'Proveedor no encontrado' });

  await provider.destroy();
  return res.status(200).json({message:'Proveedor eliminado'});
  
} catch (error) {
  return res.status(204).json({ message: 'Proveedor no encontrado' });
}
};
