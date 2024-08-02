const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const Stores = require("../../models/Stores")(sequelize, Sequelize);

Stores.sync({ force: false });
