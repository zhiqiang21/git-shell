#!/usr/bin/env node
/**
 * @file 分析 chrome导出的 har文件并且将域名按照ss的规则导出
 * @date 2019/06/12
 * @author houzhiqiang@gmail.com
 */

// hartossrule [harFilePath or dir] [user-rule-path]  添加的新规则支持按照字母顺序排序添加

const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const {URL} = require('url');
const chalk = require('chalk');
const argvObj = require('yargs-parser')(process.argv.slice(2));

const fileName = path.basename(argvObj.file);
const startSpet = `!==================start ${fileName}========================`;
const endStep = `!==================end   ${fileName}========================`;
const harFileData = fs.readFileSync(argvObj.file, 'utf8');
const jsonData = JSON.parse(harFileData);
const entriesUrlList = jsonData.log.entries || [];
const hostList = [];

entriesUrlList.forEach(item => {
  const hostUrl = new URL(item.request.url);
  const hostName = hostUrl.host;

  if (!hostList.includes(hostName)) {
    hostList.push(hostName);
  }
});

console.log(startSpet);
hostList.forEach(item => console.log(item));
console.log(endStep);
