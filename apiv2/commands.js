const reduce = require('lodash.reduce');
const {addFunction} = require('../parser');
const {getRosters} = require('@ercorp/er-api-js/apiv2/rosters');
const {getInspections} = require('@ercorp/er-api-js/apiv2/inspections');
const columnify = require('columnify');
const {addV2Apparatus} = require('./apparatus');
const {addV2EventFunctions} = require('./events');
const {addV2Equipment} = require('./equipment');

const addV2Functions = () => {
    addV2EventFunctions();
    addV2Apparatus();
    addV2Equipment();
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
    addFunction({
        command: 'v2Inspections',
        cmdRegEx: /^(.*)$/,
        description: 'Gets a list of Inspections. Uses the optional format offset|limit|filter|orderby' +
                '|rowVersionDefaults to 5 events.',
        cb: params => {
            const splitParams = (params[1] || '').split('|');
            let queryParams = {};
            if (splitParams[0]) {
                queryParams.offset = splitParams[0];
            }
            queryParams.limit = parseInt(splitParams[1] || '5', 10);

            if (splitParams[2]) {
                queryParams.filter = splitParams[2];
            }
            if (splitParams[3]) {
                queryParams.orderby = splitParams[3];
            }
            if (splitParams[4]) {
                queryParams.rowVersion = splitParams[4];
            }

            return getInspections(queryParams).then(data => {
                if (data.inspections) {
                    const inspectionSummaries = reduce(data.inspections, (acc, {
                        inspectionID,
                        inspectorUserID,
                        occupancyID,
                        inspectionDate,
                        locked,
                        inspectionType,
                        formID,
                        rowVersion
                    }) => {
                        acc.push({
                            inspectionID,
                            inspectorUserID,
                            occupancyID,
                            inspectionDate,
                            locked,
                            inspectionType,
                            formID,
                            rowVersion
                        });
                        return acc;
                    }, []);
                    console.log(columnify(inspectionSummaries));
                } else {
                    console.log('No inspections returned.');
                };
            });
        }
    });
};

module.exports = {
    addV2Functions
};