import Cart from '../models/cart.js';

export const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.findAll({
      attributes: ["id", "id_client","id_product", "quantity", "price"],
      order: [["id", "DESC"]],
    });
    res.json(carts);
  } catch (error) {
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
    // await Sale.destroy({ where: { id } });
    await Cart.destroy({ where: { id } });

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
