module.exports = (sequelize, DataTypes) => {
    const Store = sequelize.define("Store", {
        store_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        font: {
            type: DataTypes.STRING,
            defaultValue: "Times New Roman"
        },
        background_image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        about: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        about_image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        accent_color: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    Store.associate = models => {
        Store.hasMany(models.Product, {
            onDelete: "cascade"
        });
        Store.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Store;
};