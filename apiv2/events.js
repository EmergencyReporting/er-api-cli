const {addFunction} = require('../parser');
const {getEvents, getEventsPeoples, getEvent, getEventPeoples} = require('@ercorp/er-api-js/apiv2/events');
const columnify = require('columnify');
const {splitParams, addParamIfPresent} = require('../util');

const addV2EventFunctions = () => {
    addFunction({
        command: 'v2Events',
        cmdRegEx: /^(.*)$/,
        description: 'Gets a list of Events. Uses the optional format search|offset|limit|filter|order' +
                'by|rowVersionDefaults to 5 events.',
        cb: params => {
            const sp = splitParams(params[1]);
            let queryParams = {};
            addParamIfPresent(queryParams, sp, 'search', 0);
            addParamIfPresent(queryParams, sp, 'offset', 1);
            queryParams.limit = parseInt(sp[2] || '5', 10);
            addParamIfPresent(queryParams, sp, 'filter', 3);
            addParamIfPresent(queryParams, sp, 'orderby', 4);
            addParamIfPresent(queryParams, sp, 'rowVersion', 5);

            return getEvents(queryParams).then(data => {
                if (data.events && data.events.length) {
                    const eventSummaries = data
                        .events
                        .map(({eventsID, eventDate, eventEndDate, eventName, rowVersion}) => ({eventsID, eventDate, eventEndDate, eventName, rowVersion}));
                    console.log(columnify(eventSummaries));
                } else {
                    console.log('No Events returned.');
                };
            });
        }
    });
    addFunction({
        command: 'v2EventsPeoples',
        cmdRegEx: /^(.*)$/,
        description: 'Gets a list of People for events. Uses the optional format offset|limit|filter|o' +
                'rderby|rowVersionDefaults. Defaults to 5 event people.',
        cb: params => {
            const sp = splitParams(params[1]);
            let queryParams = {};
            addParamIfPresent(queryParams, sp, 'offset', 0);
            queryParams.limit = parseInt(sp[1] || '5', 10);
            addParamIfPresent(queryParams, sp, 'filter', 2);
            addParamIfPresent(queryParams, sp, 'orderby', 3);
            addParamIfPresent(queryParams, sp, 'rowVersion', 4);

            return getEventsPeoples(queryParams).then(data => {
                if (data.eventPeople && data.eventPeople.length) {
                    const eventPeoples = data
                        .eventPeople
                        .map(({
                            eventID,
                            eventPersonID,
                            userID,
                            firstName,
                            lastName,
                            rowVersion
                        }) => ({
                            eventID,
                            eventPersonID,
                            userID,
                            firstName,
                            lastName,
                            rowVersion
                        }));
                    console.log(columnify(eventPeoples));
                } else {
                    console.log('No Events Peoples returned.');
                };
            });
        }
    });
    addFunction({
        command: 'v2Event',
        cmdRegEx: /^(\d+)$/,
        description: 'Gets an event by event id. Can optionally include rowVersion.',
        cb: params => {
            const eventId = parseInt(params[1], 10);
            return getEvent(eventId).then(data => {
                if (data.event) {
                    console.log(columnify(data.event));
                } else {
                    console.log('No event info');
                }
                return data;
            });
        }
    });
    addFunction({
        command: 'v2EventPeoples',
        cmdRegEx: /^(\d+)$/,
        description: 'Gets the people attending an event by event id.',
        cb: params => {
            const eventId = parseInt(params[1], 10);
            return getEventPeoples(eventId).then(data => {
                if (data.eventPeople && data.eventPeople.length) {
                    const eventPeoples = data
                        .eventPeople
                        .map(({
                            eventPersonID,
                            userID,
                            firstName,
                            lastName,
                            hours,
                            points,
                            rowVersion
                        }) => ({
                            eventPersonID,
                            userID,
                            firstName,
                            lastName,
                            hours,
                            points,
                            rowVersion
                        }));
                    console.log(columnify(eventPeoples));
                } else {
                    console.log('No Events Peoples returned.');
                };
                return data;
            });
        }
    });
};

module.exports = {
    addV2EventFunctions
};