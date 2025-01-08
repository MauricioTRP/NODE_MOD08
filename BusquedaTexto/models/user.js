'use strict';
const {
  Model
} = require('sequelize');
const argon2 = require('argon2')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    toJSON() {
      const user = this.dataValues
      delete user.password

      return user
    }

    static associate(models) {
      // define association here
      const { Purchase, Book } = models
      this.hasMany(Purchase)
      this.belongsToMany(Book, { through: Purchase })
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 8
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeSave: async (user, options) => {
        console.log("changing password")
        if(user.changed('password')) {
          user.password = await argon2.hash(user.password)
        }
      }
      // beforeBulkUpdate: async user => {
      //   if(user.changed('password')) {
      //     user.password = await argon2.hash(user.password)
      //   }
      // }
    },
    paranoid: true
  });

  return User;
};