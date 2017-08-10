#!/usr/bin/env node

var prettyBytes = require('pretty-bytes'),
    pj = require('prettyjson'),
    rangePrompt = require('range-prompt'),
    fs = require('fs'),
    maxArcFile = '/sys/module/zfs/parameters/zfs_arc_max',
    //maxArcFile = 'test',
    curMaxBytes = +fs.readFileSync(maxArcFile).toString(),
    c = require('chalk'),
    clear = require('cli-clear'),
    child = require('child_process'),
    os = require('os');

var freeM = child.execSync('free -m').toString();
var msg = c.cyan.bgBlack('Current ZFS ARC Max is ') + c.white.bgBlack(prettyBytes(curMaxBytes));
var promptMsg = 'Select new ARC Size: ';
var unit = 'MB';
var min = 0;
var max = +os.totalmem() / 1024 / 1024;
//var max = 16669847552/1024/1024;
max = parseInt(max);
var steps = 16;
var step = parseInt(max/steps);
var curValue = parseInt(curMaxBytes / 1024 / 1024);
curValue = parseInt(curValue / step) * step;
max = steps * step;

var rP = {
    min: min,
    max: max,
    value: curValue,
    step: step,
    unit: unit
};
clear();
console.log('free -m : \n' + c.green(freeM));
console.log(c.cyan.bgWhite(msg) + '\n');
//console.log(pj.render(rP)+'\n\n');

rangePrompt(promptMsg, rP)
    .on('abort', (item) => console.log('You aborted, having chosen', item))
    .on('submit', (item) => console.log('You chose', item))
