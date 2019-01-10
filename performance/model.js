let filename = '';
const argv = require('yargs').argv

if (argv.file) {
  filename = `./${argv.file}`;
} 
const events = require('fs').readFileSync(filename, 'utf8')

const DevtoolsTimelineModel = require('devtools-timeline-model');
// events can be either a string of the trace data or the JSON.parse'd equivalent
const model = new DevtoolsTimelineModel(events)
const results = model.frameModel();

let counter = 0;
const avgDuration = results._frames.reduce((accumulator, currentValue) => {
    if (!currentValue.idle) {
        counter += 1;
        return accumulator + currentValue.duration;
    } else {
        return accumulator;
    }
}, 0) / counter;

// Results should be viewed using something like devtool.
// console.log(results);
console.log(`Average FPS: ${1000 / avgDuration}`);