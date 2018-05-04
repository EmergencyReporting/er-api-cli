const {addFunction} = require('../parser');
const erapijs = require('@ercorp/er-api-js');
const {getMyUser, getUsers, getUser} = erapijs.apiv1.users;
const columnify = require('columnify');

const usersFormatting = users => Promise.resolve(users.map(({userID, fullName, email, primaryEmail, login}) => ({
    Name: fullName,
    UserID: userID,
    Login: login || '__NONE__',
    Email: email || primaryEmail || '__NONE__'
}))).then(entries => columnify(entries, ['Name', 'UserID', 'Login', 'Email']));

const addV1Users = () => {
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
    addV1Users
};