const fs = require('fs');
const Promise = require('bluebird');
const {homedir} = require('os');
const erapijs = require('@ercorp/er-api-js');
const {updateAuthInfo, addAuthUpdateListener} = erapijs.auth.store;
const authStore = `${homedir()}/er-auth.json`;
const readFile = Promise.promisify(fs.readFile);
const writeFile = Promise.promisify(fs.writeFile);

const readAuthContents = () => readFile(authStore)
    .then(contents => JSON.parse(contents))
    .catch(() => {});

const loadAuth = () => readAuthContents().then(contents => updateAuthInfo(contents || {}));

addAuthUpdateListener(newAuthContents => writeFile(authStore, JSON.stringify(newAuthContents)));

module.exports = {
    loadAuth
};
