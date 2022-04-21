import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
// eslint-disable-next-line import/no-cycle
import BooksRecords from './BooksRecords.mjs';

class Books extends psql.Model {
  static associate() {
    this.hasMany(BooksRecords, {
      foreignKey: 'isbn',
    });
  }
}

Books.init(
  {
    isbn: {
      type: psql.Sequelize.STRING,
      primaryKey: true,
    },
    title: {
      type: psql.Sequelize.STRING,
    },
    author: {
      type: psql.Sequelize.STRING,
    },
    published_year: {
      type: psql.Sequelize.INTEGER,
    },
    genre: {
      type: psql.Sequelize.STRING,
    },
    stock: {
      type: psql.Sequelize.STRING,
    },
  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'books',
    schema: 'public',
  },
);

export default Books;
