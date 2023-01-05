const functions = require("firebase-functions");
const app = require("express")();

const auth = require('./util/auth');

const {
    postTodo,
    getTodo,
    getAllTodos,
    editTodo,
    deleteTodo
} = require('./api/todos');

const {
    loginUser,
    signupUser,
    uploadProfilePhoto
} = require('./api/users');

app.post('/todo', postTodo);
app.get('/todo/:todoID', getTodo);
app.get('/todos', getAllTodos);
app.put('/todo/:todoID', editTodo);
app.delete('/todo/:todoID', deleteTodo);

app.post('/login', loginUser);
app.post('/signup', signupUser);
app.post('/user/image', auth, uploadProfilePhoto);

exports.api = functions.https.onRequest(app);
