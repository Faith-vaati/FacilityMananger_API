const NotificationsController = require("./Notifications.controller");

exports.NotificationsRoutes = function (app) {
  app.post("/notifications/create", [NotificationsController.insert]);

  app.get("/notifications/paginated/:offset", [
    NotificationsController.findNotificationsPaginated,
  ]);

  app.get("/notifications/getTotalforToday", [
    NotificationsController.findTotalByCurrentDate,
  ]);

  app.get("/notifications/desc/paginated/:offset", [
    NotificationsController.findDescendingNotificationsPaginated,
  ]);

  app.get("/notifications/:NotificationID", [
    NotificationsController.findNotificationById,
  ]);

  app.put("/notifications/:NotificationID", [
    NotificationsController.updateNotificationById,
  ]);

  app.delete("/notifications/:NotificationID", [
    NotificationsController.deleteNotificationById,
  ]);

  app.get("/notifications", [NotificationsController.findAllNotifications]);
};
