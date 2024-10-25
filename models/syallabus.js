'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class syallabus extends Model {

    static associate(models) {
    }
  }
  syallabus.init({
    course_id: DataTypes.INTEGER,
    chapter_id: DataTypes.INTEGER,
    module_id: DataTypes.INTEGER,
    audiopath: DataTypes.STRING,
    pdfpath: DataTypes.STRING,
    chapter_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'syallabus',
  });
  return syallabus;
};