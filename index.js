const aws = require("aws-sdk");
const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");

const app = express();

const s3 = new aws.S3({
  accessKeyId: "AKIAW4HID6HJIQPKYRLX",
  secretAccessKey: "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",
  Bucket: "rodri-nodejs-aws",
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "rodri-nodejs-aws",
    metadata: (req, file, cb) => {
      console.log(file);
      cb(null, { fieldName: file.originalname });
    },
    key: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

/ tomar valor de input en front e insertarlo en upload.single() /
app.post("/upload", upload.single("file"), (req, res, next) => {
  res.send({ data: req.files, msg: "Exito" });
});

app.post("/multiple-upload", upload.array("file", 4), (req, res, next) => {
  res.send({ data: req.files, msg: "Exito" });
});

app.listen(3000, () => {
  console.log("Conectado");
});