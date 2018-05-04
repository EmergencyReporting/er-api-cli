const {addFunction} = require('../parser');
const erapijs = require('@ercorp/er-api-js');
const {getAllEquipment, getEquipment, getAllEquipmentMaintenances} = erapijs.apiv2.equipment;
const columnify = require('columnify');
const {splitParams, addParamIfPresent, formatFiltered} = require('../util');

const addV2Equipment = () => {
    addFunction({
        command: 'v2Equips',
        cmdRegEx: /^(.*)$/,
        description: 'Gets all equipment. Uses the optional format offset|limit|filter|orderby|rowVers' +
                'ion. Defaults to 5 apparatus.',
        cb: params => {
            const sp = splitParams(params[1]);
            let queryParams = {};
            addParamIfPresent(queryParams, sp, 'offset', 0);
            queryParams.limit = parseInt(sp[1] || '5', 10);
            addParamIfPresent(queryParams, sp, 'filter', 2);
            addParamIfPresent(queryParams, sp, 'orderby', 3);
            addParamIfPresent(queryParams, sp, 'rowVersion', 4);

            return getAllEquipment(queryParams).then(data => {
                console.log(formatFiltered(data.equipment, [
                    'equipmentID', 'inService', 'categoryID', 'equipmentType', 'rowVersion'
                ], columnify, 'No equipment returned.'));
                return data.equipment;
            });
        }
    });

    addFunction({
        command: 'v2Equip',
        cmdRegEx: /^(\d+)$/,
        description: 'Get a piece of equipment by equipmentID.',
        cb: params => {
            const equipmentID = parseInt(params[1], 10);
            return getEquipment(equipmentID).then(data => {
                if (data.equipment) {
                    console.log(columnify(data.equipment));
                } else {
                    console.log('No equipment info');
                }
                return data;
            });
        }
    });

    addFunction({
        command: 'v2EquipMain',
        cmdRegEx: /^(.*)$/,
        description: 'Gets a list of maintenances on equipment. Uses the optional format offset|limit|' +
                'filter|orderby|rowVersionDefaults to 5 maintenances.',
        cb: params => {
            const sp = splitParams(params[1]);
            let queryParams = {};
            addParamIfPresent(queryParams, sp, 'offset', 0);
            queryParams.limit = parseInt(sp[1] || '5', 10);
            addParamIfPresent(queryParams, sp, 'filter', 2);
            addParamIfPresent(queryParams, sp, 'orderby', 3);
            addParamIfPresent(queryParams, sp, 'rowVersion', 4);

            return getAllEquipmentMaintenances(queryParams).then(data => {
                console.log(formatFiltered(data.maintenance, [
                    'maintenanceID', 'equipmentID', 'maintenanceTitle', 'maintenanceTypeID', 'rowVersion'
                ], columnify, 'No equipment maintenance returned.'));
                return data.maintenance;
            });
        }
    });
};

module.exports = {
    addV2Equipment
};