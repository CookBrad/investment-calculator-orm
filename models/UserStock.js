module.exports = (sequelize, DataTypes) => {
    const UserStock = sequelize.define(
        'UserStock',
        {
            userId: DataTypes.INTEGER,
            stockId: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER
        }
    );
    UserStock.associate = (models) => {
        this.User = UserStock.belongsTo(models.User, {
            foreignKey: 'userId'
        });
        this.Stock = UserStock.belongsTo(models.Stock, {
            foreignKey: 'stockId'
        });
    };

    return UserStock;
};