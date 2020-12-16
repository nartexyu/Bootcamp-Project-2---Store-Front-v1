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
            defaultValue: "https://placehold.it/1920x1080"
        },
        about: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        about_image: {
            type: DataTypes.STRING,
            defaultValue: "https://placehold.it/1920x1080"
        },
        font_color: {
            type: DataTypes.STRING,
            defaultValue: "black"
        },
        accent_color: {
            type: DataTypes.STRING,
            defaultValue: "white"
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