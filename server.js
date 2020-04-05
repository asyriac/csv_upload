const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/mongoose");
const multer = require("multer");

// Loading enviroment variables
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT;

// Connecting database
db();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/plain" || file.mimetype === "application/vnd.ms-excel" || file.mimetype === "text/x-csv") cb(null, true);
  else cb(null, false);
};

const app = express();
//Static folder
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single("csv"));
// Handling routes
app.use("/", require("./routes/index"));

// Starting the server
app.listen(PORT, (err) => {
  if (err) {
    console.log("Error starting server");
  } else console.log(`Server started on port ${PORT}`);
});
