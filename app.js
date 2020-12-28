const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true});

const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
  name: "Apple",
  rating: 34,
  review: "Pretty solid as a fruit."
});

fruit.save();

const personSchema = new mongoose.Schema ({
  name: String,
  age: Number
});

const Person = mongoose.model("Person", personSchema);

const person = new Person ({
  name: "John",
  age: 37
});

// person.save();

// const kiwi = new Fruit({
//   name: "Kiwi",
//   score: 10,
//   review: "The best fruit!"
// });

// const orange = new Fruit({
//   name: "Orange",
//   score: 4,
//   review: "Too sour for me"
// });

// const banana = new Fruit({
//   name: "Banana",
//   score: 3,
//   review: "Bad texture"
// });

// // Fruit.insertMany([kiwi, orange, banana], function(err){
// //   if (err) {
// //     console.log(err);
// //   } else {
// //     console.log("Successfully save all the fruits to fruitsDB");
// //   }
// // })

Fruit.find(function(err, fruits){
  if (err) {
    console.log(err);
  } else {

    mongoose.connection.close();
    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});


const findDocuments = function(db, callback) {
  const collection = db.collection('fruits');

  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err,null);
    console.log("Found the following records");
    console.log(fruits)
    callback(fruits);
  });
}