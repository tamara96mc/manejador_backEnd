'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class users extends Model {

    static associate(models) {
   
    }
    
  };
  users.init({
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    contraseya: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};
