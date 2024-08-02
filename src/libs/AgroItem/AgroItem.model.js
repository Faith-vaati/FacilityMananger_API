const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const AgroItem = require("../../models/AgroItem")(sequelize, Sequelize);

AgroItem.sync({ force: false });

exports.createAgroItem = (AgroItemData) => {
  return new Promise(async (resolve, reject) => {
    if (AgroItemData.FarmID === undefined) {
      return reject({ error: "Body is required!!!" });
    }
    AgroItem.create(AgroItemData).then(
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

exports.getAgroItemsByFarmID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, cmeta] = await sequelize.query(
        `SELECT "AgroProducts"."Type","AgroProducts"."Name", "AgroProducts"."Variety", "AgroProducts"."File"
        FROM "AgroItems" JOIN "AgroProducts" ON "AgroItems"."AgroProductID"::uuid = "AgroProducts"."FarmProduceID"
        WHERE "FarmID" = '${id}';`
      );

      resolve(data);
    } catch (error) {
      reject(null);
    }
  });
};

exports.getAllAgroItem = () => {
  return new Promise((resolve, reject) => {
    AgroItem.findAll({}).then(
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
    AgroItem.destroy({
      where: {
        AgroItemID: id,
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
