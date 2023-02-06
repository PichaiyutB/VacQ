const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please add a name"],
    unique: true,
    trim: true,
    maxlength: [50, "Name can not be more 50 character"],
  },
  address: {
    type: String,
    require: [true, "Please add an address"],
  },
  district: {
    type: String,
    require: [true, "Please add a district"],
  },
  province: {
    type: String,
    require: [true, "Please add a province"],
  },
  postalcode: {
    type: String,
    require: [true, "Please add an postalcode"],
    maxlength: [5, "Postal Code can not be more 5 digits"],
  },
  tel: {
    type: String,
  },
  region: {
    type: String,
    require: [true, "Please add a region"],
  },
});

module.exports = mongoose.model("Hospital", HospitalSchema);
