'use strict';

const express = require('express');
const ListService = require('./list-service.js');
const {requireAuth} = require('../middleware/jwt-auth');

const listRouter = express.Router();

listRouter
  .route('/')
  .all(requireAuth)
  .get((req, res, next) => {
    const userId = req.user.id;
    ListService.getWhiskeyList(req.app.get('db'), userId)
      .then(lists => res.json(ListService.serializeWhiskeyLists(lists)))
      .catch(next);
  });

module.exports = listRouter;