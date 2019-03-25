'use strict';

const express = require('express');
const ListService = require('./list-service.js');
const {requireAuth} = require('../middleware/jwt-auth');


const listRouter = express.Router();
const jsonBodyParser = express.json();

listRouter
  .route('/')
  .all(requireAuth)
  .get((req, res, next) => {
    const userId = req.user.id;
    ListService.getWhiskeyList(req.app.get('db'), userId)
      .then(lists => res.json(ListService.serializeWhiskeyLists(lists)))
      .catch(next);
  })
  .post(jsonBodyParser, (req,res,next)=>{

    const {whiskey_id, list_id} = req.body;
    const newItemInList = {whiskey_id, list_id};
    for(const[key, value] of Object.entries(newItemInList))
      if(value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
    newItemInList.user_id = req.user.id;
    ListService.insertItemIntoList(
      req.app.get('db'),
      newItemInList
    ).then(() => res.status(201));
  });

module.exports = listRouter;