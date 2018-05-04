const {addFunction} = require('../parser');
const erapijs = require('@ercorp/er-api-js');
const {getMyAccount} = erapijs.apiv1.accounts;
const {addV1Apparatus} = require('./apparatus');
const {addV1Equipment} = require('./equipment');
const {addV1Occupancies} = require('./occupancies');
const {addV1Inspections} = require('./inspections');
const {addV1Users} = require('./users');
const {addV1Stations} = require('./stations');
const columnify = require('columnify');

const addV1Functions = () => {
    addV1Users();
    addV1Stations();
    addV1Apparatus();
    addV1Equipment();
    addV1Inspections();
    addV1Occupancies();
    addFunction({
        command: 'v1AccountsMe',
        description: 'Gets the logged in users account information.',
        cb: params => getMyAccount().then(data => {
            console.log(columnify(data.account));
            return true;
        })
    });
};

module.exports = {
    addV1Functions
};