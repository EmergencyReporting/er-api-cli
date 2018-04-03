const {addFunction} = require('../parser');
const {getApparatuses, getApparatus} = require('@ercorp/er-api-js/apiv2/apparatus');
const columnify = require('columnify');

const addV2Apparatus = () => {
    addFunction({
        command: 'v2Apparatuses',
        cmdRegEx: /^(.*)$/,
        description: 'Gets a list of apparatus. Uses the optional format offset|limit|filter|orderby|r' +
                'owVersionDefaults to 5 apparatus.',
        cb: params => {
            const splitParams = (params[1] || '').split('|');
            let queryParams = {};
            if (splitParams[0]) {
                queryParams.offset = splitParams[0];
            }
            queryParams.limit = parseInt(splitParams[1] || '5', 10);

            if (splitParams[2]) {
                queryParams.filter = splitParams[2];
            }
            if (splitParams[3]) {
                queryParams.orderby = splitParams[3];
            }
            if (splitParams[4]) {
                queryParams.rowVersion = splitParams[4];
            }

            return getApparatuses(queryParams).then(data => {
                if (data.apparatus && data.apparatus.length > 0) {
                    const apparatusSummaries = data
                        .apparatus
                        .map(({
                            departmentApparatusID,
                            apparatusID,
                            apparatusOwnership,
                            inService,
                            dateInService,
                            rowVersion
                        }) => ({
                            departmentApparatusID,
                            apparatusID,
                            apparatusOwnership,
                            inService,
                            dateInService,
                            rowVersion
                        }));
                    console.log(columnify(apparatusSummaries));
                } else {
                    console.log('No Apparatus returned.');
                };
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
};

module.exports = {
    addV2Apparatus
};