'use strict';
module.exports = function(sequelize, DataTypes) {
  var Chat = sequelize.define('Chat', {
    text: DataTypes.STRING,
    chatid: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Chat.belongsTo(models.Telegram, {foreignKey: 'chatid'})
      }
    }
  });
  return Chat;
};
