const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  title : {
    type : String,
    required : true
  },
  description : {
    type : String,
    required : true
  },
  status : {
    type : String,
    enum : ['pending', 'completed'],
    default : 'pending'
  },
  user : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User'
    }]
}
);

modules.export = mongoose.model("List", listSchema);