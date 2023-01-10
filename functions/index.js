const functions = require("firebase-functions");
const app = require("express")();
const cors = require('cors');

const auth = require('./util/auth');

app.use(
    cors({
        origin: [
            'http://localhost:3007'
        ]
    })
)

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
    uploadProfilePhoto,
    getUserDetail,
    updateUserDetail
} = require('./api/users');

app.post('/todo', auth, postTodo);
app.get('/todo/:todoID', auth, getTodo);
app.get('/todos', auth, getAllTodos);
app.put('/todo/:todoID', auth, editTodo);
app.delete('/todo/:todoID', auth, deleteTodo);

app.post('/login', loginUser);
app.post('/signup', signupUser);
app.post('/user/image', auth, uploadProfilePhoto);
app.get('/user', auth, getUserDetail);
app.put('/user', auth, updateUserDetail);

exports.api = functions.https.onRequest(app);
