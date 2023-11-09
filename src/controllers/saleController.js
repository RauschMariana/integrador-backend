// import Admin from '../models/admin.js';
// import Cart from '../models/cart.js';
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
    const saleId = req.params.id;

  try {
    // await Admin.destroy({ where: { id_admin: saleId } });
    // await Cart.destroy({ where: { id_cart: saleId }});
    
    const result = await Sale.destroy({
      where: {
        id: saleId
      },
    });

    if (result === 0) {
      return res.status(404).json({ message: 'La venta no fue encontrada' });
    }

    return res.status(200).json({ message: 'La venta fue eliminado' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al eliminar la venta y registros relacionados en otra entidad' });
  }
};
