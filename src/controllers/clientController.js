import Cart from '../models/cart.js';
import Client from '../models/client.js';

export async function getAllClients(req, res) {
    try {
      const users = await Client.findAll({
        atributes: [
          'id', 
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

export async function createClient(req, res) {

  try {
    const clientToSave = new Client(req.body);
    if (await Client.findOne({ where: { email: clientToSave.email }})) {
      return res.status(400).json({ message: 'Cliente existente' });
    }
    await clientToSave.save();
    return res.status(201).json({ message: 'success' });
  } catch (error) {
    return res.status(204).json({ message: 'error' });
  }  
};

export async function updateClient(req, res) {
  const clientId = parseInt(req.params.id);
  try {
  	const clientToUpdate = await Client.findByPk(clientId);
  	if (!clientToUpdate) return res.status(404).json({ message: 'Cliente no encontrado'});
    
    let bodyTemp = '';
    req.on('data', (chunk) => {
      bodyTemp += chunk.toString();
    });

    req.on('end', async () => {
      const data = JSON.parse(bodyTemp)
      req.body = data;
    });

    await clientToUpdate.update(req.body);
    return res.status(200).json({ message: 'Cliente actualizado' });
    
  } catch (error) {
  	res.status(204).json({ message: 'Cliente no encontrado'});
  }
};
  
export async function deleteClient(req, res) {
  const clientId = req.params.id;

  try {
    await Cart.destroy({
      where: {
        id_client: clientId
      },
      
    })
    const result = await Client.destroy({
      where: {
        id: clientId
      },
    });

    if (result === 0) {
      return res.status(404).json({ message: 'El cliente no fue encontrado' });
    }

    return res.status(200).json({ message: 'Cliente eliminado' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al eliminar el cliente y registros relacionados en OtraEntidad' });
  }
};
