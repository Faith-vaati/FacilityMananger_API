const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const { name } = require("ejs");
const FarmProduce = require("../../models/FarmProduces")(sequelize, Sequelize);
const multer = require("multer");
const Path = require("path");

FarmProduce.sync({ force: false });

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

exports.createFarmProduce = (FarmProduceData) => {
  return new Promise(async (resolve, reject) => {
    if (FarmProduceData.Variety == undefined) {
      return reject({ message: "Body is required!!!" });
    }
    FarmProduce.create(FarmProduceData).then(
      (result) => {
        resolve({ success: "Created Successfully" });
      },
      (error) => {
        reject({ error: "Creation Failed!!!" });
      }
    );
  });
};

exports.getFarmProducesByFarmID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, meta] = await sequelize.query(
        `SELECT "FarmProduces"."Type", "FarmProduces"."Name", "FarmProduces"."Variety", "FarmProduces"."File" FROM "FarmItems" 
INNER JOIN "FarmProduces" 
ON "FarmProduces"."FarmProduceID"::varchar = "FarmItems"."FarmProduceID"::varchar
WHERE "FarmID" = '${id}'`
      );

      resolve(data);
    } catch (error) {
      reject(null);
    }
  });
};

exports.getAllFarmProduces = (offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, meta] = await sequelize.query(
        `SELECT * FROM "FarmProduces" LIMIT 10 OFFSET ${offset}`
      );
      const [count, cmeta] = await sequelize.query(
        `SELECT COUNT (*)::int AS total FROM "FarmProduces"`
      );
      resolve({ data: data, total: count[0].total });
    } catch (error) {
      reject(null);
    }
  });
};

exports.getFarmProduceItemByType = (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, meta] = await sequelize.query(
        `SELECT DISTINCT "Name"
FROM public."FarmProduces"
WHERE "Type" = '${type}'`
      );
      const result = data.map((item) => item.Name);
      resolve(result);
      console.log(data);
    } catch (error) {
      reject(null);
    }
  });
};

exports.getFarmProduceItemByName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, meta] = await sequelize.query(
        `SELECT DISTINCT "Variety"
        FROM public."FarmProduces"
        WHERE "Name" = '${name}'`
      );
      const result = data.map((item) => item.Variety);
      resolve(result);
    } catch (error) {
      reject(null);
    }
  });
};

exports.getIDByVariety = (variety) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, meta] = await sequelize.query(
        `SELECT  "FarmProduceID"
        FROM public."FarmProduces"
        WHERE "Variety" = '${variety}'`
      );

      const result = data.map((item) => item.FarmProduceID);
      resolve(result);
    } catch (error) {
      reject(null);
    }
  });
};

exports.getFarmProduceItem = (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, meta] = await sequelize.query(
        `SELECT 
    "Type", 
    "Name", 
    STRING_AGG("Variety", ', ') AS "Varieties"
FROM 
    public."FarmProduces"
WHERE 
    "Type" = '${type}'
GROUP BY 
    "Type", 
    "Name"
ORDER BY 
    "Type", 
    "Name";`
      );
      resolve(data);
      console.log(data);
    } catch (error) {
      reject(null);
    }
  });
};
