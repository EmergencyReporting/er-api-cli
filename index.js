const readline = require('readline');
const Promise = require('bluebird');
const columnify = require('columnify');
const {addFunction, parse, listCommands} = require('./parser');
const {addAuthFunctions} = require('./auth/commands');
const {addV1Functions} = require('./apiv1/commands');

const rl = readline.createInterface({input: process.stdin, output: process.stdout});
const lineProcessor = prompt => Promise.fromCallback(callback => {
    rl.question(prompt, answer => callback(null, answer));
});

addAuthFunctions();
addV1Functions();

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

async function processQuestionAnswerAsync() {
    let output;
    while (output !== 'QUIT') {
        output = await lineProcessor('>');
        output = await parse(output).catch(err => {
            console.error(err);
            return output;
        });
    }
}

processQuestionAnswerAsync();
