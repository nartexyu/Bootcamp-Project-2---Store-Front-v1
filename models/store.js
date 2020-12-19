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
        bg_scroll: {
            type: DataTypes.STRING,
            defaultValue: "fixed"
        },
        about: {
            type: DataTypes.TEXT,
            defaultValue: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla dignissimos labore ex reiciendis, qui ipsa molestias suscipit dolore! Mollitia dolores deleniti odit laudantium accusantium facilis doloribus reprehenderit omnis. Iure, laboriosam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat quia voluptatibus, hic saepe assumenda eius ullam autem rem itaque libero fugiat, omnis aliquam explicabo labore dolore eaque incidunt necessitatibus non. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam maiores rerum voluptate, omnis alias vitae explicabo labore dolorum optio doloremque dicta beatae! Eaque excepturi eveniet labore quibusdam dolor vero doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam molestiae, eius enim id maiores aperiam saepe velit omnis nostrum voluptatibus reprehenderit, aut nemo, tenetur officiis minima illum? Impedit, maiores dolor!"
        },
        about_image: {
            type: DataTypes.STRING,
            defaultValue: "https://placehold.it/1920x1080"
        },
        about_scroll: {
            type: DataTypes.STRING,
            defaultValue: "scroll"
        },
        font_color: {
            type: DataTypes.STRING,
            defaultValue: "black"
        },
        body_color: {
            type: DataTypes.STRING,
            defaultValue: "black"
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
        Store.hasMany(models.Product);
        Store.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            },
            onDelete: 'cascade'
        });
    };
    return Store;
};