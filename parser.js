const reduce = require('lodash.reduce');
const commandParser = /^([\w]+)\s*(.*)$/;

let commands = {};

const addFunction = (command, cmdRegEx, cb) => {
    commands[command] = {
        cmdRegEx,
        cb
    };
}

const parse = input => {
    const match = commandParser.exec(input);
    if (match) {
        const commandName = match[1];
        const command = commands[commandName];
        if (!command) 
            return Promise.reject(`Command not found ${commandName}`);
        const commandMatch = !command.cmdRegEx || command
            .cmdRegEx
            .exec(match[2]);
        if (commandMatch) {
            return command.cb(commandMatch);
        } else {
            return Promise.reject(`${commandName} had invalid parameters`);
        }
    }
    return Promise.reject(`Illegal command ${input}`);
};

module.exports = {
    addFunction,
    parse
};
