# Commands

See the ```help``` command for descriptions of each command.

Sample output from running the help command shown below.

```
COMMAND             DESCRIPTION

SetClientID         Sets the Client ID

SetClientSecret

SetUser

SetPassword

AuthTime

PrintAuth

LogoutAuth

v1Equips            Gets all equipment. Uses the optional format offset|limit|filter|showArchived|changesSince|rowVersion. Defaults to 5 equipment.

v1AccountsMe        Gets the logged in users account information.

v1User              Gets a specific users information by id

v1UsersMe           Gets the logged in users information.

v1Users             Gets the list of all users. Optionally provide the number of users to get. Defaults to 5.

v1Apparatuses       Gets the list of all apparatus. Optionally provide the maximum number to get. Defaults to maximum of 5.

v1Stations          Gets the list of all Stations. Optionally provide the number of users to get. Defaults to 5.

v2Events            Gets a list of Events. Uses the optional format search|offset|limit|filter|orderby|rowVersionDefaults to 5 events.

v2EventsPeoples     Gets a list of People for events. Uses the optional format offset|limit|filter|orderby|rowVersionDefaults. Defaults to 5 event people.
v2Event             Gets an event by event id. Can optionally include rowVersion.

v2EventPeoples      Gets the people attending an event by event id.

v2Apparatuses       Gets a list of apparatus. Uses the optional format offset|limit|filter|orderby|rowVersionDefaults to 5 apparatus.

v2Apparatus         Gets an apparatus by departmentApparatusID.

v2AllApparatusCrews Gets a list of crews on all apparatus. Uses the optional format offset|limit|filter|orderby|rowVersionDefaults to 5 apparatus.

v2AppMain           Gets a list of maintenaces for an apparatus. Uses the optional format offset|limit|filter|orderby|rowVersionDefaults to 5 apparatus.
v2Equips            Gets all equipment. Uses the optional format offset|limit|filter|orderby|rowVersion. Defaults to 5 apparatus.

v2Equip             Get a piece of equipment by equipmentID.
v2EquipMain         Gets a list of maintenances on equipment. Uses the optional format offset|limit|filter|orderby|rowVersionDefaults to 5 maintenances.
v2Rosters           Gets a list of rosters. Optionally provide the number of rosters to get and a filter by clause. Defaults to 5 rosters without a filter.v2Inspections       Gets a list of Inspections. Uses the optional format offset|limit|filter|orderby|rowVersionDefaults to 5 events.
QUIT                Exits the applicationSetUris             Sets the uris used by ER Auth and API calls. Format: "<API_URL> <AUTH_URL>"
help                Shows the list of supported commands.
```
