const fs = require('fs');
const Promise = require('bluebird');
const {refreshAuthorization, authorizePassword} = require('@ercorp/er-api-js/auth/authServices');
const {updateStoreInfo, getAuth, getAccessToken} = require('@ercorp/er-api-js/auth/store');
const authStore = 'auth.json';
const readFile = Promise.promisify(fs.readFile);
const writeFile = Promise.promisify(fs.writeFile);

const readAuthContents = () => readFile(authStore).then(contents => JSON.parse(contents));

const loadAuth = () => readAuthContents().then(contents => updateStoreInfo(contents));

const saveAuth = () => Promise.all([getAuth(), readAuthContents()]).then(contents => ({currentAuth: contents[0], storedAuth: contents[1]})).then(({currentAuth, storedAuth}) => {
    const authContents = Object.assign({}, storedAuth, currentAuth);
    return writeFile(authStore, JSON.stringify(authContents))
});

module.exports = {
    loadAuth,
    saveAuth
};
