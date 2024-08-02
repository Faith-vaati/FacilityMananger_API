const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const Farm = require("../../models/Farm")(sequelize, Sequelize);

Farm.sync({ force: false });

exports.createFarm = (FarmData) => {
  return new Promise(async (resolve, reject) => {
    Farm.create(FarmData).then(
      (result) => {
        resolve({
          success: "Created successfully",
        });
      },
      (err) => {
        console.log(FarmData);

        console.log(err);
        reject({ error: "Farm creation failed" });
      }
    );
  });
};

exports.getAllFarms = () => {
  return new Promise((resolve, reject) => {
    Farm.findAll({}).then(
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

// get farms belonging to a specific farmer
exports.getFarmerFarms = (farmerId) => {
  return new Promise((resolve, reject) => {
    Farm.findAll({
      where: {
        FarmerID: farmerId,
      },
    }).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        console.log(err);
        reject({ error: err });
      }
    );
  })
}

exports.deleteById = (id) => {
  return new Promise((resolve, reject) => {
    Farm.destroy({
      where: {
        FarmID: id,
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

exports.updateFarmDetails = (farmId, farmData) => {
  return new Promise((resolve, reject) => {
    Farm.update(farmData, {
      where: {
        FarmID: farmId,
      },
    }).then(
      (result) => {
        if (result[0] === 1) resolve({ message: "Updated Successfully" });
        else reject({ message: "Update failed" });
      },
      (error) => {
        reject({ error: error });
      }
    );
  }
  );
};
