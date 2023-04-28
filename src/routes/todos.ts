import { Router } from "express";

import { Todo } from "../models/todo";

const router = Router();

const todos: Todo[] = [];

router.get("/", (req, res, next) => {
    res.status(200).json({ todos : todos })
});

router.post("/todo", (req, res, next) => {
    const newTodo : Todo = {
        id : new Date().toISOString(),
        text : req.body.text
    }

    todos.push(newTodo);
    res.status(200).json({ message : newTodo })
})

router.post("/delete", (req, res, next) => {
    const index = todos.findIndex(todoItem => todoItem.id === req.body.id );
    if(index){
        todos.splice(index, 1)
    }
    res.status(200).json({ todos : todos })
})

router.post("/edit", (req, res, next) =>{
    const index = todos.findIndex(todoItem => todoItem.id === req.body.id );
    try {
        todos[index] = { id: req.body.id , text: req.body.text };
        res.status(200).json({ message: "updated Todo", todos : todos })
    }
    catch {
        res.status(404).json({ message : " no todo found with the given id ", err : index })
    }
})

export default router;