const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const Auth = require("../../models/Auths")(sequelize, Sequelize);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const forgotPassword = require("../Utils/ForgotPassword");
const Mailer = require("../Utils/Mailer");

Auth.sync({ force: false });
exports.createAuth = (AuthData) => {
  return new Promise(async (resolve, reject) => {
    if (AuthData.Password === undefined) {
      return reject({ error: "Body is required!!!" });
    }

    //Encrypt user password
    AuthData.Password = await bcrypt.hash(AuthData.Password, 10);

    //check email
    Auth.findAll({
      where: {
        Email: AuthData.Email,
      },
    }).then(
      (result) => {
        if (result.length == 0) {
          Auth.create(AuthData).then(
            (result) => {
              resolve({ success: "User created successfully" });
            },
            (err) => {
              reject({ error: "User creation failed" });
            }
          );
        } else {
          reject({ error: "This user exists!!!" });
        }
      },
      (err) => {
        reject({ error: "Something went wrong" });
      }
    );
  });
};

exports.AuthLogin = (res, AuthData) => {
  return new Promise(async (resolve, reject) => {
    //check phone
    if (AuthData?.Email == undefined) reject({ error: "Email is required!" });
    Auth.findAll({
      where: {
        Email: AuthData.Email,
      },
      raw: true,
    }).then(
      async (result) => {
        if (result.length == 0) return reject({ error: "User does not exist" });
        if (await bcrypt.compare(AuthData.Password, result[0].Password)) {
          if (!result[0].Status)
            return reject({ error: "Account disabled by administrator!" });

          const token = jwt.sign(
            {
              UserID: result[0].UserID,
              Name: result[0].Name,
              Email: result[0].Email,
              Role: result[0].Role,
            },
            process.env.TOKEN_KEY,
            {
              expiresIn: "1h",
            }
          );

          res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          });

          resolve({ token: token, success: "Login successful" });
        } else {
          reject({ error: "Authentication failed" });
        }
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.forgotPassword = async (AuthData) => {
  if (AuthData.Email) {
    return new Promise((resolve, reject) => {
      Auth.findAll({
        where: {
          Email: AuthData.Email,
        },
        raw: true,
      }).then(
        async (result) => {
          if (result.length === 0) {
            reject({ error: "This user does not exist!" });
          }
          if (result.length != 0) {
            const pass = Math.random().toString(36).slice(-8);
            const name = result[0].Name;
            const email = result[0].Email;
            AuthData.Password = await bcrypt.hash(pass, 10);
            Auth.update(AuthData, {
              where: {
                Email: AuthData.Email,
              },
            }).then(
              async (result) => {
                const content = await forgotPassword.getContent(
                  "Admin",
                  name,
                  pass
                );
                Mailer.sendMail("Password reset successful!", email, content);
                resolve({ success: "Password reset link sent to your email!" });
              },
              (err) => {
                reject({ error: "Email not sent!" });
              }
            );
          }
        },
        (err) => {
          reject({ error: "Retrieve failed" });
        }
      );
    });
  } else {
    return new Promise((resolve, reject) => {
      reject({ error: "Email is required!" });
    });
  }
};

exports.findAuthById = (id) => {
  return new Promise((resolve, reject) => {
    Auth.findByPk(id).then(
      (result) => {
        if (result == null) {
          reject({ error: "User not found" });
        }
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.updateAuthById = async (AuthData, AuthID) => {
  if (AuthData.Password) {
    return new Promise((resolve, reject) => {
      Auth.findAll({
        where: {
          UserID: AuthID,
        },
        raw: true,
      }).then(
        async (result) => {
          if (result.length === 0) {
            reject({ error: "This user does not exist!" });
          }
          if (
            result.length != 0 &&
            (await bcrypt.compare(AuthData.Password, result[0].Password))
          ) {
            AuthData.Password = await bcrypt.hash(AuthData.NewPassword, 10);

            Auth.update(AuthData, {
              where: {
                UserID: AuthID,
              },
            }).then(
              (result) => {
                resolve({ success: "New password Updated Successfully!" });
              },
              (err) => {
                reject({ error: "Retrieve failed" });
              }
            );
          } else {
            reject({ error: "Old Password Incorrect" });
          }
        },
        (err) => {
          reject({ error: "Retrieve failed" });
        }
      );
    });
  } else {
    return new Promise((resolve, reject) => {
      Auth.update(AuthData, {
        where: {
          UserID: AuthID,
        },
      }).then(
        (result) => {
          resolve({ success: "Updated Successfully" });
        },
        (err) => {
          reject({ error: "Retrieve failed" });
        }
      );
    });
  }
};

exports.deleteAuthById = (AuthID) => {
  return new Promise((resolve, reject) => {
    Auth.destroy({
      where: {
        UserID: AuthID,
      },
    }).then(
      (result) => {
        if (result != 0) resolve({ success: "Deleted successfully!!!" });
        else reject({ error: "User does not exist!!!" });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findAllAuth = () => {
  return new Promise((resolve, reject) => {
    Auth.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findAuthPaginated = (offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [results, metadata] = await sequelize.query(
        `SELECT * FROM "Auths" ORDER BY "Auths"."createdAt" DESC LIMIT 10 OFFSET ${offset}`
      );
      const [count, cmeta] = await sequelize.query(
        `SELECT Count(*)::int AS total FROM "Auths"`
      );

      resolve({
        results: results,
        total: count[0].total,
      });
    } catch (error) {
      reject({ error: "Retrieve failed" });
    }
  });
};

exports.logout = (res) => {
  return new Promise((resolve, reject) => {
    try {
      res.cookie("nimda_ksa", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      resolve({ success: "Logout successful" });
    } catch (error) {
      reject({ error: "logout failed!" });
    }
  });
};

exports.searchByPhone = (role, q) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, meta] = await sequelize.query(
        `SELECT "UserID","Name","Phone" FROM "Auths" WHERE "Role"='${role}' AND "Phone" ILIKE '${q}%' LIMIT 2 OFFSET 0;`
      );
      resolve(data);
    } catch (error) {
      reject([]);
    }
  });
};

exports.searchByName = (role, q) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, meta] = await sequelize.query(
        `SELECT "UserID","Name","Phone", "Position" FROM "Auths" WHERE "Name" ILIKE '${q}%' LIMIT 2 OFFSET 0;`
      );
      resolve(data);
    } catch (error) {
      reject([]);
    }
  });
};

exports.quickSearch = (q) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, meta] = await sequelize.query(
        `SELECT * FROM "Auths" WHERE "Name" ILIKE '%${q}%' LIMIT 12 OFFSET 0;`
      );
      resolve({ results: data, total: 12 });
    } catch (error) {
      reject([]);
    }
  });
};
