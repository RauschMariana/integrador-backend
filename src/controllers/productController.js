import Cart from '../models/cart.js';
import Product from '../models/product.js';


export async function getAllProducts(req, res) {
    try {
      const products = await Product.findAll({
        atributes: [
          'id',
          'id_provider',
          'name', 
          'type', 
          'description', 
          'price'
        ],
      });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

export async function createProduct(req, res) {
  try {
    const productToSave = new Product(req.body);
    
    if (await Product.findOne({ where: { id: productToSave.id }})) {
      return res.status(400).json({ message: 'Producto existente' });
    };

    await productToSave.save();

    return res.status(201).json({ message: 'success' });
  } catch (error) {
    return res.status(204).json({ message: 'error' });
  };  
};
  
export const updateProduct = async (req, res) => {
  let productId = parseInt(req.params.id)
  try {
    let producToUpdate = await Product.findByPk(productId);
    if (!producToUpdate) return res.status(404).json({ message : 'Producto no encontrado' });

    let bodyTemp = ''
    req.on('data', (chunk) => {
      bodyTemp += chunk.toString()
    });

    req.on('end', async () => {
      const data = JSON.parse(bodyTemp);
      req.body = data;
    });

    await producToUpdate.update(req.body);
    return res.status(200).json({ message: 'Producto actualizado' });
      
  } catch (error) {
    return res.status(204).json({ message: 'Producto no encontrado' });
  }
};
  
export async function deleteProduct(req, res) {
  const productId = req.params.id;

  try {
    await Cart.destroy({
      where: {
        id_product: productId
      },     
    });

    const result = await Product.destroy({
      where: {
        id: productId
      },
    });

    if (result === 0) {
      return res.status(404).json({ 
        message: 'El producto no fue encontrado' 
      });
    }

    return res.status(200).json({ message: 'Producto eliminado' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      message: 'Error al eliminar el cliente y registros relacionados en OtraEntidad' 
    });
  };

};

export async function getProductById(req, res) {
  let productId = parseInt(req.params.id)
  try {
    let productToFind = await Product.findByPk(productId);

    return res.status(200).json(productToFind);

  } catch (error) {
    return res.status(204).json({ message: 'Producto no encontrado' });
  }
};


export async function getProductPriceById(req, res) {
  const productId = parseInt(req.params.id);
	try {
		const productPrice = await Product.findByPk(productId);
		const price = productPrice.price;
		res.json({ price });
	} catch (error) {
		res.status(204).json({ message:'Producto no encontrado' });
	}
};
