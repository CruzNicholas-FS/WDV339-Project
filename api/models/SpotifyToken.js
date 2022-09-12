'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotifyToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SpotifyToken.init({
    accessToken: DataTypes.STRING,
    tokenType: DataTypes.STRING,
    expiresIn: DataTypes.BIGINT,
    refreshToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SpotifyToken',
  });
  return SpotifyToken;
};