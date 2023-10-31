import Product from '../models/product.js';

export async function getAllProducts(req, res) {
    try {
      const products = await Product.findAll({
        atributes: [
          'id', 
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
  try{
    let bodyTemp = ''

    req.on('data', (chunk) => {
        bodyTemp += chunk.toString()
    })

    req.on('end', async () => {
      const data = JSON.parse(bodyTemp);
      req.body = data;

      // vailda si existe usuario con ese email
      const product = await Product.findOne({ where: {name: data.name} });
      if (product) return res.status(400).json({ message:'Producto existente' });
     
      const producToSave = new Product(req.body)
      await producToSave.save();

      return res.status(201).json({"message": "success"})
    });
    
  } catch (error) {
    return res.status(204).json({ message: 'error' });
  }
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
        
      await producToUpdate.update(req.body);
    });

    return res.status(200).send('Producto actualizado');
      
  } catch (error) {
    return res.status(204).json({ message: 'Producto no encontrado' });
  }
};
  
export async function deleteProduct(req, res) {
  try {
    const productId = parseInt(req.params.id);
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    await product.destroy();
    return res.status(200).json({ message:'Producto eliminado' });
    
  } catch (error) {
    return res.status(204).json({ message: 'Producto no encontrado' });
  }
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

