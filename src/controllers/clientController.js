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
  try{
      let bodyTemp = '';
      req.on('data', (chunk) => {
        bodyTemp += chunk.toString();
      });
      req.on('end', async () => {
        const data = JSON.parse(bodyTemp)
        req.body = data;

        const client = await Client.findOne({ where: { email: data.email }});
        if (client) return res.status(400).json({ message: 'Cliente existente' });
        
        const clientToSave = new Client(data);
        await clientToSave.save();
        res.status(201).json({ message: 'success' });
      });

    } catch (error) {
      res.status(204).json({ message: 'error' });
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
    return res.status(200).send('Cliente actualizado');
    
  } catch (error) {
  	res.status(204).json({ message: 'Cliente no encontrado'});
  }
};
  
export async function deleteClient(req, res) {
  try {
    const clientId = parseInt(req.params.id);
    const client = await Client.findByPk(clientId);
    if (!client) return res.status(404).json({ message: 'Cliente no encontrado' });

    await  Cart.destroy({ where: { id_client: clientId }});
    await client.destroy();
    return res.status(200).json({message:'Cliente eliminado'});
    
  } catch (error) {
    return res.status(204).json({ message: 'Cliente no encontrado' });
  }
};

export async function getClientCart(req, res) {
  const { id } = req.params;
  try {
    const carts = await Cart.findAll({
      attributes: ["id", "id_client", "id_product", "quantity", "price"],
      where: { id_client: id },
    });
    res.json(carts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

