import { DataTypes } from 'sequelize';
import db from '../db/connection.js';

const Cart = db.define(
    'cart',
    {
        id_cart: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        id_user: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
        id_product: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        }
    },
    {
        timestamps: false,
        tableName: 'carts'
    }
);

export default Cart;