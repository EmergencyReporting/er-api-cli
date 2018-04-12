const {addFunction} = require('../parser');
const {getStations} = require('@ercorp/er-api-js/apiv1/stations');
const columnify = require('columnify');

const addV1Stations = () => {
    addFunction({
        command: 'v1Stations',
        cmdRegEx: /^(\d*)$/,
        description: 'Gets the list of all Stations. Optionally provide the number of users to get. De' +
                'faults to 5.',
        cb: params => {
            const limit = parseInt(params[1] || '5', 10);
            return getStations({limit}).then(data => {
                if (data.stations && data.stations.length) {
                    const stationsSummaries = data
                        .stations
                        .map(({stationID, stationNumber, stationName}) => ({stationID, stationNumber, stationName}));
                    console.log(columnify(stationsSummaries));
                } else {
                    console.log('No stations returned.');
                };
                return data;
            });
        }
    });
};

module.exports = {
    addV1Stations
};