const {addFunction} = require('../parser');
const erapijs = require('@ercorp/er-api-js');
const {getStations} = erapijs.apiv1.stations;
const columnify = require('columnify');
const {formatFiltered} = require('../util');

const addV1Stations = () => {
    addFunction({
        command: 'v1Stations',
        cmdRegEx: /^(\d*)$/,
        description: 'Gets the list of all Stations. Optionally provide the number of users to get. De' +
                'faults to 5.',
        cb: params => {
            const limit = parseInt(params[1] || '5', 10);
            return getStations({limit}).then(data => {
                console.log(formatFiltered(data.stations, [
                    'stationID', 'stationNumber', 'stationName'
                ], columnify, 'No stations returned.'));
                return data.stations;
            });
        }
    });
};

module.exports = {
    addV1Stations
};