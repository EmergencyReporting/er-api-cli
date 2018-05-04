const {addFunction} = require('../parser');
const erapijs = require('@ercorp/er-api-js');
const {getInspections} = erapijs.apiv2.inspections;
const columnify = require('columnify');
const {splitParams, addParamIfPresent, formatFiltered} = require('../util');

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
                console.log(formatFiltered(data.inspections, [
                    'inspectionID',
                    'inspectorUserID',
                    'occupancyID',
                    'inspectionDate',
                    'inspectionDateDone',
                    'locked',
                    'inspectionType',
                    'formID',
                    'rowVersion'
                ], columnify, 'No inspections returned.'));
                return data.inspections;
            });
        }
    });
};

module.exports = {
    addV2Inspections
};