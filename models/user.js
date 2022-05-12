'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class User extends Model {}
  User.init(
      {
          username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isUnique: (value, next) => {
                User.findAll({
                  where: { email: value },
                  attributes: ['id'],
                })
                  .then((user) => {
                    if (user.length != 0)
                      next(new Error('Username address already in use!'));
                    next();
                  })
                  .catch((onError) => console.log(onError));
              },
            },
          },
          role: DataTypes.STRING,
          password: DataTypes.STRING,
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: "Must be a valid email address",
                  },
              isUnique: (value, next) => {
                User.findAll({
                  where: { email: value },
                  attributes: ['id'],
                })
                  .then((user) => {
                    if (user.length != 0)
                      next(new Error('Email address already in use!'));
                    next();
                  })
                  .catch((onError) => console.log(onError));
              },
            },
          },
      },
      {
          hooks: {
              beforeCreate : (record, options) => {
                  record.password = bcrypt.hashSync(record.password, 10)
              },
              afterCreate: (record) => {
                  console.log(record);
              }
          },
          sequelize
      }
  )
  return User
}