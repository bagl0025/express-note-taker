const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid'); 

const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// routes
app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './db/db.json'));
});

app.get('/notes', (req, res) => {
   res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.post('/api/notes', (req, res) => {
  // create id
  req.body.id = uniqid();
  // read file and assign body to newNote
  const noteFile = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));  
  const newNote = req.body;
  //add new data to existing etc...
  noteFile.push(newNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(noteFile));
  res.json(noteFile);
});

app.delete('/api/notes/:id', (req, res) => {
  const noteFile = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));  
  const id2del = req.params.id;
  const indexOfObject = noteFile.findIndex(object => {
    return object.id === id2del;
  });
  noteFile.splice(indexOfObject, 1);
  fs.writeFileSync('./db/db.json', JSON.stringify(noteFile));
  res.json(noteFile);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
