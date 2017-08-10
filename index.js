#!/usr/bin/env node

var prettyBytes = require('pretty-bytes'),
    pj = require('prettyjson'),
    rangePrompt = require('range-prompt'),
    fs = require('fs'),
    //maxArcFile = '/sys/module/zfs/parameters/zfs_arc_max',
    maxArcFile = 'test',
    curMaxBytes = +fs.readFileSync(maxArcFile).toString(),
    c = require('chalk'),
    clear = require('cli-clear'),
    child = require('child_process'),
    os = require('os');




var freeM = child.execSync('free -m').toString();
clear();
console.log('free -m : \n' + c.green(freeM));
var msg = c.cyan.bgBlack('Current ZFS ARC Max is ') + c.white.bgBlack(prettyBytes(curMaxBytes));
var promptMsg = 'Select new ARC Size: ';
var unit = 'MB';
var min = 256;
var max = +os.totalmem() / 1024 / 1024;
//var step = 128;
var step = parseInt(max/8);

console.log('max=', max);
//process.exit();
console.log(c.cyan.bgWhite(msg) + '\n');


var curValue = parseInt(curMaxBytes / 1024 / 1024);
curValue = parseInt(curValue / step) * step;
if (curValue < min)
    curValue = min;
if (curValue > max)
    curValue = max;

var rP = {
    min: min,
    max: max,
    value: curValue,
    step: step,
    unit: unit
};
console.log(pj.render(rP)+'\n\n');

rangePrompt(promptMsg, rP)
    .on('abort', (item) => console.log('You aborted, having chosen', item, 'kg'))
    .on('submit', (item) => console.log('You chose', item, 'kg'))
