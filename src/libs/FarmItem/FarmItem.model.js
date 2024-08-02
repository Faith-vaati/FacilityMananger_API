const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const FarmItem = require("../../models/FarmItem")(sequelize, Sequelize);

FarmItem.sync({ force: false });

exports.createFarmItem = (FarmItemData) => {
  return new Promise(async (resolve, reject) => {
    if (FarmItemData.FarmID === undefined) {
      return reject({ error: "Body is required!!!" });
    }
    FarmItem.create(FarmItemData).then(
      (result) => {
        resolve({ success: " created successfully" });
      },
      (err) => {
        reject({ error: " creation failed" });
        console.log(err);
      }
    );
  });
};

exports.getFarmItemsByFarmID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, cmeta] = await sequelize.query(
        `SELECT "FarmProduces"."Type","FarmProduces"."Name", "FarmProduces"."Variety", "FarmProduces"."File"
        FROM "FarmItems" JOIN "FarmProduces" ON "FarmItems"."FarmProduceID"::uuid = "FarmProduces"."FarmProduceID"
        WHERE "FarmID" = '${id}';`
      );

      resolve(data);
    } catch (error) {
      reject({ error: "Retrieve Failed" });
    }
  });
};

exports.getAllFarmItem = () => {
  return new Promise((resolve, reject) => {
    FarmItem.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        console.log(err);
        reject({ error: err });
      }
    );
  });
};

exports.deleteById = (id) => {
  return new Promise((resolve, reject) => {
    FarmItem.destroy({
      where: {
        FarmItemID: id,
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
