const {addFunction} = require('../parser');
const {getInspections} = require('@ercorp/er-api-js/apiv2/inspections');
const columnify = require('columnify');

const addV2Inspections = () => {
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
                if (data.inspections && data.inspections.length) {
                    const inspectionSummaries = data
                        .inspections
                        .map(({
                            inspectionID,
                            inspectorUserID,
                            occupancyID,
                            inspectionDate,
                            locked,
                            inspectionType,
                            formID,
                            rowVersion
                        }) => ({
                            inspectionID,
                            inspectorUserID,
                            occupancyID,
                            inspectionDate,
                            locked,
                            inspectionType,
                            formID,
                            rowVersion
                        }));
                    console.log(columnify(inspectionSummaries));
                } else {
                    console.log('No inspections returned.');
                };
            });
        }
    });
};

module.exports = {
    addV2Inspections
};