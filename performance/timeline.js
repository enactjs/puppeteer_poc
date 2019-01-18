let filename = '';
const argv = require('yargs').argv;

if (argv.file) {
  filename = `./${argv.file}`;
}
const events = require('fs').readFileSync(filename, 'utf8');

const DevtoolsTimelineModel = require('devtools-timeline-model');
// events can be either a string of the trace data or the JSON.parse'd equivalent
const model = new DevtoolsTimelineModel(events);

const results = model.timelineModel();

// regex to retrieve the appropriate sample (ex: ./performance/traces/picker_20190116165502.json > picker)
const sample = filename.match(/[^\\/]+\.[^\\/]+$/)[0].split('_')[0];
// build the component name
const component = sample.slice(0, 1).toUpperCase() + sample.slice(1);
// convert Map to Array in order to access data via index key
const userTiming = Array.from(results._namedTracks.values())[0];
// user timing data
const timingEvents = userTiming.asyncEvents;

// filter our component update data
const updateData = timingEvents.filter((item, index) => (
	// Picker contains a sub-component also named 'Picker', which we don't want to calculate
	// so we isolate the parent Picker (wrapped by MarqueeController [update] > MarqueeController.getChildContext)
	item.name === `⚛ ${component} [update]` && timingEvents[index-2].name === `⚛ MarqueeController [update]`
));
const updates = updateData.length;
// calculate average update timing
const updateTiming = updateData.reduce((accumulator, currentValue) => accumulator + currentValue.duration, 0) / updates;
// retrieve mount timing
const mountTiming = timingEvents.find((item) => item.name === `⚛ ${component} [mount]`).duration;

// Results should be viewed using something like devtool.
// console.log(results);

console.log(`Mount timing: ${mountTiming}`);
console.log(`Update timing (average): ${updateTiming}`);
