import { DataTypes } from 'sequelize';
import db from '../db/connection.js';

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

//Cart.belongsTo(Sale, { foreinkey: "id_cart", sourceKey: "id" });

export default Cart;