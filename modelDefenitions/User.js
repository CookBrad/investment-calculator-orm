module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            username: DataTypes.STRING,
            authId: DataTypes.STRING,
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
        },
        {
            tableName: 'users',

        }
    );
    User.associate = function associate(models) {
        this.UserStocks = this.hasMany(models.UserStock, {
            foreignKey: 'userId',
        });
        this.UserStockTransactions = this.hasMany(models.UserStockTransaction, {
            foreignKey: 'userId',
        });
    };

    return User;
};