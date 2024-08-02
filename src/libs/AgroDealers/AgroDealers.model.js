const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const AgroDealers = require("../../models/AgroDealers")(sequelize, Sequelize);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

AgroDealers.sync({ force: false });

exports.createDealer = async (DealersData) => {
  try {
    if (!DealersData.Name) {
      throw new Error("Body is required!!!");
    }

    // Encrypt user password
    DealersData.Password = await bcrypt.hash(DealersData.Password, 10);

    // Check if dealer exists
    const existingDealer = await AgroDealers.findOne({
      where: {
        Phone: DealersData.Phone,
      },
    });

    if (existingDealer) {
      throw new Error("This user exists!!!");
    }

    // Create new dealer
    const newDealer = await AgroDealers.create(DealersData);

    // Send SMS notification
    const smsPayload = {
      apikey: "c6790b566102124e",
      senderid: "OakarServ",
      unicode: "no",
      schedule: "no",
      sending_time: "",
      sms_list: [
        {
          message: `Hello ${DealersData.Name}, your account has been created successfully.`,
          mobiles: DealersData.Phone,
          client_sms_ids: "",
        },
      ],
    };

    const response = await axios.post(
      "https://api.teleoss.com/client/api/sendmessage",
      smsPayload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 && response.data) {
      console.log(`SMS sent successfully: ${JSON.stringify(response.data)}`);
    } else {
      console.error(
        `Failed to send SMS. Response: ${response.status} - ${response.statusText}`
      );
    }

    return { success: "Account created successfully" };
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return { error: error.message };
  }
};

exports.getDealerByID = (id) => {
  return new Promise(async (resolve, reject) => {
    AgroDealers.findAll({
      where: {
        AgroDealerID: id,
      },
    }).then(
      (result) => {
        if (result.length === 0) {
          reject({ error: "Dealer does not exist" });
        } else {
          resolve(result);
        }
      },
      (err) => {
        reject({ error: "Failed to fetch dealer" });
      }
    );
  });
};

exports.updateDealerByID = async (DealersData, id) => {
  if (DealersData.Password) {
    return new Promise((resolve, reject) => {
      AgroDealers.findAll({
        where: {
          AgroDealerID: id,
        },
        raw: true,
      }).then(
        async (result) => {
          if (result.length === 0) {
            reject({ error: "Dealer does not exist!" });
          }
          //(await bcrypt.compare(AuthData.Password, result[0].Password))
          if (
            result.length != 0 &&
            (await bcrypt.compare(DealersData.Password, result[0].Password))
          ) {
            DealersData.Password = await bcrypt.hash(
              DealersData.NewPassword,
              10
            );

            AgroDealers.update(DealersData, {
              where: {
                AgroDealerID: id,
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
      AgroDealers.update(DealersData, {
        where: {
          AgroDealerID: id,
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

exports.deleteDealerByID = (id) => {
  return new Promise(async (resolve, reject) => {
    AgroDealers.destroy({ where: { AgroDealerID: id } }).then(
      (result) => {
        if (result === 1) {
          resolve({ success: "Agrodealer deleted successfully" });
        } else {
          reject({ error: "Agrodealer does not exist" });
        }
      },
      (err) => {
        reject({ error: "Agrodealer deletion failed" });
      }
    );
  });
};

exports.getAllDealers = () => {
  return new Promise(async (resolve, reject) => {
    AgroDealers.findAll({
      order: [["createdAt", "ASC"]],
    }).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "Failed to fetch products" });
      }
    );
  });
};

exports.filterDealer = (column, operator, value) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Using parameterized queries to prevent SQL injection
      let query = `SELECT * FROM "AgroDealers"WHERE "${column}" ${operator} '${value}'`;

      // if operator is ILIKE, add % to value
      if (operator === "ILIKE") {
        query = `SELECT * FROM "AgroDealers" WHERE "${column}" ${operator} '%${value}%'`;
      }
      
      const [data, metadata] = await sequelize.query(query);

      console.log(data);
      resolve(data);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      reject({ error: error.message });
    }
  });
};

exports.getAgrodealersByDistance = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, meta] = await sequelize.query(
        `WITH agrodealers_data AS (
    SELECT 
        r."Name", 
        r."Phone", 
        r."StoreName", 
        r."Market", 
        ST_Distance(
            ST_Transform(ST_SetSRID(ST_MakePoint(r."Longitude", r."Latitude"), 4326)::geometry, 3857),
            ST_Transform(ST_SetSRID(ST_MakePoint(f."Longitude", f."Latitude"), 4326)::geometry, 3857)
        ) / 1000.0 AS distance_km
    FROM 
        "AgroDealers" AS r
    INNER JOIN 
        "Farms" AS f 
    ON 
        f."FarmID" = '${id}'
    WHERE 
        r."Longitude" IS NOT NULL 
        AND r."Latitude" IS NOT NULL 
        AND f."Longitude" IS NOT NULL 
        AND f."Latitude" IS NOT NULL
    ORDER BY 
        distance_km
)
SELECT 
    *, 
    (SELECT COUNT(*) FROM agrodealers_data) AS total_count 
FROM 
    agrodealers_data;`
      );
      resolve({
        data: data,
      });
    } catch (error) {
      console.log(error);
      reject({ error: "Retrieve failed" });
    }
  });
};
