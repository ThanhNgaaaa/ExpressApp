const { body } = require("express-validator");
const message = require("../helpers/message");
const util = require("util");

var options = {
  name: {
    min: 10,
    max: 80,
  },
  description: {
    min: 10,
    max: 80,
  },
  image: {
    min: 1,
  },
  price: {
    min: 0,
  },
};

module.exports = {
  validator: function () {
    return [
      body(
        "name",
        util.format(
          message.size_string_message,
          "name",
          options.name.min,
          options.name.max
        )
      ).isLength(options.name),
      body(
        "description",
        util.format(
          message.size_string_message,
          "description",
          options.description.min,
          options.description.max
        )
      ).isLength(options.description),
      body("image", util.format(message.url_message, "image")).isURL(),
      body("price", util.format(message.number_message, "price")).isNumeric(),
    ];
  },
};
