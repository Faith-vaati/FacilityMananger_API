const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const Notifications = require("../../models/Notifications")(sequelize, Sequelize);
const multer = require("multer");
const Path = require("path");
Notifications.sync({ force: false });

const TODAY_START = new Date().setHours(0, 0, 0, 0);

exports.createNotification = (NotificationsData) => {
  return new Promise(async (resolve, reject) => {
    if (NotificationsData.Content === undefined) {
      return reject({ message: "You cannot send an empty message!" });
    }

    Notifications.create(NotificationsData).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ message: "Creation failed" });
      }
    );
  });
};

exports.findNotificationById = (id) => {
  return new Promise((resolve, reject) => {
    Notifications.findByPk(id).then(
      (result) => {
        if (result == null) {
          reject({ status: 404, message: "Data not found" });
        }
        resolve(result);
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.updateNotificationById = (NotificationsData, id) => {
  return new Promise((resolve, reject) => {
    Notifications.update(NotificationsData, {
      where: {
        NotificationID: id,
      },
    }).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};
exports.deleteNotificationById = (id) => {
  return new Promise((resolve, reject) => {
    Notifications.destroy({
      where: {
        NotificationID: id,
      },
    }).then(
      (result) => {
        if (result != 0) resolve({ message: "Deleted successfully!!!" });
        else reject({ message: "Entry does not exist!!!" });
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.findAllNotifications = () => {
  return new Promise((resolve, reject) => {
    Notifications.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.findNotificationsPaginated = (offset) => {
  return new Promise((resolve, reject) => {
    Notifications.findAll({
      offset: offset,
      limit: 12,
    }).then(
      async (result) => {
        const count = await Notifications.count();
        const read = await Notifications.count({ where: { Status: true } });
        const unread = await Notifications.count({ where: { Status: false } });
        resolve({
          result: result,
          total: count,
          read: read,
          unread: unread,
        });
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.findDescendingNotificationsPaginated = (offset) => {
  return new Promise((resolve, reject) => {
    Notifications.findAll({
      order: [["createdAt", "DESC"]],
      offset: offset,
      limit: 12,
    }).then(
      async (result) => {
        const count = await Notifications.count();
        const read = await Notifications.count({ where: { Status: true } });
        const unread = await Notifications.count({ where: { Status: false } });
        resolve({
          result: result,
          total: count,
          read: read,
          unread: unread,
        });
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.findCategory = () => {
  return new Promise((resolve, reject) => {
    Notifications.findAll({
      attributes: [
        Sequelize.fn("DISTINCT", Sequelize.col("Category")),
        "Category",
      ],
    }).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.findByCategory = (category) => {
  return new Promise((resolve, reject) => {
    Notifications.findAll({
      where: {
        Category: category,
      },
    }).then(
      (result) => {
        if (result == null) {
          reject({ status: 404, message: "Not found" });
        }
        resolve(result);
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.findTotalByCurrentDate = () => {
  return new Promise(async (resolve, reject) => {
    const count = await Notifications.count({
      where: { createdAt: { [Sequelize.Op.gt]: TODAY_START } },
    });
    resolve({ total: count });
  });
};
