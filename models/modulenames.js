'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class moduleNames extends Model {


    static associate(models) {
      // Define the relationship between moduleNames and syallabus
     
    }
  }

  moduleNames.init(
    {
      course_id: DataTypes.INTEGER,
      module_id: DataTypes.INTEGER,
      moduleNames: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'moduleNames',
    }
  );

  return moduleNames;
};
