const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupSchema = new Schema(
    {
      gId: {
        type: String, 
        required: true,
        unique: true,
      },

      numOpts: {
        type: Number, 
        required: true,
      },
      minToComp: {
        type: Number, 
        required: true,
      },
      taskIds: [{
        type: String,
      }],
      eventIds: [{
        type: String,
      }],
    
});


const groupCSchema = new Schema({
    cId: {
      type: String,
      required: true,
      unique: true,
    },
    group: [groupSchema]
  });

const Group = mongoose.model("Group", groupCSchema);

module.exports = Group;
