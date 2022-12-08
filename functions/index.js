const functions = require("firebase-functions");
const app = require("express")();

const {
    postTodo,
    getTodo,
    getAllTodos,
    editTodo,
    deleteTodo
} = require('./api/todos')

app.post('/todo', postTodo);
app.get('/todo/:todoID', getTodo);
app.get('/todos', getAllTodos);
app.put('/todo/:todoID', editTodo);
app.delete('/todo/:todoID', deleteTodo);

exports.api = functions.https.onRequest(app);
