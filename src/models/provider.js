import { DataTypes } from 'sequelize';
import db from '../db/connection.js';
import Product from './product.js';

const Provider = db.define(
    'provider',
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
		tableName: 'providers'
    }
);

Provider.hasMany(Product, { foreignKey: 'id_provider', sourceKey: 'id' });
Product.belongsTo(Provider, { foreignKey: 'id_provider', targetId: 'id' });

export default Provider;