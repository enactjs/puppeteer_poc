const fs = require('fs');
const DevtoolsTimelineModel = require('devtools-timeline-model');

const FPS = (filename) => {
	const events = fs.readFileSync(filename, 'utf8');
	const model = new DevtoolsTimelineModel(events);
	const results = model.frameModel();
	// const timeline = model.timelineModel();
	const bottomUp = model.bottomUp();
	// const topDown = model.topDown();
	// for (let index = 0; index < bottomUp.length; index++) {
		// console.log(bottomUp['_events'], results);
	// }
	// topDown['_events'].forEach((ev)=> {

	// 	console.log(ev.thread);
	// })
	// console.log(Object.keys(bottomUp));
	// debugger;
	for (let index = 0; index < results._frames.length; index++) {
		console.log(1000 / results._frames[index].duration);
	}
	

	const range = results._frames.reduce((accumulator, currentValue) => {
		if (!currentValue.idle) {
			const fps = 1000 / currentValue.duration;
			const spot = Math.floor(fps / 10) * 10;
			const times = accumulator[spot] ? accumulator[spot] + 1 : 1;
			accumulator[spot] = times;
			// console.log(accumulator);
			return accumulator;
		} else {
			return accumulator;
		}
	}, {});

	// console.log(range);
	const frames = [];
	let counter = 0;
	const avgFPS = results._frames.reduce((accumulator, currentValue) => {
		if (!currentValue.idle) {
			counter += 1;
			frames.push(1000 / currentValue.duration);
			return accumulator + 1000 / currentValue.duration;
		} else {
			return accumulator;
		}
	}, 0) / counter;

	// console.log(frames);

	return avgFPS;

};

const Mount = (filename, component) => {
	const events = fs.readFileSync(filename, 'utf8');
	const model = new DevtoolsTimelineModel(events);
	const results = model.timelineModel();

	const userTiming = Array.from(results._namedTracks.values())[0];
	const timingEvents = userTiming.asyncEvents;

	// retrieve mount timing
	const mountTiming = timingEvents.find((item) => item.name === `⚛ ${component} [mount]`).duration;

	return mountTiming;
};

const Update = (filename, component) => {
	const events = fs.readFileSync(filename, 'utf8');
	const model = new DevtoolsTimelineModel(events);
	const results = model.timelineModel();

	const userTiming = Array.from(results._namedTracks.values())[0];
	const timingEvents = userTiming.asyncEvents;

	// filter our component update data
	const updateData = timingEvents.filter((item) => {
		return item.name === `⚛ ${component} [update]`;
	});

	const updates = updateData.length;
	const avgUpdateTiming = updateData.reduce((accumulator, currentValue) => accumulator + currentValue.duration, 0) / updates;

	return avgUpdateTiming;
};

module.exports = {
	FPS,
	Mount,
	Update
};
