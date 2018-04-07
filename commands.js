const Promise = require('bluebird');
const columnify = require('columnify');
const {addFunction, listCommands} = require('./parser');
const {setAuthEnv} = require('@ercorp/er-api-js/auth/authServices');
const {updateStoreInfo} = require('@ercorp/er-api-js/auth/store');

const addGeneralFunctions = (rl) => {
    addFunction({
        command: 'QUIT',
        description: 'Exits the application',
        cb: () => Promise
            .resolve()
            .then(() => {
                console.log('Exiting.... goodbye!');
                rl.close();
                return 'QUIT';
            })
    });

    addFunction({
        command: 'SetUris',
        description: 'Sets the uris used by ER Auth and API calls. Format: "<API_URL> <AUTH_URL>"',
        cmdRegEx: /^(\S*) (\S*)$/,
        cb: (params) => Promise
            .resolve()
            .then(() => {
                const uris = {
                    api: params[1],
                    auth: params[2]
                };
                console.log(uris);

                updateStoreInfo({authUrl: uris.auth, apiUrl: uris.api});

                return uris;
            })
    });

    addFunction({
        command: 'help',
        description: 'Shows the list of supported commands.',
        cb: () => Promise
            .resolve(listCommands())
            .then(commands => columnify(commands.map(({command, description}) => ({command, description}))))
            .then(formattedData => {
                console.log(formattedData);
                return '';
            })
    });
};

module.exports = {
    addGeneralFunctions
};
