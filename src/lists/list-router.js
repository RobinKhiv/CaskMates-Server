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
    )
      .then(() => res.status(201))
      .catch(next);
  });
listRouter
  .route('/:listId')
  .all(requireAuth)
  .delete((req, res, next) => {
    const userId = req.user.id;
    const listId = req.params.listId;
    ListService.deleteListItem(req.app.get('db'), listId, userId)
      .then(()=> {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonBodyParser, (req, res,next) =>{
    console.log(req.body)
    const user_id = req.user.id;
    const oldListId = req.params.listId;
    const {whiskey_id, list_id } =req.body;
    const newListFields = {whiskey_id, list_id};
    for(const[key, value] of Object.entries(newListFields))
      if(value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
    newListFields.user_id = user_id;
    ListService.updateList(
      req.app.get('db'), oldListId, user_id, newListFields)
      .then(()=> res.status(204))
      .catch(next);
  });

module.exports = listRouter;