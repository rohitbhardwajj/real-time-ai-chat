const mongoose = require("mongoose");

const userShcema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type:String,
    required:true,
  }
});

const userModel = mongoose.model("users",userShcema)

module.exports = userModel;
