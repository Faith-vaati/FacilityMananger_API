const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Farmer = require("../../models/Farmers")(sequelize, Sequelize);

Farmer.sync({ force: false });
exports.createFarmer = (FarmerData) => {
  return new Promise(async (resolve, reject) => {
    if (FarmerData.Password === undefined) {
      return reject({ error: "Body is required!!!" });
    }

    //Encrypt user password
    FarmerData.Password = await bcrypt.hash(FarmerData.Password, 10);

    //check email
    Farmer.findAll({
      where: {
        Phone: FarmerData.Phone,
      },
    }).then(
      (result) => {
        if (result.length == 0) {
          Farmer.create(FarmerData).then(
            (result) => {
              resolve({ success: "User created successfully" });
            },
            (err) => {
              console.log(err);
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

exports.farmerlogin = (res, FarmerData) => {
  console.log(FarmerData);
  return new Promise(async (resolve, reject) => {
    //check PHONE
    Farmer.findAll({
      where: {
        Phone: FarmerData.Phone,
      },
      raw: true,
    }).then(
      async (result) => {
        if (result.length === 0)
          return reject({ error: "This user does not exist!" });
        if (await bcrypt.compare(FarmerData.Password, result[0].Password)) {
          const token = jwt.sign(
            {
              FarmerID: result[0].FarmerID,
              Name: result[0].Name,
              Phone: result[0].Phone,
            },
            process.env.TOKEN_KEY_USR,
            {
              expiresIn: "1h",
            }
          );
          res.cookie("cilbup_mathira", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          });
          resolve({ token: token, success: "Login successful" });
        } else {
          reject({ error: "User Authentication failed" });
        }
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.getAllFarmers = () => {
  return new Promise((resolve, reject) => {
    Farmer.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.updateFarmerByID = async (FarmersData, id) => {
  if (FarmersData.Password) {
    return new Promise((resolve, reject) => {
      Farmer.findAll({
        where: {
          FarmerID: id,
        },
        raw: true,
      }).then(
        async (result) => {
          if (result.length === 0) {
            reject({ error: "Farmer does not exist!" });
          }
          //(await bcrypt.compare(AuthData.Password, result[0].Password))
          if (
            result.length != 0 &&
            (await bcrypt.compare(FarmersData.Password, result[0].Password))
          ) {
            FarmersData.Password = await bcrypt.hash(
              FarmersData.NewPassword,
              10
            );

            Farmer.update(FarmersData, {
              where: {
                FarmerID: id,
              },
            }).then(
              (result) => {
                resolve({ success: "Password Updated Successfully!" });
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
      Farmer.update(FarmersData, {
        where: {
          FarmerID: id,
        },
      }).then(
        (result) => {
          console.log(result);
          resolve({ success: "Updated Successfully" });
        },
        (err) => {
          console.log(err);
          reject({ error: "Something went wrong" });
        }
      );
    });
  }
};

exports.deleteFarmer = (id) => {
  return new Promise((resolve, reject) => {
    Farmer.destroy({
      where: {
        FarmerID: id,
      },
    }).then(
      (result) => {
        if (result != 0) resolve({ message: "Deleted Successfully" });
        else reject({ message: "Entry does not exist" });
      },
      (error) => {
        reject({ error: error });
      }
    );
  });
};

exports.getFarmerStats = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [farms, fmeta] = await sequelize.query(
        `SELECT COUNT(*)::int AS total FROM "Farms" WHERE "FarmerID" = '${id}'`
      );
      const [orders, ometa] = await sequelize.query(
        `SELECT COUNT(*)::int AS total FROM "Orders" WHERE "FarmerID" = '${id}'`
      );

      const [nots, nmeta] = await sequelize.query(
        `SELECT COUNT(*)::int AS total FROM "Notifications" WHERE "FarmerID" = '${id}'`
      );

      const [agdealers, agmeta] = await sequelize.query(
        `SELECT COUNT(*)::int AS total
FROM "AgroDealers" AS r
INNER JOIN "Farmers" AS f
ON f."FarmerID" = '${id}'
WHERE r."Longitude" IS NOT NULL 
  AND r."Latitude" IS NOT NULL 
  AND f."Longitude" IS NOT NULL 
  AND f."Latitude" IS NOT NULL
  AND ST_Distance(
        ST_Transform(ST_SetSRID(ST_MakePoint(r."Longitude", r."Latitude"), 4326)::geometry, 3857),
        ST_Transform(ST_SetSRID(ST_MakePoint(f."Longitude", f."Latitude"), 4326)::geometry, 3857)
    ) / 1000.0 <= 30;`
      );
      resolve({
        farms: farms[0].total,
        orders: orders[0].total,
        agdealers: agdealers[0].total,
        nots: nots[0].total,
      });
    } catch (error) {
      reject({ error: "Retrieve failed" });
    }
  });
};
