const Csv = require("../models/csv");
const CSVToJSON = require("csvtojson");

const items_per_page = 100;

// @desc    Home page
// @route   GET /home
module.exports.home = async (req, res) => {
  // Load avaiable csv files
  const csvs = await Csv.find({});
  return res.render("index", {
    title: "Sign Up",
    details: csvs,
  });
};

// @desc    Upload a csv
// @route   POST /upload-csv
module.exports.upload_csv = async (req, res) => {
  // Create an entry in database
  await Csv.create({
    filename: req.body.filename,
    fileUrl: req.file.path,
  });
  return res.redirect("/home");
};

// @desc    Get all contents of a csv file
// @route   GET /view-csv/:id
module.exports.view_csv = async (req, res) => {
  // Get current page number
  const page = req.query.page;
  const file = await Csv.findById(req.params.id);
  //   Convert CSV to JSON
  const list = await CSVToJSON().fromFile(file.fileUrl);
  var keys = [];
  for (let k in list[0]) {
    keys.push(k);
  }
  return res.render("viewCsv", {
    title: "Ok",
    filename: file.filename,
    keys: keys,
    details: list.slice((page - 1) * items_per_page, page * items_per_page),
    hasNextPage: items_per_page * page < list.length,
    hasPrevPage: page > 1,
    page: page,
    id: req.params.id,
  });
};
