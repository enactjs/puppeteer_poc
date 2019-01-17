// const events = require('fs')
const DevtoolsTimelineModel = require('devtools-timeline-model');

module.exports = (filename) => {
    const events = require('fs').readFileSync(filename, 'utf8');
    // events can be either a string of the trace data or the JSON.parse'd equivalent
    const model = new DevtoolsTimelineModel(events)
    const results = model.frameModel();

    let counter = 0;
    let fps = {};
    const avgDuration = results._frames.reduce((accumulator, currentValue) => {
        if (!currentValue.idle) {
            counter += 1;
            if (1000 / currentValue.duration < 55) {
              fps[currentValue._mainFrameId] = 1000 / currentValue.duration;
            }
            return accumulator + currentValue.duration;
          } else {
            return accumulator;
        }
    }, 0) / counter;

    return {avgDuration, fps};
}