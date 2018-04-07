const reduce = require('lodash.reduce');
const {addFunction} = require('../parser');
const {getMyUser, getUsers, getUser} = require('@ercorp/er-api-js/apiv1/users');
const {getStations} = require('@ercorp/er-api-js/apiv1/stations');
const {getApparatuses} = require('@ercorp/er-api-js/apiv1/apparatus');
const {addV1Equipment} = require('./equipment');
const columnify = require('columnify');

const usersFormatting = users => Promise.resolve(reduce(users, (acc, {userID, fullName, email, primaryEmail, login}) => {
    acc.push({
        Name: fullName,
        UserID: userID,
        Login: login || '__NONE__',
        Email: email || primaryEmail || '__NONE__'
    });
    return acc;
}, [])).then(entries => columnify(entries, ['Name', 'UserID', 'Login', 'Email']));

const addV1Functions = () => {
    addV1Equipment();

    addFunction({
        command: 'v1User',
        description: 'Gets a specific users information by id',
        cmdRegEx: /^(\d+)$/,
        cb: params => getUser(params[1]).then(data => {
            console.log(columnify(data.user));
            return true;
        })
    });
    addFunction({
        command: 'v1UsersMe',
        description: 'Gets the logged in users information.',
        cb: () => getMyUser().then(data => {
            console.log(columnify(data.user));
            return true;
        })
    });
    addFunction({
        command: 'v1Users',
        cmdRegEx: /^(\d*)$/,
        description: 'Gets the list of all users. Optionally provide the number of users to get. Defau' +
                'lts to 5.',
        cb: params => {
            const limit = parseInt(params[1] || '5', 10);
            return getUsers({limit})
                .then(data => usersFormatting(data.users))
                .then(formattedContent => {
                    console.log(formattedContent);
                    return true;
                })
        }
    });
    addFunction({
        command: 'v1Apparatuses',
        cmdRegEx: /^(\d*)$/,
        description: 'Gets the list of all apparatus. Optionally provide the maximum number to get. De' +
                'faults to maximum of 5.',
        cb: params => {
            const limit = parseInt(params[1] || '5', 10);
            return getApparatuses({limit}).then(data => {
                if (data.apparatuses) {
                    const apparatusSummaries = reduce(data.apparatuses, (acc, {
                        departmentApparatusID,
                        apparatusID,
                        stationName,
                        stationNumber,
                        vehicleNumber,
                        archive
                    }) => {
                        acc.push({
                            apparatusID,
                            departmentApparatusID,
                            stationName,
                            stationNumber,
                            vehicleNumber,
                            archive
                        });
                        return acc;
                    }, []);
                    console.log(columnify(apparatusSummaries));
                } else {
                    console.log('No Apparatus returned.');
                }
                return data;
            })
        }
    });
    addFunction({
        command: 'v1Stations',
        cmdRegEx: /^(\d*)$/,
        description: 'Gets the list of all Stations. Optionally provide the number of users to get. De' +
                'faults to 5.',
        cb: params => {
            const limit = parseInt(params[1] || '5', 10);
            return getStations({limit}).then(data => {
                if (data.stations) {
                    const stationsSummaries = reduce(data.stations, (acc, {stationID, stationNumber, stationName}) => {
                        acc.push({stationID, stationNumber, stationName});
                        return acc;
                    }, []);
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
    addV1Functions
};