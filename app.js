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
  rating: 8,
  review: "Pretty solid as a fruit."
});

// fruit.save();

const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const mango = new Fruit({
  name: "Mango",
  score: 9,
  review: "Decent Fruit"
})

mango.save();

Person.updateOne({name: "John"}, {favoriteFruit: mango}, function(err){
  if (err){
    console.log(err);
  } else {
    console.log("Successfully updated the document");
  }
});
// pineapple.save();

// const person = new Person ({
//   name: "Amy",
//   age: 12,
//   favoriteFruit: pineapple
// });


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

// Fruit.updateOne({_id: "5fe9f41afbd0c30596a1f6d1"}, {name: "Peach"}, function(err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("Successfully updated the document");
//   }
// });

// Fruit.deleteOne({_id: "5fe9f41afbd0c30596a1f6d1"}, function(err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("Deleted it!");
//   }
// });

// Person.deleteMany({name: "John"}, function(err){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("All people deleted");
//   }
// });