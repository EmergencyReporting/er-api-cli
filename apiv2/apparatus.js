const {addFunction} = require('../parser');
const erapijs = require('@ercorp/er-api-js');
const {getAllApparatus, getApparatus, getAllApparatusCompartments, getAllApparatusCrews, getApparatusMaintenances} = erapijs.apiv2.apparatus;
const columnify = require('columnify');
const {splitParams, addParamIfPresent, formatFiltered} = require('../util');

const addV2Apparatus = () => {
    addFunction({
        command: 'v2Apparatuses',
        cmdRegEx: /^(.*)$/,
        description: 'Gets a list of apparatus. Uses the optional format offset|limit|filter|orderby|r' +
                'owVersionDefaults to 5 apparatus.',
        cb: params => {
            const sp = splitParams(params[1]);
            let queryParams = {};
            addParamIfPresent(queryParams, sp, 'offset', 0);
            queryParams.limit = parseInt(sp[1] || '5', 10);
            addParamIfPresent(queryParams, sp, 'filter', 2);
            addParamIfPresent(queryParams, sp, 'orderby', 3);
            addParamIfPresent(queryParams, sp, 'rowVersion', 4);

            return getAllApparatus(queryParams).then(data => {
                console.log(formatFiltered(data.apparatus, [
                    'departmentApparatusID',
                    'apparatusID',
                    'apparatusOwnership',
                    'inService',
                    'dateInService',
                    'rowVersion'
                ], columnify, 'No Apparatus returned.'));
                return data.apparatus;
            });
        }
    });

    addFunction({
        command: 'v2Apparatus',
        cmdRegEx: /^(\d+)$/,
        description: 'Gets an apparatus by departmentApparatusID.',
        cb: params => {
            const departmentApparatusID = parseInt(params[1], 10);
            return getApparatus(departmentApparatusID).then(data => {
                if (data.apparatus) {
                    console.log(columnify(data.apparatus));
                } else {
                    console.log('No apparatus info');
                }
                return data;
            });
        }
    });

    addFunction({
        command: 'v2AllApparatusCrews',
        cmdRegEx: /^(.*)$/,
        description: 'Gets a list of crews on all apparatus. Uses the optional format offset|limit|fil' +
                'ter|orderby|rowVersionDefaults to 5 apparatus.',
        cb: params => {
            const sp = splitParams(params[1]);
            let queryParams = {};
            addParamIfPresent(queryParams, sp, 'offset', 0);
            queryParams.limit = parseInt(sp[1] || '5', 10);
            addParamIfPresent(queryParams, sp, 'filter', 2);
            addParamIfPresent(queryParams, sp, 'orderby', 3);
            addParamIfPresent(queryParams, sp, 'rowVersion', 4);

            return getAllApparatusCrews(queryParams).then(data => {
                console.log(formatFiltered(data.crews, [
                    'crewID', 'departmentApparatusID', 'rowVersion'
                ], columnify, 'No crews returned.'));
                return data.crews;
            });
        }
    });

    addFunction({
        command: 'v2AppMain',
        cmdRegEx: /^(\d+)(.*)$/,
        description: 'Gets a list of maintenaces for an apparatus. Uses the optional format offset|lim' +
                'it|filter|orderby|rowVersionDefaults to 5 apparatus.',
        cb: params => {
            const departmentApparatusID = parseInt(params[1], 10);
            const sp = splitParams(params[2]);
            let queryParams = {};
            addParamIfPresent(queryParams, sp, 'offset', 0);
            queryParams.limit = parseInt(sp[1] || '5', 10);
            addParamIfPresent(queryParams, sp, 'filter', 2);
            addParamIfPresent(queryParams, sp, 'orderby', 3);
            addParamIfPresent(queryParams, sp, 'rowVersion', 4);

            return getApparatusMaintenances(departmentApparatusID, queryParams).then(data => {
                console.log(formatFiltered(data.maintenance, [
                    'maintenanceID',
                    'requestedByUserID',
                    'requestMaintenanceDate',
                    'scheduledDate',
                    'scheduledByUserID',
                    'doneByUserID',
                    'rowVersion'
                ], columnify, 'No maintenance for apparatus returned.'));
                return data.maintenance;
            });
        }
    });
};

module.exports = {
    addV2Apparatus
};