const {addFunction} = require('../parser');
const {getAllEquipment, getEquipment, getAllEquipmentMaintenances} = require('@ercorp/er-api-js/apiv2/equipment');
const columnify = require('columnify');
const {splitParams, addParamIfPresent} = require('../util');

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
                if (data.maintenance && data.maintenance.length > 0) {
                    const mainSummaries = data
                        .maintenance
                        .map(({maintenanceID, equipmentID, maintenanceTitle, maintenanceTypeID, rowVersion}) => ({maintenanceID, equipmentID, maintenanceTitle, maintenanceTypeID, rowVersion}));
                    console.log(columnify(mainSummaries));
                } else {
                    console.log('No equipment maintenance returned.');
                };
            });
        }
    });
};

module.exports = {
    addV2Equipment
};