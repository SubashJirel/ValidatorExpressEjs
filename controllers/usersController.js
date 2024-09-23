// controllers/usersController.js
const usersStorage = require('../storages/usersStorage');
// This just shows the new stuff we're adding to the existing contents
const { body, validationResult } = require('express-validator');

const alphaErr = 'must only contain letters.';
const lengthErr = 'must be between 1 and 10 characters.';

const validateUser = [
  body('firstName')
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body('lastName')
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
];

exports.usersListGet = (req, res) => {
  console.log(usersStorage.getUsers());
  res.render('pages/index', {
    title: 'User list',
    users: usersStorage.getUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
  res.render('pages/createUser', {
    title: 'Create user',
  });
};

exports.usersCreatePost = (req, res) => {
  const { firstName, lastName } = req.body;
  console.log(firstName, lastName);
  usersStorage.addUser({ firstName, lastName });
  res.redirect('/');
};
