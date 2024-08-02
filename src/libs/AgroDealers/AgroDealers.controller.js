const AgroDealersModel = require("./AgroDealers.model");

exports.createDealer = (req, res) => {
  AgroDealersModel.createDealer(req.body).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      console.log(err);
      res.status(203).send(err);
    }
  );
};

exports.getDealerByID = (req, res) => {
  AgroDealersModel.getDealerByID(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.updateDealerByID = (req, res) => {
  AgroDealersModel.updateDealerByID(req.body, req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.deleteDealerByID = (req, res) => {
  AgroDealersModel.deleteDealerByID(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      console.log(err);
      res.status(203).send(err);
    }
  );
};

exports.getAllDealers = (req, res) => {
  AgroDealersModel.getAllDealers().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.getAgrodealersByDistance = (req, res) => {
  AgroDealersModel.getAgrodealersByDistance(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.filterDealer = (req, res) => {
  AgroDealersModel.filterDealer(
    req.params.column,
    req.params.operator,
    req.params.value
  ).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
