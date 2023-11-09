import { DataTypes } from 'sequelize';
import db from '../db/connection.js';
import Cart from './cart.js';

const Client = db.define(
    'client',
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
		tableName: 'clients'
    }
);

Client.hasMany(Cart, { foreinkey: "id_client", sourceKey: "id", onDelete: "CASCADE" });
Cart.belongsTo(Client, { foreinkey: "id_client", targetId: "id", onDelete: "CASCADE" });

export default Client;