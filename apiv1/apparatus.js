const {addFunction} = require('../parser');
const erapijs = require('@ercorp/er-api-js');
const columnify = require('columnify');
const {formatFiltered} = require('../util');
const {getApparatuses} = erapijs.apiv1.apparatus;

const addV1Apparatus = () => {
    addFunction({
        command: 'v1Apparatuses',
        cmdRegEx: /^(\d*)$/,
        description: 'Gets the list of all apparatus. Optionally provide the maximum number to get. De' +
                'faults to maximum of 5.',
        cb: params => {
            const limit = parseInt(params[1] || '5', 10);
            return getApparatuses({limit}).then(data => {
                console.log(formatFiltered(data.apparatuses, [
                    'departmentApparatusID',
                    'apparatusID',
                    'stationName',
                    'stationNumber',
                    'vehicleNumber',
                    'archive'
                ], columnify, 'No Apparatus returned.'));
                return data.apparatuses;
            })
        }
    });
};

module.exports = {
    addV1Apparatus
};