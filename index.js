require('dotenv').config();

const modelDefenitions = require('./modelDefenitions');

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    define: {
        underscored: true,
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: true
    }
});


const models = {};
for (const modelDefenition of Object.values(modelDefenitions)) {
    const model = modelDefenition(sequelize, Sequelize.DataTypes);
    models[model.name] = model;
}

Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
    }
});

const databaseClient = {
    sequelize,
    Sequelize,
    models
}

module.exports = databaseClient;