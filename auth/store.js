const fs = require('fs');
const Promise = require('bluebird');
const {homedir} = require('os');
const {updateAuthInfo, addAuthUpdateListener} = require('@ercorp/er-api-js/auth/store');
const authStore = `${homedir()}/er-auth.json`;
const readFile = Promise.promisify(fs.readFile);
const writeFile = Promise.promisify(fs.writeFile);

const readAuthContents = () => readFile(authStore)
    .then(contents => JSON.parse(contents))
    .catch(() => {});

const loadAuth = () => readAuthContents().then(contents => updateAuthInfo(contents || {}));

addAuthUpdateListener(newAuthContents => {
    readAuthContents().then(storedAuth => {
        const authContents = Object.assign({}, storedAuth, newAuthContents);
        return writeFile(authStore, JSON.stringify(authContents));
    });
});

module.exports = {
    loadAuth
};
