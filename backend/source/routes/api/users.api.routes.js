const express = require('express');
const usersController = require('../../controllers/api/users.api.controller');
const route = express.Router();

const { resolve, extname } = require('path');
const { existsSync, mkdirSync } = require('fs');

route.get('/api/users', usersController.list);
route.get('/api/users/last', usersController.last);
route.get('/api/users/:id', usersController.detail);

module.exports = route;