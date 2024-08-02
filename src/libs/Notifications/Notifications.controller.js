const NotificationsModel = require("./Notifications.model");

exports.insert = (req, res) => {
  NotificationsModel.createNotification(req.body).then(
    (result) => {
      res.status(200).send({ success: "Notification sent successfully" });
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findNotificationById = (req, res) => {
  NotificationsModel.findNotificationById(req.params.NotificationID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.success);
    }
  );
};
exports.updateNotificationById = (req, res) => {
  NotificationsModel.updateNotificationById(req.body, req.params.NotificationID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
exports.deleteNotificationById = (req, res) => {
  NotificationsModel.deleteNotificationById(req.params.NotificationID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
exports.findAllNotifications = (req, res) => {
  NotificationsModel.findAllNotifications().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findNotificationsPaginated = (req, res) => {
  NotificationsModel.findNotificationsPaginated(req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findDescendingNotificationsPaginated = (req, res) => {
  NotificationsModel.findDescendingNotificationsPaginated(req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findTotalByCurrentDate = (req, res) => {
  NotificationsModel.findTotalByCurrentDate().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.Notification);
    }
  );
};
