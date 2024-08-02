const FarmItemModel = require("./FarmItem.model");
exports.createFarmItem = (req, res) => {
  FarmItemModel.createFarmItem(req.body).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      console.log(err);
      res.status(203).send(err);
    }
  );
};

exports.getFarmItemsByFarmID = (req, res) => {
  FarmItemModel.getFarmItemsByFarmID(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.getAllFarmItem = (req, res) => {
  FarmItemModel.getAllFarmItem().then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.deleteById = (req, res) => {
  FarmItemModel.deleteById(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};
