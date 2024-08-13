const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String },
  city: { type: String },
  profession: { type: String },
  ward: { type: String },
  phone: { type: String },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
