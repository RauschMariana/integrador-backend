import { DataTypes } from 'sequelize';
import db from '../db/connection.js';

const Sale = db.define(
    'sale',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
			field: 'id',
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