module.exports = (sequelize, DataTypes) => {
    const UserStockTransaction = sequelize.define(
        'UserStockTransaction',
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            stockId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            transactionType: {
                type: DataTypes.ENUM('buy', 'sell'),
                allowNull: false
            },
            transactionDate: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            pricePerShare: {
                type: DataTypes.DECIMAL(15, 2),
                allowNull: false
            },
            totalValue: {
                type: DataTypes.DECIMAL(15, 2),
                allowNull: false
            }
        }
    );
    UserStockTransaction.associate = (models) => {
        this.User = this.belongsTo(models.User, {
            foreignKey: 'userId'
        });
        this.Stock = UserStockTransaction.belongsTo(models.Stock, {
            foreignKey: 'stockId'
        });
    };

    return UserStockTransaction;
};