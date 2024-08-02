const FarmModel = require("./Farm.model");

exports.createFarm = (req, res) => {
  FarmModel.createFarm(req.body).then(
    (result) => {
      console.log(result);
      res.status(200).send(result);
    },
    (err) => {
      console.log(res.body);

      console.log(err);
      res.status(203).send(err);
    }
  );
};

exports.getAllFarms = (req, res) => {
  FarmModel.getAllFarms().then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.getFarmerFarms = (req, res) => {
  FarmModel.getFarmerFarms(req.params.farmerId).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.deleteById = (req, res) => {
  FarmModel.deleteById(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.updateFarmDetails = (req, res) => {
  FarmModel.updateFarmDetails(req.params.farmId, req.body).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};
