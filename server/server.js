//need to create actual routes that will 1. receive a fetch request from the frontend 
//2. send information to the database to save 
//3. parse through the information (from the db query) and send that information back to the frontend so we can use it to change the state

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary')
const formData = require('express-form-data')

const PORT = 3000;

const app = express();

const userController = require('./controllers/controller');


app.use(formData.parse())
app.use(bodyParser.json());

// route to get all markers and main page
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/login.html'));
})

app.get('/signup', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/signup.html'))
})

app.get('/profile', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/index.html'))
});

app.get('/api', userController.getMarkers, (req, res) => {
  res.status(200).json({ markersList: res.locals.markersList })
})

app.get('/build/bundle.js', (req, res) => {
  console.log('inside / build-get')
  res.sendFile(path.resolve(__dirname, '../build/bundle.js'));
});
//====================================================

// route to create a marker on first click
app.post('/addMarker', userController.addMarker, (req, res) => {
  res.status(200).send("Marker created!");
})

app.post('/addImage', userController.addImage, (req, res) => {
  res.status(200).json(res.locals.newImgURL)
})

// route to update marker when you submit form
app.patch('/updateMarker', userController.updateMarker, userController.getOneMarker, (req, res) => {
  res.status(200).json({ updatedMarker: res.locals.oneMarker });
})

//this is a test to see if the query to the DB works - had to use another route because of the original '/' get request that serves the index.html
app.get('/getusers', userController.getUser, (req, res) => {
  res.status(200).send('this works man!');
})


app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});




app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});


app.listen(PORT, () => { console.log(`Listening on port ${PORT}...`); });