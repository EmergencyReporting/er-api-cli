const {addFunction} = require('../parser');
const erapijs = require('@ercorp/er-api-js');
const {getAllEquipment} = erapijs.apiv1.equipment;
const columnify = require('columnify');
const {splitParams, addParamIfPresent, formatFiltered} = require('../util');

const addV1Equipment = () => {
    addFunction({
        command: 'v1Equips',
        cmdRegEx: /^(.*)$/,
        description: 'Gets all equipment. Uses the optional format offset|limit|filter|showArchived|ch' +
                'angesSince|rowVersion. Defaults to 5 equipment.',
        cb: params => {
            const sp = splitParams(params[1]);
            let queryParams = {};
            addParamIfPresent(queryParams, sp, 'offset', 0);
            queryParams.limit = parseInt(sp[1] || '5', 10);
            addParamIfPresent(queryParams, sp, 'filter', 2);
            addParamIfPresent(queryParams, sp, 'showArchived', 3);
            addParamIfPresent(queryParams, sp, 'changesSince', 4);
            addParamIfPresent(queryParams, sp, 'rowVersion', 5);

            return getAllEquipment(queryParams).then(data => {
                console.log(formatFiltered(data.equipment, [
                    'equipmentID', 'inService', 'categoryID', 'equipmentType', 'rowVersion'
                ], columnify, 'No equipment returned.'));
                return data.equipment;
            });
        }
    });
};

module.exports = {
    addV1Equipment
}