const {addFunction} = require('../parser');
const {loadAuth, saveAuth, authInfo, getAuth} = require('./store');

const addAuthFunctions = () => {
    addFunction('SetClientID', /^(.*)$/, data => Promise.resolve().then(() => {
        getAuth().client_id = data[1];
        return true;
    }));
    addFunction('SetClientSecret', /^(.*)$/, data => Promise.resolve().then(() => {
        getAuth().client_secret = data[1];
        return true;
    }));
    addFunction('SetUser', /^(.*)$/, data => Promise.resolve().then(() => {
        getAuth().username = data[1];
        return true;
    }));
    addFunction('SetPassword', /^(.*)$/, data => Promise.resolve().then(() => {
        getAuth().password = data[1];
        return true;
    }));
    addFunction('PrintAuth', false, () => Promise.resolve().then(() => {
        console.log(`Auth: ${JSON.stringify(getAuth())}`);
        return true;
    }));
    addFunction('LoadAuth', false, () => loadAuth());
    addFunction('SaveAuth', false, () => saveAuth());
};
module.exports = {
    addAuthFunctions
};
