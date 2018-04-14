const {addFunction} = require('../parser');
const {getInspections} = require('@ercorp/er-api-js/apiv2/inspections');
const columnify = require('columnify');
const {splitParams, addParamIfPresent} = require('../util');

const addV2Inspections = () => {
    addFunction({
        command: 'v2Inspections',
        cmdRegEx: /^(.*)$/,
        description: 'Gets a list of Inspections. Uses the optional format offset|limit|filter|orderby' +
                '|rowVersionDefaults to 5 events.',
        cb: params => {
            const sp = splitParams(params[1]);
            let queryParams = {};
            addParamIfPresent(queryParams, sp, 'offset', 0);
            queryParams.limit = parseInt(sp[1] || '5', 10);
            addParamIfPresent(queryParams, sp, 'filter', 2);
            addParamIfPresent(queryParams, sp, 'orderby', 3);
            addParamIfPresent(queryParams, sp, 'rowVersion', 4);

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