# Commands

See the ```help``` command for descriptions of each command.

Sample output from running the help command shown below.

```
COMMAND         DESCRIPTION

SetClientID     Sets the Client ID

SetClientSecret

SetUser

SetPassword

AuthTime

PrintAuth

LoadAuth

SaveAuth

v1User          Gets a specific users information by id

v1UsersMe       Gets the logged in users information.

v1Users         Gets the list of all users. Optionally provide the number of users to get. Defaults to 5.
v1Apparatuses   Gets the list of all apparatus. Optionally provide the maximum number to get. Defaults to maximum of 5.
v1Stations      Gets the list of all Stations. Optionally provide the number of users to get. Defaults to 5.
v2Events        Gets a list of Events. Uses the optional format search|offset|limit|filter|orderby|rowVersionDefaults to 5 events.
v2EventsPeoples Gets a list of People for events. Uses the optional format offset|limit|filter|orderby|rowVersionDefaults. Defaults to 5 event people.
v2Event         Gets an event by event id. Can optionally include rowVersion.

v2EventPeoples  Gets the people attending an event by event id.

v2Rosters       Gets a list of rosters. Optionally provide the number of rosters to get and a filter by clause. Defaults to 5 rosters without a filter.
v2Inspections   Gets a list of Inspections. Uses the optional format offset|limit|filter|orderby|rowVersionDefaults to 5 events.
QUIT            Exits the application

SetUris         Sets the uris used by ER Auth and API calls. Format: "<API_URL> <AUTH_URL>"
help            Shows the list of supported commands.
```
