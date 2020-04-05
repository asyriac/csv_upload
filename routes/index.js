const express = require("express");
const router = express.Router();
const { home, upload_csv, view_csv } = require("../controllers/index");

router.get("/home", home);
router.post("/upload-csv", upload_csv);
router.get("/view-csv/:id", view_csv);

module.exports = router;
