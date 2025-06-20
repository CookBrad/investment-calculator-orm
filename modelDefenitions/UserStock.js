module.exports = (sequelize, DataTypes) => {
    const UserStock = sequelize.define(
        'UserStock',
        {
            userId: DataTypes.INTEGER,
            stockId: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER
        },
        {
            tableName: 'user_stocks',

        }
    );
    UserStock.associate = function associate(models) {
        this.User = this.belongsTo(models.User, {
            foreignKey: 'userId'
        });
        this.Stock = this.belongsTo(models.Stock, {
            foreignKey: 'stockId'
        });
    };

    return UserStock;
};