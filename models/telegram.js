'use strict';
module.exports = function(sequelize, DataTypes) {
  var Telegram = sequelize.define('Telegram', {
    userid: DataTypes.STRING,
    chatid: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Telegram.hasMany(models.Chat, {foreignKey: 'chatid'})
      }
    }
  });
  return Telegram;
};
