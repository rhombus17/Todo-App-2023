const { admin, db } = require('./admin');

module.exports = (request, response, next) => {

    if (!request.headers.authorization ||
        !request.headers.authorization.startsWith('Bearer ')) {
            console.error("No token found for this request");
            return response.status(403).json({ error: 'Unauthorized' });
        }
    
    let idToken = request.headers.authorization.split('Bearer ')[1];
    admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
            request.user = decodedToken;
            return db.collection('users').where('userID', '==', request.user.uid).limit(1).get();
        })
        .then((data) => {
            request.user.username = data.docs[0].data().username;
            request.user.imageUrl = data.docs[0].data().imageUrl;
            return next();
        })
        .catch((error) => {
            console.error('Error while verifying token', error);
            return response.status(403).json(error);
        });
};
