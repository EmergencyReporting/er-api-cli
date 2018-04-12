const {addFunction} = require('../parser');
const {getRosters, createRoster} = require('@ercorp/er-api-js/apiv2/rosters');
const columnify = require('columnify');

const addV2Rosters = () => {
    addFunction({
        command: 'v2CreateRoster',
        cmdRegEx: /^(.*)$/,
        description: 'Gets a list of rosters. Optionally provide the number of rosters to get and a fi' +
                'lter by clause. Defaults to 5 rosters without a filter.',
        cb: params => {
            console.log(params[1]);
            const newRoster = JSON.parse(params[1]);
            return createRoster(newRoster).then(data => {
                console.log(columnify(data));
            });
        }
    });
    addFunction({
        command: 'v2Rosters',
        cmdRegEx: /^(\d*)\s?(.*)$/,
        description: 'Gets a list of rosters. Optionally provide the number of rosters to get and a fi' +
                'lter by clause. Defaults to 5 rosters without a filter.',
        cb: params => {
            const limit = parseInt(params[1] || '5', 10);
            let queryParams = {
                limit
            };
            if (params[2]) {
                queryParams.filter = params[2];
            }
            return getRosters(queryParams).then(data => {
                if (data.rosters && data.rosters.length) {
                    const rosterSummaries = data
                        .rosters
                        .map(({
                            rosterID,
                            rosterName,
                            defaultStartTime,
                            defaultEndTime,
                            shiftID,
                            narrative
                        }) => ({
                            rosterID,
                            rosterName,
                            defaultStartTime,
                            defaultEndTime,
                            shiftID,
                            narrative
                        }));
                    console.log(columnify(rosterSummaries));
                } else {
                    console.log('No Rosters returned.');
                };
                return data;
            });
        }
    });
};

module.exports = {
    addV2Rosters
};