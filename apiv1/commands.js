const {addFunction} = require('../parser');
const {getMyUser, getUsers} = require('./v1Services');

const addV1Functions = () => {
    addFunction({
        command: 'v1UsersMe',
        cb: () => getMyUser().then(data => {
            console.log(JSON.stringify(data));
            return true;
        })
    });
    addFunction({
        command: 'v1Users',
        cb: () => getUsers({limit: 1000}).then(data => {
            console.log(JSON.stringify(data));
            return true;
        })
    });
};

module.exports = {
    addV1Functions
};