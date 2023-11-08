import Cart from '../models/cart.js';
import Client from '../models/client.js';
import Product from '../models/product.js';

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
    await Client.destroy({ where: { id_client: id } });
    await Product.destroy({ where: { id_product: id } });
    await Cart.destroy({ where: { id } });

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
