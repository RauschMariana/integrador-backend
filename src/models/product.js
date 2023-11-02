import { DataTypes } from 'sequelize';
import db from '../db/connection.js';
import Cart from './cart.js';

const Product = db.define(
    'product',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
			field: 'id',
        },
        name: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.REAL
        }
    },
    {
        timestamps: false,
        tableName: 'products'
    }
);

Product.hasMany(Cart, { foreinkey: "id_product", sourceKey: "id" });
Cart.belongsTo(Product, { foreinkey: "id_cart", targetId: "id" });

export default Product;