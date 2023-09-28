const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');


router.get("/todos", async(req,res,next) =>{
  try{
    const earliestTodo = await Todo.findOne().sort('-createdAt');

    if(!earliestTodo){
      return res.status(404).json({message:"No post items found."})
    }

    res.status(200).json(earliestTodo);
  } catch (error){
    console.log("Error retrieving earliest post:", error);
    res.status(500).json({error: "Failed to retrieve earliest post."});
  }
});

router.post('/todos', (req, res, next) => {
 const {title,body, name} = req.body; 

const newTodo = new Todo({
  title,
  body,
  name,
});

newTodo.save()
  .then((savedTodo) => {
    res.status(201).json(savedTodo);
  })
  .catch(next);
});

router.delete('/todos/:id', (req, res, next) => {
  Todo.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;
