'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class privacy_and_terms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  privacy_and_terms.init({
    termsText: DataTypes.STRING,
    PrivacyText: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'privacy_and_terms',
  });
  return privacy_and_terms;
};