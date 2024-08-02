const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const Users = require("../../models/Users")(sequelize, Sequelize);

Users.sync({ force: false });

exports.createUsers = (usersData) => {
  return new Promise(async (resolve, reject) => {
    if (usersData.Name === undefined) {
      return reject({ error: "Body is required!!!" });
    }
    Users.create(usersData).then(
      (result) => {
        resolve({ success: "Users created successfully" });
      },
      (err) => {
        reject({ error: "Users creation failed" });
      }
    );
  });
};

exports.getAllUsers = (limit, offset) => {
  return new Promise(async (resolve, reject) => {
    Users.findAndCountAll({
      limit: limit,
      offset: offset,
    }).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        console.log(err);
        reject({ error: "Something went wrong" });
      }
    );
  });
};
