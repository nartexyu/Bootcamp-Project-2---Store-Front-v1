module.exports = (sequelize, DataTypes) => {
    const Store = sequelize.define("Store", {
        store_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tagline: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        font: {
            type: DataTypes.STRING,
            defaultValue: "Helvetica Neue"
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
        body_color: {
            type: DataTypes.STRING,
            defaultValue: "gray"
        },
        footer_color: {
            type: DataTypes.STRING,
            defaultValue: "white"
        },
        accent_color: {
            type: DataTypes.STRING,
            defaultValue: "black"
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