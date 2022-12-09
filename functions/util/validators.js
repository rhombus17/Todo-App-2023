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

exports.validateSignupData = (data) => {
    let errors = {};

    if (!data.email) errors.email = dataMissingErrorMessage;
    if (!data.username) errors.username = dataMissingErrorMessage;
    if (!data.password) errors.password = dataMissingErrorMessage;
    if (!data.firstName) errors.firstName = dataMissingErrorMessage;
    if (!data.lastName) errors.lastName = dataMissingErrorMessage;
    if (!data.phoneNumber) errors.phoneNumber = dataMissingErrorMessage;
    if (!data.country) errors.country = dataMissingErrorMessage;

    let valid = Object.keys(errors).length === 0 ? true : false;
    if (!valid) return { valid, errors };

    if (isEmpty(data.email)) errors.email = emptyStringErrorMessage;
    if (isEmpty(data.username)) errors.username = emptyStringErrorMessage;
    if (isEmpty(data.password)) errors.password = emptyStringErrorMessage;
    if (isEmpty(data.firstName)) errors.firstName = emptyStringErrorMessage;
    if (isEmpty(data.lastName)) errors.lastName = emptyStringErrorMessage;
    if (isEmpty(data.phoneNumber)) errors.phoneNumber = emptyStringErrorMessage;
    if (isEmpty(data.country)) errors.country = emptyStringErrorMessage;

    valid = Object.keys(errors).length === 0 ? true : false;
    if (!valid) return { valid, errors };

    if (!isEmail(data.email)) errors.email = 'Must be valid email';

    if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords must match';
    
    valid = Object.keys(errors).length === 0 ? true : false;
    return { errors, valid };
};