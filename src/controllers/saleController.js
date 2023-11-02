import Sale from '../models/sale.js';

export const getAllSales = async (req, res) => {
    try {
      const sales = await Sale.findAll({
        attributes: ["id", "id_client","id_cart", "id_admin", "quantity", "total_price"],
        order: [["id", "DESC"]],
      });
      res.json(sales);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getSaleById = async (req, res) => {
    const { id } = req.params;
    try {
      const sale = await Sale.findOne({
        where: { id },
        attributes: ["id", "id_client","id_cart", "id_admin", "quantity", "total_price"],
      });
      res.json(sale);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const deleteSale = async (req, res) => {
    const { id } = req.params;
    try {
      await Sale.destroy({ where: { id } });
  
      return res.sendStatus(200);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };