const post = require("../../../class-activities/14-Full-Stack/01-Activities/12-Blog-CRUD/Unsolved/models/post");

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
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
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