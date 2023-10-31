import { DataTypes } from 'sequelize';
import db from '../db/connection.js';

const Sale = db.define(
    'sale',
    {
        id_sale: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        id_user: {
            type: DataTypes.INTEGER
        },
        id_methodPeyment: {
            type: DataTypes.INTEGER
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        total: {
            type: DataTypes.REAL
        }
    },
    {
        timestamps: false,
        tableName: 'sales'
    }
);

export default Sale;