module.exports = {
    startTime: () => process.hrtime(),
    timeElapsed: startTime => {
        const elapsed = process.hrtime(startTime);
        const seconds = (elapsed[0] + (elapsed[1] / 1e9)).toFixed(3);
        return seconds;
    },

    splitParams: input => (input || '').split('|'),
    addParamIfPresent: (paramTarget, paramSource, targetName, paramIndex) => {
        if (paramSource[paramIndex]) {
            paramTarget[targetName] = paramSource[paramIndex];
        }
    },

    formatFiltered: (coll, fields, successFormatter, failedMessage) => {
        let output = failedMessage;
        if (coll && coll.length) {
            const filteredCol = coll.map(entry => {
                let obj = {};
                fields.forEach(fieldName => {
                    obj[fieldName] = entry[fieldName];
                });
                return obj;
            });
            output = successFormatter
                ? successFormatter(filteredCol)
                : filteredCol;
        }
        return output;
    }
};