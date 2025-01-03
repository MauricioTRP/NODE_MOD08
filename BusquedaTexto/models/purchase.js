'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    static async createOrder(data) {
      const transaction = await sequelize.transaction()

      try {
        const purchase = await this.create(data, { transaction })

        const book = await purchase.getBook({ transaction })
        book.stock -= 1

        await book.save({ transaction })
        await transaction.commit()

        return purchase
      } catch (err) {
        await transaction.rollback()
        throw err
      }
    }

    static async returnOrder(id) {
      const transaction = await sequelize.transaction()

      try {
        const purchase = await this.findByPk(id, { transaction })

        const book = await purchase.getBook({ transaction })
        book.stock += 1

        await book.save({ transaction })
        await purchase.destroy({ transaction })

        await transaction.commit()
      } catch (err) {
        await transaction.rollback()
        throw err
      }
    }

    static associate(models) {
      // define association here
      const { User, Book } = models
      this.belongsTo(User)
      this.belongsTo(Book)
    }
  }
  Purchase.init({
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    BookId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'books',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.REAL,
      validate: {
        min: { args: [0], msg: 'Amount debe ser mayor que cero' }
      }
    }
  }, {
    sequelize,
    modelName: 'Purchase',
    paranoid: true
  });
  return Purchase;
};