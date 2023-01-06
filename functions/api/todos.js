const { db } = require("../util/admin");

exports.postTodo = (request, response) => {
    if (request.body.body.trim() === '') {
        return response.status(400).json({ body: 'Must not be empty' });
    }
    
    if (request.body.title.trim() === '') {
        return response.status(400).json({ title: 'Must not be empty' });
    }

    const newTodoItem = {
        title: request.body.title,
        body: request.body.body,
        username: request.user.username,
        createdAt: new Date().toISOString()
    }

    db
        .collection('todos')
        .add(newTodoItem)
        .then((doc) => {
            const responseTodoItem = newTodoItem;
            responseTodoItem.id = doc.id;
            return response.json(responseTodoItem);
        })
        .catch((error) => {
            console.error(error);
            return response.status(500).json({ error: 'Something went wrong' });
        });
};

exports.getTodo = (request, response) => {
    db
        .doc(`/todos/${request.params.todoID}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Todo not found' });
            }
            if (!doc.data().username !== request.user.username) {
                return response.status(403).json({ error: "Unaruthorized" });
            }
            let todoData = doc.data();
            todoData.todoID = doc.id;
            return response.json(todoData);
        })
        .catch((error) => {
            console.error(error);
            return response.status(500).json({ error: error.code });
        });
}

exports.getAllTodos = (request, response) => {
    db
        .collection('todos')
        .where('username', '==', request.user.username)
        .orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
            let todos = [];
            data.forEach((doc) => {
                todos.push({
                    todoID: doc.id,
                    title: doc.data().title,
                    body: doc.data().body,
                    createdAt: doc.data().createdAt
                });
            });
            return response.json(todos);
        })
        .catch((error) => {
            console.error(error);
            return response.status(500).json({ error: error.code });
        });
};

exports.editTodo = (request, response) => {
    if (request.body.todoID || request.body.createdAt) {
        return response.status(403).json({ message: 'Cannot edit ID or creation time' });
    }
    let document = db.collection('todos').doc(`${request.params.todoID}`);
    document.
        get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Todo not found' });
            }
            return document.update(request.body);
        })
        .then(() => {
            return response.json({ message: 'Updated successfully' });
        })
        .catch((error) => {
            console.error(error);
            return response.status(500).json({ error: error.code });
        });
}

exports.deleteTodo = (request, response) => {
    const document = db.doc(`/todos/${request.params.todoID}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Todo not found' });
            }
            if (!doc.data().username !== request.user.username) {
                return response.status(403).json({ error: "Unaruthorized" });
            }
            return document.delete();
        })
        .then(() => {
            return response.json({ message: 'Delete successful' });
        })
        .catch((error) => {
            console.error(error);
            return response.status(500).json({ error: error.code });
        });
};
