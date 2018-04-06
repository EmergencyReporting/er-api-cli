const columnify = require('columnify');
const {getAuth, updateStoreInfo} = require('@ercorp/er-api-js/auth/store');
const {addFunction} = require('../parser');

const addAuthFunctions = () => {
    addFunction({
        command: 'SetClientID',
        description: 'Sets the Client ID',
        cmdRegEx: /^(.*)$/,
        cb: data => updateStoreInfo({client_id: data[1]})
    });
    addFunction({
        command: 'SetClientSecret',
        cmdRegEx: /^(.*)$/,
        cb: data => updateStoreInfo({client_secret: data[1]})
    });
    addFunction({
        command: 'SetUser',
        cmdRegEx: /^(.*)$/,
        cb: data => updateStoreInfo({username: data[1]})
    });
    addFunction({
        command: 'SetPassword',
        cmdRegEx: /^(.*)$/,
        cb: data => updateStoreInfo({username: data[1]})
    });
    addFunction({
        command: 'AuthTime',
        cb: data => Promise
            .resolve(getAuth())
            .then(auth => {
                if (auth.goodUntil) {
                    const msRemaining = auth.goodUntil - Date.now();
                    console.log(`Time remaining ${ (msRemaining / 1000 / 60).toFixed(2)} minutes`);
                } else {
                    console.log('Token time remaining not set.');
                }
                auth.password = data[1];
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
};

module.exports = {
    addAuthFunctions
};
