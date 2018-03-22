const {addFunction} = require('../parser');
const {getMyUser} = require('./v1Services');

const addV1Functions = () => {
    addFunction('v1UsersMe', false, () => getMyUser().then(data => {
        console.log(JSON.stringify(data));
        return true;
    }));
};

module.exports = {
    addV1Functions
};