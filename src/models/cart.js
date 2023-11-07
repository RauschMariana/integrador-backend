import { DataTypes } from 'sequelize';
import db from '../db/connection.js';
import Sale from './sale.js';

const Cart = db.define(
    'cart',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
			field: 'id',
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        price: {
            type: DataTypes.REAL
        },
    },
    {
        timestamps: false,
        tableName: 'carts'
    }
);

Cart.hasMany(Sale, { foreinkey: "id_cart", sourceKey: "id" });
Sale.belongsTo(Cart, { foreinkey: "id_cart", targetId: "id" });

export default Cart;