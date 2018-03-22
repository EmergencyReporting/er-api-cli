const fs = require('fs');
const Promise = require('bluebird');
const {refreshAuthorization, authorizePassword} = require('./authServices');
const authStore = 'auth.json';
const readFile = Promise.promisify(fs.readFile);
const writeFile = Promise.promisify(fs.writeFile);

let authInfo = {};

const loadAuth = () => readFile(authStore).then(contents => {
    authInfo = JSON.parse(contents);
    console.log(authInfo);
    return authInfo;
});

const saveAuth = () => {
    const serial = JSON.stringify(authInfo);
    return writeFile(authStore, serial);
};

const getAuth = () => authInfo;

const getAccessToken = () => {
    const now = Date.now();
    if (authInfo.goodUntil > now && authInfo.access_token) {
        return Promise.resolve(authInfo.access_token);
    }

    // if (authInfo.refresh_token) {     return
    // refreshAuthorization(authInfo.refresh_token, authInfo.client_id,
    // authInfo.client_secret); }

    if (authInfo.username && authInfo.password) {
        return authorizePassword(authInfo.username, authInfo.password, authInfo.client_id, authInfo.client_secret).then(({access_token, refresh_token, expires_in}) => {
            authInfo.refresh_token = refresh_token;
            authInfo.access_token = access_token;
            authInfo.goodUntil = Date.now() + ((expires_in - 300) * 1000);
            return access_token;
        });;
    }

    return Promise.reject('Invalid auth info');
};

module.exports = {
    loadAuth,
    saveAuth,
    getAuth,
    getAccessToken
};
