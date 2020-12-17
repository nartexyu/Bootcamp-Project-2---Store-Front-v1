module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define("Cart", {
        // product: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        // price: {
        //     type: DataTypes.DECIMAL (10, 2),
        //     allowNull: false
        // },
        // image: {
        //     type: DataTypes.STRING,
        //     defaultValue: "https://placehold.it/75x75"
        // },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    });
    Cart.associate = models => {
        Cart.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Cart.belongsTo(models.Product, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Cart;
};