module.exports = (sequelize, DataTypes) => {
    const Store = sequelize.define("Store", {
        store_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner_first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner_last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
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
    };
    return Store;
};