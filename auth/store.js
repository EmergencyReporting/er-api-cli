const fs = require('fs');
const Promise = require('bluebird');
const { refreshAuthorization, authorizePassword } = require('@ercorp/er-api-js/auth/authServices');
const { updateStoreInfo, getAuth, getAccessToken } = require('@ercorp/er-api-js/auth/store');
const authStore = 'auth.json';
const readFile = Promise.promisify(fs.readFile);
const writeFile = Promise.promisify(fs.writeFile);

const loadAuth = () => readFile(authStore).then(contents => {
    return updateStoreInfo(JSON.parse(contents));
});

const saveAuth = () => Promise.resolve(getAuth()).then(contents => writeFile(authStore, JSON.stringify(contents)));

module.exports = {
    loadAuth,
    saveAuth,
};
