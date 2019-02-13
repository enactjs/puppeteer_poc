const fs = require('fs');
const fetch = require('node-fetch');

const {version: ReactVersion} = require('react/package.json');
const {version: EnactVersion} = require('@enact/core/package.json');
const config = require('../config.js');

const TestResult = module.exports = {
	results: [],
	addResult: ({component, type, actualValue}) => {
		const result = {ReactVersion, EnactVersion, component, type, actualValue};
		TestResult.results.push(result);
		// batch this in the future
		fetch(config.API_LINK, {
			method: 'POST',
			body: JSON.stringify(result),
			headers: {'Content-Type': 'application/json'}}
		)
			.then(res => res.text())
			.then(json => console.log(json));
	},
	getResults: () => {
		return TestResult.results;
	}
};
