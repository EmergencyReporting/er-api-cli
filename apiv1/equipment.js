const {addFunction} = require('../parser');
const {getAllEquipment} = require('@ercorp/er-api-js/apiv1/equipment');
const columnify = require('columnify');
const {splitParams, addParamIfPresent} = require('../util');

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
                if (data.equipment && data.equipment.length > 0) {
                    const equipmentSummaries = data
                        .equipment
                        .map(({equipmentID, inService, categoryID, equipmentType, rowVersion}) => ({equipmentID, inService, categoryID, equipmentType, rowVersion}));
                    console.log(columnify(equipmentSummaries));
                } else {
                    console.log('No equipment returned.');
                };
                return data;
            });
        }
    });
};

module.exports = {
    addV1Equipment
}