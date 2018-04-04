module.exports = {
    splitParams: input => (input || '').split('|'),

    addParamIfPresent: (paramTarget, paramSource, targetName, paramIndex) => {
        if (paramSource[paramIndex]) {
            paramTarget[targetName] = paramSource[paramIndex];
        }
    }
};