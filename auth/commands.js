const columnify = require('columnify');
const erapijs = require('@ercorp/er-api-js');
const {addFunction} = require('../parser');
const {updateAuthInfo, addAuthUpdateListener, logoutUserInfo} = erapijs.auth.store;

let authInfo = {};

const addAuthFunctions = () => {
    addFunction({
        command: 'SetClientID',
        description: 'Sets the Client ID',
        cmdRegEx: /^(.*)$/,
        cb: data => updateAuthInfo({client_id: data[1]})
    });
    addFunction({
        command: 'SetClientSecret',
        cmdRegEx: /^(.*)$/,
        cb: data => updateAuthInfo({client_secret: data[1]})
    });
    addFunction({
        command: 'SetUser',
        cmdRegEx: /^(.*)$/,
        cb: data => updateAuthInfo({username: data[1]})
    });
    addFunction({
        command: 'SetPassword',
        cmdRegEx: /^(.*)$/,
        cb: data => updateAuthInfo({password: data[1]})
    });
    addFunction({
        command: 'AuthTime',
        cb: data => {
            if (authInfo.goodUntil) {
                const msRemaining = authInfo.goodUntil - Date.now();
                console.log(`Time remaining ${ (msRemaining / 1000 / 60).toFixed(2)} minutes`);
            } else {
                console.log('Token time remaining not set.');
            }
            return Promise.resolve(true);
        }
    });
    addFunction({
        command: 'PrintAuth',
        cb: () => {
            let auth = {
                ...authInfo
            };
            if (auth.password) {
                auth.password = '<hidden>';
            }
            console.log(columnify((auth)));
            return Promise.resolve(true);
        }
    });
    addFunction({
        command: 'LogoutAuth',
        cb: () => logoutUserInfo()
    });
    addAuthUpdateListener(newAuth => {
        authInfo = newAuth;
        Promise.resolve();
    });
};

module.exports = {
    addAuthFunctions
};
