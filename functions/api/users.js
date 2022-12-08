const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require("firebase/auth");
const { initializeApp } = require("firebase/app");

const { admin, db } = require("../util/admin");
const { firebaseConfig } = require("../util/firebaseConfig");
const { validateLoginData, validateSignupData } = require("../util/validators")

initializeApp(firebaseConfig);

exports.loginUser = (request, response) => {
    const user = {
        email: request.body.email,
        password: request.body.password
    }

    const { valid, errors } = validateLoginData(user);
    if (!valid) return response.status(400).json(errors);

    const auth = getAuth();
    signInWithEmailAndPassword(auth, user.email, user.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then((token) => {
            return response.json({ token });
        })
        .catch((error) => {
            console.error(error);
            return response.status(403).json({ general: 'invalid credentials, please try again'})
        });
}


