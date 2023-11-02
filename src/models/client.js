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

Client.hasOne(Cart, { foreinkey: "id_client", sourceKey: "id" });
Cart.belongsTo(Client, { foreinkey: "id_cart", targetId: "id" });

export default Client;