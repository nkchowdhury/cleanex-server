const express = require('express')
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const port =process.env.PORT || 4044;



require('dotenv').config()

console.log(process.env.DB_USER)

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.trj6m.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri)

const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));





const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log( "my err message", err)
  const serviceCollection = client.db("cleaner").collection("service");
  const reviewCollection = client.db("cleaner").collection("review");
  const orders = client.db("cleaner").collection("orders");
  // perform actions on the collection object
  // console.log("connected successfully")


// get service collection


app.get('/service', (req, res) => {

  serviceCollection.find()
  .toArray((err, documents) => {

        res.send(documents)

  })



})



// get review collection


app.get('/review', (req, res) => {

  reviewCollection.find()
  .toArray((err, documents) => {

        res.send(documents)

  })



})


// app.get("/books", (req, res) => {

//   bookCollections.find()
//   .toArray((err, books) => {
    
//     res.send(books)
//     console.log(books)
//   })


// })





//add  reviews
app.post('/reviews', (req, res) => {

    const review = req.body;
    reviewCollection.insertOne(review)
    .then(result => {

      res.send(result.insertedCount > 0)
    })


} )



//add  Service

app.post('/addService', (req, res) => {

  const service = req.body;
  serviceCollection.insertOne(service)
  .then(result => {


    res.send(result.insertedCount > 0)
  })


})




//order send to data base

app.post('/addOrder', (req,res) =>{

  const order =req.body;

  orders.insertOne(order)
  .then(result => {

    res.send(result.insertedCount > 0)
  })


})


//Show Order on Ui

app.get('/orders', (req, res) =>{
  console.log(req.query.email)

  orders.find({email: req.query.email})
  .toArray((err,documents) => {
    console.log(err,documents)
    res.send(documents)
  })
})





});


app.get('/', (req, res) => {
  res.send('Hello mongodb!')
})





app.listen(port)
