/* eslint-disable import/no-cycle */
import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
import Users from './Users.mjs';
import Books from './Books.mjs';

class BooksRecords extends psql.Model {
  static associate() {
    this.belongsTo(Users, {
      foreignKey: 'id_user',
    });

    this.belongsTo(Books, {
      foreignKey: 'isbn',
    });
  }
}

BooksRecords.init(
  {
    id: {
      type: psql.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: psql.Sequelize.STRING,
      unique: true,
      references: {
        model: 'id_user',
        key: 'id',
      },
    },
    isbn: {
      type: psql.Sequelize.STRING,
      unique: true,
      references: {
        model: 'isbn',
        key: 'isbn',
      },
    },
    quantity: {
      type: psql.Sequelize.INTEGER,
    },
    movement_type: {
      type: psql.Sequelize.ENUM(['entry', 'egress']),
    },
    movement_date: {
      type: psql.Sequelize.DATE,
    },
  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'books_records',
    schema: 'public',
    indexes: [
      {
        name: 'id_user',
        unique: true,
        fields: [{ name: 'id' }],
      },
      {
        name: 'isbn',
        unique: true,
        fields: [{ name: 'isbn' }],
      },
    ],
  },
);

export default BooksRecords;
