"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const todos = [];
router.get("/", (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post("/todo", (req, res, next) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newTodo);
    res.status(200).json({ message: newTodo });
});
router.post("/delete", (req, res, next) => {
    const index = todos.findIndex(todoItem => todoItem.id === req.body.id);
    if (index) {
        todos.splice(index, 1);
    }
    res.status(200).json({ todos: todos });
});
router.post("/edit", (req, res, next) => {
    const index = todos.findIndex(todoItem => todoItem.id === req.body.id);
    try {
        todos[index] = { id: req.body.id, text: req.body.text };
        res.status(200).json({ message: "updated Todo", todos: todos });
    }
    catch (_a) {
        res.status(404).json({ message: " no todo found with the given id ", err: index });
    }
});
exports.default = router;
