import { DataTypes } from 'sequelize';
import db from '../db/connection.js';
import Sale from './sale.js';

const Admin = db.define(
    'admin',
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
		tableName: 'admins'
    }
);

Admin.hasMany(Sale, ({ foreignKey: 'id_admin', sourceKey: 'id' , onDelete: 'CASCADE' }));
Sale.belongsTo(Admin, ({ foreignKey: 'id_admin', targetKey: 'id', onDelete: 'CASCADE' }));

export default Admin;