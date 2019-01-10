let filename = '';
const argv = require('yargs').argv

if (argv.file) {
  console.log('Plunder more riffiwobbles!')
  filename = `./${argv.file}`;
} 
const events = require('fs').readFileSync(filename, 'utf8')

const DevtoolsTimelineModel = require('devtools-timeline-model');
// events can be either a string of the trace data or the JSON.parse'd equivalent
const model = new DevtoolsTimelineModel(events)
const results = model.frameModel();

// Results should be viewed using something like devtool.
console.log(results);