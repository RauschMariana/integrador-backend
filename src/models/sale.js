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

        id_cart: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        id_admin: {
            type: DataTypes.INTEGER,
            allowNull: false,
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