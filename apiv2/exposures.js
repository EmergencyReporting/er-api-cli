const {addFunction} = require('../parser');
const erapijs = require('@ercorp/er-api-js');
const {
    getAllExposureNarratives,
    getExposureNarratives,
    getAllIncidentExposures,
    getAllExposuresLocations,
    getAllExposuresApparatuses,
    getAllExposuresFires
} = erapijs.apiv2.exposures;
const columnify = require('columnify');
const {splitParams, addParamIfPresent, formatFiltered} = require('../util');

const addV2ExposuresFunctions = () => {
    addFunction({
        command: 'v2ExposuresNarratives',
        cmdRegEx: /^(.*)$/,
        description: 'Gets a list of Exposure Narratives',
        cb: params => {
            const sp = splitParams(params[1]);
            let queryParams = {};
            addParamIfPresent(queryParams, sp, 'offset', 0);
            queryParams.limit = parseInt(sp[1] || '5', 10);
            addParamIfPresent(queryParams, sp, 'filter', 2);
            addParamIfPresent(queryParams, sp, 'orderby', 3);
            addParamIfPresent(queryParams, sp, 'rowVersion', 4);

            return getAllExposureNarratives(queryParams).then(data => {
                console.log(formatFiltered(data.narratives, [
                    'exposureID',
                    'narrativeID',
                    'narrativeTitle',
                    'narrative',
                    'isCadNarrative',
                    'archive',
                    'rowVersion'
                ], columnify, 'No Narratives returned.'));
                return data.narratives;
            });
        }
    });
    addFunction({
        command: 'v2ExposureNararatives',
        cmdRegEx: /^(\d+)$/,
        description: 'Gets all narratives assigned to an incident exposure.',
        cb: params => {
            const exposureID = parseInt(params[1], 10);
            return getExposureNarratives(exposureID).then(data => {
                if (data.narratives) {
                    console.log(columnify(data.narratives));
                } else {
                    console.log('No narratives for exposure.');
                }
                return data;
            });
        }
    });
    addFunction({
        command: 'v2Exposures',
        cmdRegEx: /^(.*)$/,
        description: 'Get all exposures on incidents.',
        cb: params => {
            const sp = splitParams(params[1]);
            let queryParams = {};
            addParamIfPresent(queryParams, sp, 'offset', 0);
            queryParams.limit = parseInt(sp[1] || '5', 10);
            addParamIfPresent(queryParams, sp, 'filter', 2);
            addParamIfPresent(queryParams, sp, 'orderby', 3);
            addParamIfPresent(queryParams, sp, 'rowVersion', 4);

            return getAllIncidentExposures(queryParams).then(data => {
                if (data.exposures && data.exposures.length) {
                    console.log(columnify(data.exposures));
                } else {
                    console.log('No exposures returned.');
                };
            });
        }
    });
    addFunction({
        command: 'v2ExposuresLocations',
        cmdRegEx: /^(.*)$/,
        description: 'Get all exposures locations.',
        cb: params => {
            const sp = splitParams(params[1]);
            let queryParams = {};
            addParamIfPresent(queryParams, sp, 'offset', 0);
            queryParams.limit = parseInt(sp[1] || '5', 10);
            addParamIfPresent(queryParams, sp, 'filter', 2);
            addParamIfPresent(queryParams, sp, 'orderby', 3);
            addParamIfPresent(queryParams, sp, 'rowVersion', 4);

            return getAllExposuresLocations(queryParams).then(data => {
                if (data.location && data.location.length) {
                    console.log(columnify(data.location));
                } else {
                    console.log('No exposure locations returned.');
                };
            });
        }
    });
    addFunction({
        command: 'v2ExposuresApparatuses',
        cmdRegEx: /^(.*)$/,
        description: 'Gets apparatuses assigned to exposures.',
        cb: params => {
            const sp = splitParams(params[1]);
            let queryParams = {};
            addParamIfPresent(queryParams, sp, 'offset', 0);
            queryParams.limit = parseInt(sp[1] || '5', 10);
            addParamIfPresent(queryParams, sp, 'filter', 2);
            addParamIfPresent(queryParams, sp, 'orderby', 3);
            addParamIfPresent(queryParams, sp, 'rowVersion', 4);
            return getAllExposuresApparatuses(queryParams).then(data => {
                if (data.apparatuses && data.apparatuses.length) {
                    console.log(columnify(apparatuses));
                } else {
                    console.log('No exposure apparatuses returned.');
                };
                return data.apparatuses;
            });
        }
    });
};

module.exports = {
    addV2ExposuresFunctions
};