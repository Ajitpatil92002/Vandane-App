const mongoose = require("mongoose");

function isValidEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter name"],
  },
  email: {
    type: String,
    required: [true, "please enter email"],
    validate: [isValidEmail, "please enter valid email"],
  },
  phone: {
    type: String,
    required: [true, "please enter phone"],
    maxlength: [12, "password length must maxlength of 12 character"],
    minlength: [10, "password length must minlength of 10 character"],
  },
  message: {
    type: String,
    required: [true, "please enter message"],
  },
});

const contact = mongoose.model("contact", contactSchema);

module.exports = contact;
