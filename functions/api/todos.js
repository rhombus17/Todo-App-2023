exports.getAllTodos = (request, response) => {
    todos = [
        {
            "id": "1",
            "title": "greeting",
            "body": "hello world from matt"
        },
        {
            "id": "2",
            "title": "greeting2",
            "body": "hello world 2 from matt"
        }
    ]
    return response.json(todos);
}
