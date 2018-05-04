const {addFunction} = require('../parser');
const erapijs = require('@ercorp/er-api-js');
const {getOccupancies} = erapijs.apiv1.occupancies;
const columnify = require('columnify');
const {splitParams, addParamIfPresent, formatFiltered} = require('../util');

module.exports = {
    addV1Occupancies: () => addFunction({
        command: 'v1Occupancies',
        cmdRegEx: /^(.*)$/,
        description: 'Gets all occupancies. Optional parameters follow the format: offset|limit|filter' +
                '|changesSince. Defaults to 5 occupancies.',
        cb: params => {
            const sp = splitParams(params[1]);
            let queryParams = {};
            addParamIfPresent(queryParams, sp, 'offset', 0);
            queryParams.limit = parseInt(sp[1] || '5', 10);
            addParamIfPresent(queryParams, sp, 'filter', 2);
            addParamIfPresent(queryParams, sp, 'changesSince', 3);

            return getOccupancies(queryParams).then(data => {
                console.log(formatFiltered(data.occupancies, [
                    'occupancyID',
                    'name',
                    'userOccupancyID',
                    'rowVersion',
                    'tenantTypeID',
                    'rowVersion'
                ], columnify, 'No occupancies returned.'));
                return data.occupancies;
            });
        }
    })
}