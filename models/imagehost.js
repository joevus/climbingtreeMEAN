var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ImageHostSchema = new Schema({
    upload_preset: String
});

module.exports = mongoose.model("ImageHost", ImageHostSchema);