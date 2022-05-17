const express = require('express');
const path = require('path');
const { notes } = require('./db/db.json');
const uniqid = require('uniqid'); 


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.get('/notes', (req, res) => {
   res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// router.post('/api/notes', (req, res) => {
//   req.body.id = uniqid();
//   const animal = createNewAnimal(req.body, animals);
//     res.json(animal);
//   }
// });

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

// POST /api/notes should receive a new note to save on 
// the request body, add it to the db.json file, and 
// then return the new note to the client. 

// You'll need to find a way to give each note a 
// unique id when it's saved (look into npm packages 
//   that could do this for you).
// var uniqid = require('uniqid'); 
// console.log(uniqid());

//heroku
