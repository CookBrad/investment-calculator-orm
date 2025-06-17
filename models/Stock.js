module.exports = (sequelize, DataTypes) => {
    const Stock = sequelize.define(
        'Stock',
        {
            symbol: DataTypes.STRING,
            name: DataTypes.STRING,
        }
    );
    Stock.associate = (models) => {
        this.Userstocks = this.hasMany(models.UserStock, {
            foreignKey: 'stockId',
        });
        this.StockPrices = this.hasMany(models.StockPrice, {
            foreignKey: 'stockId',
        });
        this.UserStockTransactions = this.hasMany(models.UserStockTransaction, {
            foreignKey: 'stockId',
        });
    }

    return Stock;
};