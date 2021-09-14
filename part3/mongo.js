const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Please provide necessary arguments: node mongo.js <password>");
  process.exit(1);
}

if (process.argv.length > 3 && process.argv.length < 5) {
  console.log(
    "Please provide necessary arguments: node mongo.js <password> <name> <number>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstackopen:${password}@cluster0.ewcqh.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", noteSchema);

if (process.argv.length >= 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((result) => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
} else if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    let people_result = 'phonebook:\n'
    people_result += result.map(p => `${p.name} ${p.number}`).join('\n');
    console.log(people_result)
    mongoose.connection.close();
  });
}
