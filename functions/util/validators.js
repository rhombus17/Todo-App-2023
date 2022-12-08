const isEmpty = (string) => string === '' ? true : false;

exports.validateLoginData = (data) => {
    let errors = {};

    if (!data.email || !data.password) errors.general = 'Missing email or password'

    if (isEmpty(data.email)) errors.email = 'Must not be empty';
    if (isEmpty(data.password)) errors.password = 'Must not be empty';
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}