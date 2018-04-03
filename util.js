const startTime = () => process.hrtime();

function timeElapsed(startTime) {
    const elapsed = process.hrtime(startTime);
    const seconds = (elapsed[0] + (elapsed[1] / 1e9)).toFixed(3);
    return seconds;
}

module.exports = {
    startTime,
    timeElapsed
};