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

exports.signupUser = (request, response) => {
    const newUser = {
        email: request.body.email,
        username: request.body.username,
        password: request.body.password,
        confirmPassword: request.body.confirmPassword,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        phoneNumber: request.body.phoneNumber,
        country: request.body.country,
    };

    const { valid, errors } = validateSignupData(newUser);

    if (!valid) return response.status(400).json(errors);

    let token, userID;
    db
        .doc(`/users/${newUser.username}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                return response.status(400).json({ username : 'username already in use' });
            } else {
                const auth = getAuth();
                return createUserWithEmailAndPassword(
                    auth,
                    newUser.email,
                    newUser.password
                )
            }
        })
        .then((data) => {
            userID = data.user.uid;
            return data.user.getIdToken();
        })
        .then((idtoken) => {
            token = idtoken;
            const userCredentials = { ...newUser };
            userCredentials.createdAt = new Date().toISOString();
            userCredentials.userID = userID;
            return db
                .doc(`/users/${newUser.username}`)
                .set(userCredentials);
        })
        .then(() => {
            return response.status(201).json({ token });
        })
        .catch((error) => {
            console.error(error);
            if (error.code === 'auth/email-already-in-use') {
                return response.status(400).json({ email: 'Email is already in use' });
            } else if (error.code === 'auth/weak-password') {
                return response.status(400).json({ password: 'Password is too weak. Should be at least 6 characters.' });
            } else {
                return response.status(500).json({ general: 'Something went wrong, please try again' });
            }
        })
}


