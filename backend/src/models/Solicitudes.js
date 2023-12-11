import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class Solicitudes extends Sequelize.Model {};

Solicitudes.init({
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    pago_mensual: Sequelize.DataTypes.FLOAT,
    pago_total: Sequelize.DataTypes.FLOAT,
    interes_total: Sequelize.DataTypes.FLOAT,
    estado: Sequelize.DataTypes.STRING,
    }, {
        sequelize,
        timestamps: true,
    }
);

export default Solicitudes;
