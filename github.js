#!/usr/bin/env node

const shelljs = require('shelljs');
const path = require('path');
const chalk = require('chalk')

const args = process.argv;
const repUrl = args[2];
const cloneTypeList = [
    'github',
    'didi'
];

/*
 * github
 * didi
 */
let cloneType = 'github';
let repName = '';

if (args.length < 3) {
    shelljs.echo(chalk.red('please input you repository url'));
}

if (args.length === 4) {
    console.log(args[3]);
    // clone 的文件夹名字可能包含 -
    if (args[3] && args[3].indexOf('-') === 0 && cloneTypeList.includes(args[3].shift())) {
        cloneType = args[3].substring(1);
    } else {
        repName = args[3] || '';
    }
}

if (args.length === 5) {
    cloneType = args[4].substring(2);
    repName = args[3] || '';
}


if (repName) {
    cloneRepo(repUrl, repName);
} else {
    const repoGitName = repUrl.substring(repUrl.lastIndexOf('/') + 1, repUrl.lastIndexOf('.'));

    cloneRepo(repUrl, repoGitName);
}


function cloneRepo(url, name) {
    const pwd = shelljs.pwd().stdout;

    const cloneIntoDir = path.resolve(pwd, name);

    shelljs.echo(`clone repository into ${cloneIntoDir}`);

    const cloneCode = shelljs.exec(`git clone ${url} ${name}`).code;

    if (cloneCode !== 0) {
        shelljs.echo(chalk.red('repository clone fail !'));
        shelljs.exit(1);
    } else {
        shelljs.cd(`${cloneIntoDir}`);

        switch (cloneType) {
        case 'github':
            githubConf();
            break;

        case 'didi':
            didiConf();
            break;
        default:
            githubConf();
            break;
        }
    }
}


// 滴滴gitlab配置
function didiConf() {
    shelljs.exec(`git config --local user.name "hpuhouzhiqiang"`);
    shelljs.exec(`git config --local user.email "hpuhouzhiqiang@didiglobal.com"`);
    shelljs.exec(`git config --local core.ignorecase false`);

    shelljs.echo(chalk.green('repository clone success and init git config complete !'));
    shelljs.exit(1);
}


// github配置
function githubConf() {
    shelljs.exec(`git config --local user.name "zhiqiang21"`);
    shelljs.exec(`git config --local user.email "hpuhouzhiqiang@gmail.com"`);
    shelljs.exec(`git config --local core.ignorecase false`);

    shelljs.echo(chalk.green('repository clone success and init git config complete !'));
    shelljs.exit(1);
}
