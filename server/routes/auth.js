const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const passport = require('passport');
const _ = require('lodash')
const multer = require("multer");
const uploadCloud = require('../config/cloudinary.js');

const login = (req, user) => {
  return new Promise((resolve, reject) => {
    req.login(user, err => {
      if (err) {
        reject(new Error('Something went wrong'))
      } else {
        resolve(user);
      }
    })
  })
}


// SIGNUP
router.post('/signup', (req, res, next) => {

  const  {
    username,
    password,
    email
  } = req.body;

  // Check for non empty user or password
  if (!username || !password) {
    next(new Error('You must provide valid credentials'));
  }

  // Check if user exists in DB
  User.findOne({
      username
    })
    .then(foundUser => {
      if (foundUser) throw new Error('Username already exists');

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      return new User({
        username,
        password: hashPass,
        email
      }).save();
    })
    .then(savedUser => login(req, savedUser)) // Login the user using passport
    .then(user => res.json({
      status: 'signup & login successfully',
      user
    })) // Answer JSON
    .catch(e => next(e));
});


router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {

    // Check for errors
    if (err) next(new Error('Something went wrong'));
    if (!theUser) next(failureDetails)

    // Return user and logged in
    login(req, theUser).then(user => res.status(200).json(req.user));

  })(req, res, next);
});


router.get('/currentuser', (req, res, next) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    next(new Error('Not logged in'))
  }
})


router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({
    message: 'logged out'
  })
});

router.put('/update', (req, res, next) => {

  const updates = _.pickBy({
    username,
    password,
    email,
    estatus,
    _id
  } = req.body)

  User.findOne({username})
    .then(foundUser => {
      if (foundUser) throw new Error('Username already exists');
      if (updates.password) {

        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(updates.password, salt);

        updates.password = hashPass
      }

        User.findByIdAndUpdate(updates._id, updates)
        .then(e =>{
          return res.status(200).json(e)
        })
      
    })
    .catch(e => next(e));
});

router.post('/updatepic', uploadCloud.single('file'), (req, res, next) => {

  const updates = _.pickBy({
    username,
    password,
    email,
    estatus
  } = req.body)

  if (req.file.url) updates.profilePic = req.file.url;
  console.log(updates)

  User.findById(req.body._id)
  .then(foundUser => {
    //if (foundUser) throw new Error('Username already exists');
    if (updates.password) {

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(updates.password, salt);

      updates.password = hashPass

    }
      User.findByIdAndUpdate(req.body._id, updates)
      .then(e =>{
        return res.status(200).json(e)
      })
  })
  .catch(e => next(e));
});


router.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message
  });
})

module.exports = router;