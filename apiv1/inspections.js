const {addFunction} = require('../parser');
const erapijs = require('@ercorp/er-api-js');
const {getOccupancyInspections} = erapijs.apiv1.inspections;
const columnify = require('columnify');
const {splitParams, addParamIfPresent, formatFiltered} = require('../util');

module.exports = {
    addV1Inspections: () => addFunction({
        command: 'v1OccupancyInspections',
        cmdRegEx: /^(\d+) (.*)$/,
        description: 'Gets all inspections by occupancyID. First parameter must be an occupancyID, add' +
                'itional optional parameters following the following format: offset|limit|changes' +
                'Since. Defaults to 5 inspections.',
        cb: params => {
            const occupancyID = parseInt(params[1], 10);
            const sp = splitParams(params[2]);
            let queryParams = {};
            addParamIfPresent(queryParams, sp, 'offset', 0);
            queryParams.limit = parseInt(sp[1] || '5', 10);
            addParamIfPresent(queryParams, sp, 'changesSince', 2);

            return getOccupancyInspections(occupancyID, queryParams).then(data => {
                console.log(formatFiltered(data.occupancyInspections, [
                    'inspectionsID',
                    'formID',
                    'inspectorUserID',
                    'inspectionDate',
                    'inspectionDateDone',
                    'rowVersion'
                ], columnify, 'No inspections returned.'));
                return data.occupancyInspections;
            });
        }
    })
}