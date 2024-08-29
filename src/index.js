const express = require("express");
const path = require("path");
const multer = require("multer");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const env = require("./configs/env");
const Auths = require("./libs/Auths/Auths.route");

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "public/images/FarmProduce"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

app.use(function (req, res, next) {
  if (req.url.includes("/api")) {
    req.url = req.url.toString().replace("/api", "");
  }
  next();
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/images/FarmProduce",
  express.static(path.join(__dirname, "public/images/FarmProduce"))
);
app.use("/ol", express.static(path.join(__dirname, "public/ol")));
app.use("/js", express.static(path.join(__dirname, "public/js")));
app.use("/uploads", express.static("uploads"));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

let urls = [
  "http://194.163.135.205",
  "http://localhost",
  "http://localhost:3000",
];

function getUrl(url) {
  switch (url) {
    case urls[0]:
      return urls[0];
    case urls[1]:
      return urls[1];
    case urls[2]:
      return urls[2];
    default:
      return "";
  }
}

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", getUrl(req.headers.origin));
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, X-Requested-With, Range"
  );
  if (req.method === "OPTIONS") {
    return res.send(200);
  } else {
    return next();
  }
});

app.get("/homepage", (req, res) => {
  res.render("home");
});

app.get("/directions", (req, res) => {
  res.render("directions");
});

app.get("/mapline", (req, res) => {
  res.render("lines");
});

app.use("/imgs/farmproduce", express.static("uploads/FarmProduce"));
app.use("/imgs/agroproducts", express.static("uploads/AgroProducts"));

Auths.AuthRoutes(app);


app.listen(env.port, function () {
  console.log("app listening at port %s", env.port);
});
