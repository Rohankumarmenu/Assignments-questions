// 1.lottery-system(As a MERN Developer using mongodb and javascript)

//First we will set up the required thimgs  such as:-
//mkdir lottery-system
// cd lottery-system
// npm init -y
// npm install express mongodb

//I will be using the mongodb as it is NoSQL which is esy to handle as well.
//We will create an app.js file and implement the Winner Microservice:

const express = require('express');
const mongodb = require('mongodb');

const app = express();
const port = 3000;

// Connect to MongoDB
const mongoClient = mongodb.MongoClient;
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'lotteryDB';
const collectionName = 'lotteryNumbers';

app.use(express.json());

// API endpoint will be here and it will help to  check if a number is a winner
app.get('/checkNumber/:num', (req, res) => {
  const number = parseInt(req.params.num);

  mongoClient.connect(mongoUrl, (err, client) => {
    if (err) {
      console.error('Failed to connect to the database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    collection.findOne({ number: number }, (err, result) => {
      if (err) {
        console.error('Failed to search for the number:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      if (result) {
        res.json({ winner: true });
      } else {
        res.json({ winner: false });
      }

      client.close();
    });
  });
});

app.listen(port, () => {
  console.log(`Winner Microservice is running on port ${port}`);
});



//finally we will run it by using the command
// node app.js

