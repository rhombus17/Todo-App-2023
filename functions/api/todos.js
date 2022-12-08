const { db } = require("../util/admin");

exports.getAllTodos = (request, response) => {
    db
        .collection('todos')
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
