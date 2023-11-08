import Admin from '../models/admin.js';
import Cart from '../models/cart.js';
import Sale from '../models/sale.js';

export const getAllSales = async (req, res) => {
    try {
      const sales = await Sale.findAll({
        attributes: ["id", "id_admin", "id_cart", "total"]
      });
      res.json(sales);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export async function getSaleById(req, res) {
    const { id } = req.params;
    try {
      const sale = await Sale.findOne({
        where: { id },
        attributes: ["id", "id_admin" , "id_cart", "total"],
      });
      res.json(sale);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  
  export async function deleteSale(req, res) {
    const { id } = req.params;
    try {
      await Cart.destroy({ where: { id_cart: id } });
      await Admin.destroy({ where: { id_admin: id } });
      await Sale.destroy({ where: { id } });
  
      return res.sendStatus(200);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
