const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersController');

usersRouter.get('/', usersController.usersListGet);
usersRouter.get('/create', usersController.usersCreateGet);
usersRouter.post('/create', usersController.usersCreatePost);

//update
usersRouter.get('/:id/update', usersController.usersUpdateGet);
usersRouter.post('/:id/update', usersController.usersUpdatePost);

//delete
usersRouter.post('/:id/delete', usersController.usersDeletePost);

module.exports = usersRouter;
