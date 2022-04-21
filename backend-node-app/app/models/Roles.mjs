import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
// eslint-disable-next-line import/no-cycle
import Users from './Users.mjs';

class Roles extends psql.Model {
  static associate() {
    this.hasMany(Users, {
      foreignKey: 'id_rol',
    });
  }
}

Roles.init(
  {
    id: {
      type: psql.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: psql.Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'roles',
  },
);

export default Roles;
