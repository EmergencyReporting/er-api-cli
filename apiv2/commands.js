const reduce = require('lodash.reduce');
const {addFunction} = require('../parser');
const {getRosters} = require('@ercorp/er-api-js/apiv2/rosters');
const columnify = require('columnify');

const addV2Functions = () => {
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
                if (data.rosters) {
                    const rosterSummaries = reduce(data.rosters, (acc, {
                        rosterID,
                        rosterName,
                        defaultStartTime,
                        defaultEndTime,
                        shiftID,
                        narrative
                    }) => {
                        acc.push({
                            rosterID,
                            rosterName,
                            defaultStartTime,
                            defaultEndTime,
                            shiftID,
                            narrative
                        });
                        return acc;
                    }, []);
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
    addV2Functions
};