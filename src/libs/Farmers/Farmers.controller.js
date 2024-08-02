const FarmersModel = require("./Farmers.model");

exports.createFarmer = (req, res) => {
  FarmersModel.createFarmer(req.body).then(
    (result) => {
      console.log("Created successfully");
      res.status(200).send({ success: "Created successfully" });
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.farmerlogin = (req, res) => {
  FarmersModel.farmerlogin(res, req.body).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.updateFarmerByID = (req, res) => {
  FarmersModel.updateFarmerByID(req.body, req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.deleteFarmer = (req, res) => {
  FarmersModel.deleteFarmer(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.getAllFarmers = (req, res) => {
  FarmersModel.getAllFarmers().then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.getFarmerStats = (req, res) => {
  FarmersModel.getFarmerStats(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};
