//need to rename this file, set better middleware names and make actual queries that use logic to change the query information into tangible data for our frontend to use to change the state

const db = require('../models/dbModel');
const cloudinary = require('cloudinary')
const formData = require('express-form-data')

const controller = {};


//controller.getUser submits a query to the database to get all the users. this is mostly for a test and a general template of how to make queries in the future
controller.getUser = (req, res, next) => {
    const { username, password } = req.body;
    console.log('This is the req body, for getUser', req.body);
    const userQuery =
        `SELECT username FROM users WHERE username = '${username}' AND password = '${password}'`;
    db.query(userQuery)
        .then(data => {
            console.log(data)
            if (data.rows[0]) {
                console.log("user has been verified")
                return next();
            } else {
                console.log('username/password are invalid');
                res.send("Invalid username or password, please sign up or try again");
            }
        })
        .catch(err => {
            return next(err);
        })
}

controller.createUser = (req, res, next) => {
    const { username, password } = req.body;
    const newQuery =
        `INSERT INTO users (username, password) values ($1, $2)`

    const values = [username, password]
    db.query(newQuery, values)
        .then(data => console.log('sucessfully created user', data))
        .catch(err => console.log('there was an error creating new user'))

    return next();
};


controller.login = (req, res, next) => {
    res.sendStatus(200)
}
controller.signup = (req, res, next) => {
    res.sendStatus(200)
}

cloudinary.config({
    // evan is making us change this
    cloud_name: 'travelappcloud',
    api_key: "636342232981834",
    api_secret: "fR0HuLM1BXdVwwwcIOsNmCzQbPs"
})
controller.addImage = (req, res, next) => {
    console.log(cloudinary);
    console.log('in add image YO')
    const values = Object.values(req.files)
    console.log(values)
    const promises = values.map(image => cloudinary.uploader.upload(image.path))
    console.log('did promises', promises)
    Promise
        .all(promises)
        .then(results => {

            console.log('results url', results[0].url)
            res.locals.newImgURL = results[0].url
            return next();
        })

        .catch(err => {
            console.log(err);
        })



}
controller.getImage = (req, res, next) => {
    // https://res.cloudinary.com/travelappcloud/image/fetch/
}


// middleware to get all markers
// controller.getMarkersAndLocation = (req, res, next) => {
//     const markersQuery =
//     // `SELECT users.id, users.username, location.longitude, location.latitude, location.description, location.tag, location.imgURLS
//     `SELECT users.id, users.username, location.longitude, location.latitude, location.description, location.tag, images.urls
//     FROM users
//     JOIN location ON location.users_id = users.id
//     JOIN images
//     ON location.location_id = images.location_id;`;
//     db.query(markersQuery)
//         .then(markersList => {
//             res.locals.markersLocationList = markersList.rows;
//             console.log('res locals markerslist', res.locals.markersLocationList)
//             return next();
//         })
//         .catch(err => {
//             return next(err);
//         })
// }
controller.getMarkers = (req, res, next) => {
    const markersQuery =
        // `SELECT users.id, users.username, location.longitude, location.latitude, location.description, location.tag, location.imgURLS
        `SELECT users.id, users.username, location.longitude, location.latitude, location.description, location.tag, location.urls
    FROM users
    JOIN location ON location.users_id = users.id;`;
    db.query(markersQuery)
        .then(markersList => {
            res.locals.markersList = markersList.rows;
            //console.log('res locals markerslist', res.locals.markersList)
            return next();
        })
        .catch(err => {
            return next(err);
        })
}


// route to add one marker
controller.addMarker = (req, res, next) => {
    //console.log('addmarker req.body:', req.body)
    const { longitude, latitude } = req.body;
    const addMarkerQuery =
        `INSERT INTO location (longitude, latitude, users_id)
    VALUES ('${parseInt(longitude)}', '${parseInt(latitude)}', 1);`
    db.query(addMarkerQuery)
        .then(newMarker => {
            // console.log('added it', newMarker)
            return next();
        })
        .catch(err => {
            return next(err);
        })
}

// route to get single marker data
controller.getOneMarker = (req, res, next) => {
    // ---------- need to test req.body from front end post request to ensure keys are consistent ------
    const { longitude, latitude } = req.body;

    const getOneMarkerQuery =
        `SELECT * FROM location
    JOIN images 
    ON location.location_id = images.location_id
    WHERE location.longitude = '${longitude}' AND location.latitude = '${latitude}';`;
    db.query(getOneMarkerQuery)
        .then(oneMarker => {
            res.locals.oneMarker = oneMarker.rows;
            // console.log(res.locals.oneMarker);
            return next();
        })
        .catch(err => {
            return next(err);
        })
}

// create marker route (on form submit)
controller.updateMarker = (req, res, next) => {
    // --------- need to test req.body from front end post request to ensure keys are consistent ------
    const { latitude, longitude, description, tag, location, imgURL } = req.body;
    console.log(latitude, longitude, description, tag, location, imgURL)
    const updateMarkerQuery =
        `BEGIN TRANSACTION;
    UPDATE location
    SET description = '${description}', tag = '${tag}', location = '${location}', urls='${imgURL}'
    WHERE latitude = '${parseInt(latitude)}' AND longitude = '${parseInt(longitude)}';
    COMMIT;`
    db.query(updateMarkerQuery)
        .then(updatedMarker => {
            res.locals.updatedMarker = updatedMarker;
            console.log('res.locals.updatedMarker:', res.locals.updatedMarker);
            return next();
        })
        .catch(err => {
            return next(err);
        })
}



module.exports = controller;