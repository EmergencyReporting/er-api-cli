const {addFunction} = require('../parser');
const {getApparatuses} = require('@ercorp/er-api-js/apiv1/apparatus');
const columnify = require('columnify');

const addV1Apparatus = () => {
    addFunction({
        command: 'v1Apparatuses',
        cmdRegEx: /^(\d*)$/,
        description: 'Gets the list of all apparatus. Optionally provide the maximum number to get. De' +
                'faults to maximum of 5.',
        cb: params => {
            const limit = parseInt(params[1] || '5', 10);
            return getApparatuses({limit}).then(data => {
                if (data.apparatuses && data.apparatuses.length) {
                    const apparatusSummaries = data
                        .apparatuses
                        .map(({
                            departmentApparatusID,
                            apparatusID,
                            stationName,
                            stationNumber,
                            vehicleNumber,
                            archive
                        }) => ({
                            apparatusID,
                            departmentApparatusID,
                            stationName,
                            stationNumber,
                            vehicleNumber,
                            archive
                        }));
                    console.log(columnify(apparatusSummaries));
                } else {
                    console.log('No Apparatus returned.');
                }
                return data;
            })
        }
    });
};

module.exports = {
    addV1Apparatus
};