const {addFunction} = require('../parser');
const {getRosters, createRoster, deleteRoster} = require('@ercorp/er-api-js/apiv2/rosters');
const columnify = require('columnify');
const {splitParams, addParamIfPresent} = require('../util');

const addV2Rosters = () => {
    addFunction({
        command: 'v2CreateRoster',
        cmdRegEx: /^(.*)$/,
        description: 'Gets a list of rosters. Optionally provide the number of rosters to get and a fi' +
                'lter by clause. Defaults to 5 rosters without a filter.',
        cb: params => {
            const newRoster = JSON.parse(params[1]);
            return createRoster(newRoster).then(data => {
                console.log(columnify(data));
                return data;
            }).catch(err => {
                if (err.response.data) {
                    console.log(`ERROR! Status code: ${err.response.status} - ${JSON.stringify(err.response.data)}`);
                }
                return err;
            });
        }
    });
    addFunction({
        command: 'v2DeleteRoster',
        cmdRegEx: /^(\d+)$/,
        description: 'Deletes a roster. Must specify the rosterID to be deleted.',
        cb: params => {
            const rosterID = parseInt(params[1], 10);
            return deleteRoster(rosterID).catch(err => {
                if (err.response.data) {
                    console.log(`ERROR! Status code: ${err.response.status} - ${JSON.stringify(err.response.data)}`);
                }
                return err;
            });
        }
    });
    addFunction({
        command: 'v2Rosters',
        cmdRegEx: /^(.*)$/,
        description: 'Gets a list of rosters. Optionally provide the number of rosters to get and a fi' +
                'lter by clause.  Uses the optional format offset|limit|filter|orderby|rowVersion' +
                'Defaults to 5 rosters.',
        cb: params => {
            const sp = splitParams(params[1]);
            let queryParams = {};
            addParamIfPresent(queryParams, sp, 'offset', 0);
            queryParams.limit = parseInt(sp[1] || '5', 10);
            addParamIfPresent(queryParams, sp, 'filter', 2);
            addParamIfPresent(queryParams, sp, 'orderby', 3);
            addParamIfPresent(queryParams, sp, 'rowVersion', 4);

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