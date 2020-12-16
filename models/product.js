module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL (10, 2),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        popularity: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        image: {
            type: DataTypes.STRING,
            defaultValue: "https://placehold.it/200x200"
        }
    });
    Product.associate = models => {
        Product.belongsTo(models.Store, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Product;
}