const axios = require('axios');
const {getAccessToken} = require('../auth/store');
const env = {
    API: 'https://preprodapi.emergencyreporting.com'
};

const getMyUser = () => getAccessToken().then(accessToken => axios({
    url: env.API + '/V1/users/me',
    method: 'get',
    headers: {
        Authorization: accessToken
    }
}).then(response => response.data));

module.exports = {
    getMyUser
};
