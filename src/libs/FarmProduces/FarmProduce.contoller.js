const FarmProduceModel = require("./FarmProduce.model");

exports.createFarmProduce = (req, res) => {
  if (req.file) req.body.File = req.file.filename;
  FarmProduceModel.createFarmProduce(req.body).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      console.log(err);
      res.status(203).send(err);
    }
  );
};

exports.getFarmProducesByFarmID = (req, res) => {
  FarmProduceModel.getFarmProducesByFarmID(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.getAllFarmProduces = (req, res) => {
  FarmProduceModel.getAllFarmProduces(req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.getFarmProduceItemByType = (req, res) => {
  FarmProduceModel.getFarmProduceItemByType(req.params.type).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.getFarmProduceItemByName = (req, res) => {
  FarmProduceModel.getFarmProduceItemByName(req.params.name).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.getIDByVariety = (req, res) => {
  FarmProduceModel.getIDByVariety(req.params.variety).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.getFarmProduceItem = (req, res) => {
  FarmProduceModel.getFarmProduceItem(req.params.type).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};
