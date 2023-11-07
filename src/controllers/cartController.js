import Cart from '../models/cart.js';

export const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.findAll(
      {
        attributes: ["id", "id_client","id_product", "quantity", "price"]
      }
    );
    res.status(200).json(carts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export async function createCart(req, res) {
  try{
      let bodyTemp = '';
      req.on('data', (chunk) => {
        bodyTemp += chunk.toString();
      });
      req.on('end', async () => {
        const data = JSON.parse(bodyTemp)
        req.body = data;

        const cart = await Cart.findOne({ where: { id_client: data.id_client }});
        if (cart) return res.status(400).json({ message: 'Carrito existente' });
        
        const cartToSave = new Cart(data);
        await cartToSave.save();
        
      });
      res.status(201).json({ message: 'success' });

    } catch (error) {
      res.status(204).json({ message: 'error' });
    }
};

export const getCartById = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findOne({
      where: { id },
      attributes: ["id", "id_client","id_product", "quantity", "price"],
    });
    res.json(cart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCart = async (req, res) => {
  const { id } = req.params;
  try {
    // await Sale.destroy({ where: { id } });
    await Cart.destroy({ where: { id } });

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
