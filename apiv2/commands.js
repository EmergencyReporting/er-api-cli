const columnify = require('columnify');
const {addV2Apparatus} = require('./apparatus');
const {addV2EventFunctions} = require('./events');
const {addV2Equipment} = require('./equipment');
const {addV2ExposuresFunctions} = require('./exposures');
const {addV2Inspections} = require('./inspections');
const {addV2Rosters} = require('./rosters');

const addV2Functions = () => {
    addV2EventFunctions();
    addV2Apparatus();
    addV2Equipment();
    addV2ExposuresFunctions();
    addV2Inspections();
    addV2Rosters();
};

module.exports = {
    addV2Functions
};