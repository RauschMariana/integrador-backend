import { DataTypes } from 'sequelize';
import db from '../db/connection.js';

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
            type: DataTypes.DOUBLE
        }
    },
    {
        timestamps: false,
        tableName: 'products'
    }
);

export default Product;