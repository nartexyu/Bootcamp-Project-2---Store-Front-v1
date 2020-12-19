module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL (10, 2),
            defaultValue: 0.00
        },
        description: {
            type: DataTypes.TEXT,
            defaultValue: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum assumenda fuga consectetur libero doloremque nobis dolor deleniti distinctio sequi. Laudantium cumque a ducimus suscipit libero distinctio nam quas enim repellendus."
        },
        stock: {
            type: DataTypes.INTEGER,
            defaultValue: 1
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
            },
            onDelete: 'cascade'
        });
        Product.hasMany(models.Cart);
    };
    return Product;
};