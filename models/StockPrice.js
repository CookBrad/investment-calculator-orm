module.exports = (sequelize, DataTypes) => {
    const StockPrice = sequelize.define(
        'StockPrice',
        {
            stockId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            open: DataTypes.DECIMAL(15, 2),
            close: DataTypes.DECIMAL(15, 2),
            high: DataTypes.DECIMAL(15, 2),
            low: DataTypes.DECIMAL(15, 2),
            volume: DataTypes.INTEGER,
            previousClose: DataTypes.DECIMAL(15, 2),

        }
    );
    StockPrice.associate = (models) => {
        this.Stock = StockPrice.belongsTo(models.Stock, {
            foreignKey: 'stockId',

        });
    };

    return StockPrice;
};