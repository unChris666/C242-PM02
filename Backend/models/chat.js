'use strict';
const { 
    Model
 } = require('sequelize');
 module.exports = (sequelize, DataTypes) => {
    class Chat extends Model {
      static associate(models) {
        // Associate Chat with User
        Chat.belongsTo(models.User, {
          foreignKey: 'user_id',
          as: 'user',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        });
      }
    }
    Chat.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        message: {
          type: DataTypes.JSONB,
          allowNull: false,
        },
        response: {
          type: DataTypes.JSONB,
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Chat',
      }
    );
    return Chat;
  };