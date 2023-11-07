import { DataTypes } from 'sequelize';
import db from '../db/connection.js';

const User = db.define(
    'user',
    {
        id: {
            type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			field: 'id',
        },
        role: {
			type: DataTypes.ENUM('client', 'provider', 'admin')
		},
        name: {
			type: DataTypes.STRING
		},
        email: {
			type: DataTypes.STRING 
		},
		telephone: {
			type: DataTypes.STRING 
		},
		username: {
			type: DataTypes.STRING 
		},
		password: {
			type: DataTypes.STRING 
		}
    },
    {
        timestamps: false,
		tableName: 'users'
    }
);

export default User;