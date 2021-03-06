#!/usr/bin/env node

const readline = require('readline');
const Promise = require('bluebird');
const {parse} = require('./parser');
const {addAuthFunctions} = require('./auth/commands');
const {addV1Functions} = require('./apiv1/commands');
const {addV2Functions} = require('./apiv2/commands');
const {addGeneralFunctions} = require('./commands');
const {startTime, timeElapsed} = require('./util');
const {loadAuth} = require('./auth/store');

const rl = readline.createInterface({input: process.stdin, output: process.stdout});
const lineProcessor = prompt => Promise.fromCallback(callback => {
    rl.question(prompt, answer => callback(null, answer));
});

addAuthFunctions();
addV1Functions();
addV2Functions();
addGeneralFunctions(rl);

async function processQuestionAnswerAsync() {
    let output;
    await loadAuth();
    while (output !== 'QUIT') {
        output = await lineProcessor('>');
        const measurement = startTime();
        output = await parse(output).catch(err => {
            console.error(err);
            return output;
        });
        const measureElapsed = timeElapsed(measurement);
        console.log(`Execution Time: ${measureElapsed} seconds`);
    }
}

processQuestionAnswerAsync();
