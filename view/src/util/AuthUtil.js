const authTokenID = 'AuthToken';

export const authMiddleWare = (navigate) => {
    const authToken = localStorage.getItem(authTokenID);
    console.log(`Verifying auth token: ${authToken}`);
    if (authToken === null) {
        navigate('/login');
    }
}

export const setAuthToken = (token) => {
    localStorage.setItem(authTokenID, `Bearer ${token}`);
}

export const getAuthToken = () => {
    return localStorage.getItem(authTokenID);
}

export const removeAuthToken = () => {
    localStorage.removeItem(authTokenID);
}
