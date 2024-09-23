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
    .isLength({ min: 2, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body('lastName')
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 2, max: 10 })
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

// We can pass an entire array of middleware validations to our controller.
exports.usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('pages/createUser', {
        title: 'Create user',
        errors: errors.array(),
      });
    }
    const { firstName, lastName } = req.body;
    console.log(firstName, lastName);
    usersStorage.addUser({ firstName, lastName });
    res.redirect('/');
  },
];

exports.usersUpdateGet = (req, res) => {
  const updateId = req.params.id;
  const selectedUser = usersStorage.getUser(updateId);
  res.render('pages/updateUser', {
    title: 'Update this user',
    user: selectedUser,
  });
  console.log('here is your selected user');
  console.log(selectedUser);
};

exports.usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('updateUser', {
        title: 'Update user',
        user: user,
        errors: errors.array(),
      });
    }
    const { firstName, lastName } = req.body;
    usersStorage.updateUser(req.params.id, { firstName, lastName });
    res.redirect('/');
  },
];

// Tell the server to delete a matching user, if any. Otherwise, respond with an error.
exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect('/');
};

//search functionality

// GET: Display search form
exports.usersSearchGet = (req, res) => {
  res.render('pages/search', { results: null, query: null });
};

// GET: Handle search query
exports.usersSearchResults = (req, res) => {
  const { firstName, lastName } = req.query;

  // Fetch all users
  const users = usersStorage.getUsers();

  // Filter users by first name or last name
  const results = users.filter((user) => {
    return (
      (firstName &&
        user.firstName.toLowerCase().includes(firstName.toLowerCase())) ||
      (lastName && user.lastName.toLowerCase().includes(lastName.toLowerCase()))
    );
  });

  res.render('pages/search', { results, query: req.query });
};
