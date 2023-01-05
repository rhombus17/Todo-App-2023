const isEmpty = (string) => string === '' ? true : false;
const emptyStringErrorMessage = 'Must not be empty';
const dataMissingErrorMessage = 'Data missing';

exports.validateLoginData = (data) => {
    let errors = {};
    
    if (!data.email) errors.email = dataMissingErrorMessage;
    if (!data.password) errors.password = dataMissingErrorMessage;

    let valid = Object.keys(errors).length === 0 ? true : false;
    if (!valid) return { valid, errors };

    if (isEmpty(data.email)) errors.email = emptyStringErrorMessage;
    if (isEmpty(data.password)) errors.password = emptyStringErrorMessage;

    valid = Object.keys(errors).length === 0 ? true : false;
    return { valid, errors };
}

const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const isEmail = (email) => email.match(emailRegEx) ? true : false;

exports.validateSignupData = (userData, passwordData) => {
    let errors = {};

    if (!userData.email) errors.email = dataMissingErrorMessage;
    if (!userData.username) errors.username = dataMissingErrorMessage;
    if (!passwordData.password) errors.password = dataMissingErrorMessage;
    if (!userData.firstName) errors.firstName = dataMissingErrorMessage;
    if (!userData.lastName) errors.lastName = dataMissingErrorMessage;
    if (!userData.phoneNumber) errors.phoneNumber = dataMissingErrorMessage;
    if (!userData.country) errors.country = dataMissingErrorMessage;

    let valid = Object.keys(errors).length === 0 ? true : false;
    if (!valid) return { valid, errors };

    if (isEmpty(userData.email)) errors.email = emptyStringErrorMessage;
    if (isEmpty(userData.username)) errors.username = emptyStringErrorMessage;
    if (isEmpty(passwordData.password)) errors.password = emptyStringErrorMessage;
    if (isEmpty(userData.firstName)) errors.firstName = emptyStringErrorMessage;
    if (isEmpty(userData.lastName)) errors.lastName = emptyStringErrorMessage;
    if (isEmpty(userData.phoneNumber)) errors.phoneNumber = emptyStringErrorMessage;
    if (isEmpty(userData.country)) errors.country = emptyStringErrorMessage;

    valid = Object.keys(errors).length === 0 ? true : false;
    if (!valid) return { valid, errors };

    if (!isEmail(userData.email)) errors.email = 'Must be valid email';

    if (passwordData.password !== passwordData.confirmPassword) errors.confirmPassword = 'Passwords must match';
    
    valid = Object.keys(errors).length === 0 ? true : false;
    return { errors, valid };
};
