const reduce = require('lodash.reduce');
const {addFunction} = require('../parser');
const {getMyUser, getUsers, getUser} = require('./v1Services');
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
};

module.exports = {
    addV1Functions
};