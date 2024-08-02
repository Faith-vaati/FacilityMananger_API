const AgroItemModel = require("./AgroItem.model");
exports.createAgroItem = (req, res) => {
  AgroItemModel.createAgroItem(req.body).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      console.log(err);
      res.status(203).send(err);
    }
  );
};

exports.getAgroItemsByFarmID = (req, res) => {
  AgroItemModel.getAgroItemsByFarmID(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.getAllAgroItem = (req, res) => {
  AgroItemModel.getAllAgroItem().then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.deleteById = (req, res) => {
  AgroItemModel.deleteById(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};
