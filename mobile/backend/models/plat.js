const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const plat = sequelize.define(
    "plart",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nom: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        prix: {
            type: DataTypes.DECIMAL(6,2),
            allowNull: false,
        },
        categorie: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        disponible: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        tableNAme: "plats",
        timetamps: true,
        createdAt: "created_at",
        updatedAt: false,
    }
);

module.exports = plat;