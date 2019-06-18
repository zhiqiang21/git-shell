#!/usr/bin/env node
/**
 * @file 分析 chrome导出的 har文件并且将域名导出
 * @date 2019/06/12
 * @author houzhiqiang@gmail.com
 */


const fs = require('fs');
// const path = require('path');
const {URL} = require('url');

//
const userGfwlistPath = `/Users/houzhiqiang/.ShadowsocksX-NG/user-rule.txt`;
// const defaultGfwListPath = `/Users/houzhiqiang/.ShadowsocksX-NG/gfwlist.js`;
const argvs = process.argv;

if (argvs.length <= 2) {
    console.log(`**** please enter har file path ! ****`);
    return;
}

const filePath = argvs[2];
// const filePath = `/Users/houzhiqiang/Downloads/codepen.io.har`;


const harFileData = fs.readFileSync(filePath, 'utf8');
const userRuleData = fs.readFileSync(userGfwlistPath, 'utf8');
const userRuleList = userRuleData.split('\n');


// 使用正则将  var rules = [xxxx] 匹配出来 获取默认规则
// const defaultRuleData = fs.readFileSync(defaultGfwListPath, 'utf8');
// const defaultRuleArr = [];

// const rulesList = defaultRuleData.match(/rules\s=\s\[/);

// console.log('**************defaultRuleData***************');
// console.log(rulesList);
// console.log('*******************************');


const jsonData = JSON.parse(harFileData);
const entriesUrlList = jsonData.log.entries || [];
const hostList = [];
const regName = [];


console.log('*********** start rule ***********');
entriesUrlList.forEach(item => {
    const hostUrl = new URL(item.request.url);
    const hostName = hostUrl.host;

    if (!hostList.includes(hostName)) {
        const nameArr = hostName.split('.');

        // static.codepen.io
        // codepen.io
        // 处理类似这种
        if (nameArr.length > 2) {
            const nameString = `||${nameArr[1]}.${nameArr[2]}`;

            if (!regName.includes(nameString)) {
                console.log(nameString);
                regName.push(nameString);
            }

        } else {
            if (!regName.includes(hostName)) {
                console.log(`||${hostName}`);
                regName.push(`||${hostName}`);
            }
        }
        hostList.push(hostName);
    }
});
console.log('*********** end rule ***********');

console.log('*********** start check rule ***********');
hostList.forEach(item => {
    const nameArr = item.split('.');

    if (nameArr.length > 2) {
        console.log(`${item}`);
        console.log(`||${nameArr[1]}.${nameArr[2]}`);
        console.log(`===============================`);
    } else {
        console.log(`${item}`);
        console.log(`||${item}`);
        console.log(`===============================`);
    }
});
console.log('*********** end check rule ***********');

const needAdd = [];
const userRuleAlready = [];

regName.forEach(item => {
    if (userRuleList.includes(item)) {
        userRuleAlready.push(item);
    } else {
        needAdd.push(item);
    }
});

console.log('*********** start need add rule ***********');
needAdd.forEach(item => {
    console.log(item);
});
console.log('*********** end need add rule ***********');
