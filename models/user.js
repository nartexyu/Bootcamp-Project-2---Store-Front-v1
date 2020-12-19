const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isSeller: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    User.associate = models => {
        User.hasOne(models.Store);
        User.hasMany(models.Cart);
    };
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };
    User.addHook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    return User;
};