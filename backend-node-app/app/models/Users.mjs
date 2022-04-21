/* eslint-disable import/no-cycle */
import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
import Roles from './Roles.mjs';
import BooksRecords from './BooksRecords.mjs';

class Users extends psql.Model {
  static associate() {
    this.belongsTo(Roles, {
      foreignKey: 'id_rol',
    });
    this.hasMany(BooksRecords, {
      foreignKey: 'id_user',
    });
  }
}

Users.init(
  {
    id: {
      type: psql.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: psql.Sequelize.STRING,
    },
    last_name: {
      type: psql.Sequelize.STRING,
    },
    email: {
      type: psql.Sequelize.STRING,
    },
    password: {
      type: psql.Sequelize.STRING,
    },
    id_rol: {
      type: psql.Sequelize.INTEGER,
      unique: true,
      references: {
        model: 'id_rol',
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'users',
    schema: 'public',
    indexes: [
      {
        name: 'rol_pk',
        unique: true,
        fields: [{ name: 'id' }],
      },
    ],
  },
);

export default Users;
