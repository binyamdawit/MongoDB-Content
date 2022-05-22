//require the Mongoose package (after running >npm i mongoose in Hyper to install it)
const { FindCursor } = require('mongodb');
const mongoose = require('mongoose');
// fruitsDB is the name of the database we want to create/connect to

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://localhost:27017/fruitsDB")
    console.log('Successfully connected to database')
}


const fruitSchema = new mongoose.Schema({

  name: {
      type: String,
      required: [true, "Please check your data entry, no name specified."]
  },
  rating: {
      type: Number,
      min: 1,
      max: 10
  },
  review: String

});



//creating a colletion called fruits

//two parameters: name of the collection (singular),

const Fruit = mongoose.model("Fruit", fruitSchema);



// creating a document from the model Fruit

const fruit = new Fruit ({
  rating: 9,
  review: "I like pineapples."
});

// fruit.save();

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
})

const Person = mongoose.model('Person', personSchema);

const kiwi = new Fruit({
    name: "Kiwi",
    score: 7,
    review: "Decent fruit!"
});

kiwi.save();

Person.updateOne({name: "Amy"}, {favouriteFruit: kiwi}, function(err) {
    if(err) {
        console.log(err);
    }
    else {
        console.log("Successfully updated document.");
    }
});

// const person = new Person({
//     name: "Amy",
//     age: 37,
//     favouriteFruit: pineapple
// })

// person.save();

// Creat new fruits to Fruits collection

// const pineapple = new Fruit({
//     name: "Orange",
//     score: 10,
//     review: "The best fruit!"
// })
// const lemon = new Fruit({
//     name: "Lemon",
//     score: 7,
//     review: "Not too bad"
// })

// const mango = new Fruit({
//     name: "Mango",
//     score: 10,
//     review: "Awesome fruit!"
// })

//save in bulk

//two parameters: an array, a callback function

// Fruit.insertMany([pineapple, lemon, mango], function(error) {

//   if (error) {

//     console.log(error);

//   } else {

//     console.log("Successfully saved fruits to fruitsDB.")

//   }

// });

Fruit.find(function(err, fruits) {
    if(err) {
        console.log(err);
    }
    else {

        fruits.forEach(function(fruit) {
            console.log(fruit.name);
        });
    }
});

// Fruit.updateOne({_id: "6289fe7ad2846677c2825987"}, {name: "Peach"}, function(err) {
//     if(err) {
//         console.log(err);
//     }
//     else {
//         console.log("Successfully updated document.");
//     }
// });

// Fruit.deleteOne({_id: "628a16742bd41828144ae073"}, function(err) {
//     if(err) {
//         console.log(err);
//     }
//     else {
//         console.log("Successfully deleted document.");
//     }
// });

Person.deleteMany({name: "John"}, function(err) {
    if(err) {
        console.log(err);
    }
    else {
        console.log("Successfully deleted document.");
    }
})