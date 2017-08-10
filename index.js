#!/usr/bin/env node

var prettyBytes = require('pretty-bytes'),
    rangePrompt = require('range-prompt');




rangePrompt('Adjust the ZFS ARC Size', {
	min: 0, max: 10, value: 2, step: .1, unit: 'kg'
})
 .on('abort', (item) => console.log('You aborted, having chosen', item, 'kg'))
 .on('submit', (item) => console.log('You chose', item, 'kg'))
