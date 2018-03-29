const columnify = require('columnify');
const {authInfo, getAuth} = require('@ercorp/er-api-js/auth/store');
const {addFunction} = require('../parser');
const {loadAuth, saveAuth} = require('./store');

const addAuthFunctions = () => {
    addFunction({
        command: 'SetClientID',
        description: 'Sets the Client ID',
        cmdRegEx: /^(.*)$/,
        cb: data => Promise
            .resolve()
            .then(() => {
                getAuth().client_id = data[1];
                return true;
            })
    });
    addFunction({
        command: 'SetClientSecret',
        cmdRegEx: /^(.*)$/,
        cb: data => Promise
            .resolve()
            .then(() => {
                getAuth().client_secret = data[1];
                return true;
            })
    });
    addFunction({
        command: 'SetUser',
        cmdRegEx: /^(.*)$/,
        cb: data => Promise
            .resolve()
            .then(() => {
                getAuth().username = data[1];
                return true;
            })
    });
    addFunction({
        command: 'SetPassword',
        cmdRegEx: /^(.*)$/,
        cb: data => Promise
            .resolve()
            .then(() => {
                getAuth().password = data[1];
                return true;
            })
    });
    addFunction({
        command: 'PrintAuth',
        cb: () => Promise
            .resolve()
            .then(() => {
                let auth = {
                    ...getAuth()
                };
                if (auth.password) {
                    auth.password = '<hidden>';
                }
                console.log(columnify((auth)));
                return true;
            })
    });
    addFunction({
        command: 'LoadAuth',
        cb: () => loadAuth()
    });
    addFunction({
        command: 'SaveAuth',
        cb: () => saveAuth()
    });
};

module.exports = {
    addAuthFunctions
};
