const UsersModel = require("./Users.model");

exports.createUsers = (req, res) => {
  UsersModel.createUsers(req.body).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      console.log(err);
      res.status(203).send(err);
    }
  );
};

exports.getAllUsers = (req, res) => {
  UsersModel.getAllUsers(req.params.limit, req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      console.log(err);
      res.status(203).send(err);
    }
  );
};
