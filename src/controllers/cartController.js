import Cart from '../models/cart.js';
import Sale from '../models/sale.js';

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
  const cartId = req.params.id;
  try {
    await Sale.destroy({ where: { id_cart: cartId }});

    const result = await Cart.destroy({
      where: { id: cartId },
    });
    if (result === 0) {
      return res.status(404).json({ message: 'El carrito no fue encontrado' });
    }
    return res.status(200).json({ message: 'Carrito eliminado' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al eliminar el carrito y registros relacionados en OtraEntidad' });
  }
};
