const Promise = require('bluebird');
const columnify = require('columnify');
const {addFunction, listCommands} = require('./parser');

const addGeneralFunctions = (rl) => {
    addFunction({
        command: 'QUIT',
        description: 'Exits',
        cb: () => Promise
            .resolve()
            .then(() => {
                console.log('Exiting.... goodbye!');
                rl.close();
                return 'QUIT';
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
