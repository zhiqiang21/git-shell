#!/usr/bin/env node

const shelljs = require('shelljs');

const args = process.argv;

const repUrl = args[2];
const repName = args.length > 3 ? args[3] : '';

if (repName) {
    cloneRepo(repUrl, repName);
} else {
    const repoGitName = repUrl.substring(repUrl.lastIndexOf('/') + 1, repUrl.lastIndexOf('.'));

    cloneRepo(repUrl, repoGitName);
}


function cloneRepo(url, name) {
    const cloneCode = shelljs.exec(`git clone ${url} ${name}`).code;

    if (cloneCode !== 0) {
        shelljs.echo('repository clone fail !');
        shelljs.exit(1);
    } else {
        shelljs.cd(`${__dirname}/${name}`);
        shelljs.exec(`git config --local user.name "hpuhouzhiqiang"`);
        shelljs.exec(`git config --local user.email "hpuhouzhiqiang@didiglobal.com"`);
        shelljs.exec(`git config --local core.ignorecase false`);

        shelljs.echo('repository clone success and init git config complete !');
        shelljs.exit(1);
    }
}
