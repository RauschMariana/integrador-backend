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
        id_client: {
            type: DataTypes.INTEGER
        },
        id_product: {
            type: DataTypes.INTEGER
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

Cart.hasMany(Sale, { foreinkey: "id_cart", sourceKey: "id", onDelete: "CASCADE"});
Sale.belongsTo(Cart, { foreinkey: "id_cart", targetId: "id", onDelete: "CASCADE" });

export default Cart;