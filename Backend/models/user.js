const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName : {
    type : String,
    // required : true
  },
  Email : {
    type : String,
    required : true
  },
  PassWord : {
    type : String,
    enum : ['pending', 'completed'],
    default : 'pending'
  },
  list : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'List'
  }]
}
);

modules.export = mongoose.model("User", userSchema);