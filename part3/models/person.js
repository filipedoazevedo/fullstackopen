const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true,
    minLength: 3, 
  },
  number: { 
    type: String, 
    required: true,
    minLength: 8, 
  },
});

// Apply the uniqueValidator plugin to personSchema
personSchema.plugin(uniqueValidator);

const Person = mongoose.model("Person", personSchema);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
