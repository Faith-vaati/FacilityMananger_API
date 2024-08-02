const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const AgroProducts = require("../../models/AgroProducts")(sequelize, Sequelize);
const multer = require("multer");
const Path = require("path");
const fs = require("fs");
const { log } = require("console");

AgroProducts.sync({ force: false });

let upload = multer({
  limits: { fileSize: 100000000 },
  fileFilter: (req, file, callback) => {
    const acceptableExtensions = [".jpg", ".jpeg", ".png"];
    if (!acceptableExtensions.includes(Path.extname(file.originalname))) {
      return callback(new Error("Unsupported format"));
    }
    const fileSize = parseInt(req.headers["content-length"]);
    if (fileSize > 100000000) {
      return callback(new Error("File is too Large!"));
    }
    callback(null, true);
  },
  storage: multer.diskStorage({
    destination: "uploads/FarmProduce",
    filename: function (req, file, callback) {
      callback(null, Date.now() + file.originalname);
    },
  }),
});

exports.uploadFile = upload.single("File");

exports.createProducts = (productsdata) => {
  return new Promise(async (resolve, reject) => {
    if (productsdata.Name == undefined) {
      return reject({ message: "Body is required!!!" });
    }
    AgroProducts.create(productsdata).then(
    log(productsdata),
      (result) => {
        resolve({ success: "Created Successfully" });
      },
      (error) => {
        log(error);
        reject({ error: "Creation Failed!!!" });
      }
    );
  });
};


exports.getAllAgroProducts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, meta] = await sequelize.query(
        `SELECT * FROM "AgroProducts"`
      );
      resolve(data);
    } catch (error) {}
  });
};

exports.getProductsById = (productsID) => {
  return new Promise(async (resolve, reject) => {
    AgroProducts.findOne({
      where: {
        productsID: productsID,
      },
    }).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "Something went wrong" });
      }
    );
  });
};

exports.updateProductsById = (productsID, productsData) => {
  return new Promise(async (resolve, reject) => {
    AgroProducts.update(productsData, {
      where: {
        productsID: productsID,
      },
    }).then(
      (result) => {
        resolve({ success: "Products updated successfully" });
      },
      (err) => {
        reject({ error: "Products update failed" });
      }
    );
  });
};

exports.deleteProductsById = (id) => {
  return new Promise(async (resolve, reject) => {
    AgroProducts.destroy({
      where: {
        productsID: id,
      },
    }).then(
      (result) => {
        if (result != 0) resolve({ success: "Products deleted successfully" });
        else reject({ error: "Products does not exist" });
      },
      (err) => {
        console.log(err);
        reject({ error: "Products deletion failed" });
      }
    );
  });
};

exports.getAgroProductsByAgrovetID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, meta] = await sequelize.query(
        `SELECT "AgroProducts"."Type", "AgroProducts"."Name", "AgroProducts"."Price", "AgroProducts"."File" FROM "AgroItems" 
INNER JOIN "AgroProducts"
ON "AgroProducts"."AgroProductID"::varchar = "AgroItems"."AgroProductID"::varchar
WHERE "AgroDealerID" = 'aa0c551f-88b4-4175-bc00-3bad12b1145b'`
      );
      resolve(data);
    } catch (error) {
      reject(null);
    }
  });
};
