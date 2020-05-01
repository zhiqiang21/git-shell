#!/usr/bin/env node

/**
 * @format
 * @file 获取url的查询参数
 * @date 2018/08/06
 * @author houzhiqiang@gmail.com
 */

const {URL} = require('url');
const chalk = require('chalk');

// 按照规范 hash只是存在 url #/之后字符串，如果在其中存在？也别认为是hash字符串的一部分

// console.log((new URL('https://www.baidu.com?aa=111#/hash?bbb=2&aa=222')).hash);
// console.log((new URL('https://www.baidu.com?aa=111#/hash')).hash);
// console.log((new URL('https://www.baidu.com?aa=111#/')).hash);
// console.log((new URL('https://www.baidu.com?aa=111#')).hash);
// console.log((new URL('https://www.baidu.com/#/aaaa?bbb=1')).hash);
// =========== console.log ==================
// #/hash?bbb=2&aa=222
// #/hash
// #/
//
// #/aaaa?bbb=1

// console.log((new URL('https://www.baidu.com?aa=111#/hash?bbb=2&aa=222')).search);
// console.log((new URL('https://www.baidu.com?aa=111#/hash')).search);
// console.log((new URL('https://www.baidu.com?aa=111#/')).search);
// console.log((new URL('https://www.baidu.com?aa=111#')).search);
// console.log((new URL('https://www.baidu.com/#/aaaa?bbb=1')).search);
// =========== console.log ==================
// ?aa=111
// ?aa=111
// ?aa=111
// ?aa=111
//

const args = process.argv;

if (args.length < 3) {
    console.log(chalk.red('please input you url string !'));
    process.exit();
}

const urlString = new URL(args.slice(2));

// const urlString = new URL('https://www.baidu.com?aa=111&bbb=2222&ccc=3333&ddd=4444#/hash?bbb=2&aa=222');
// const urlString = new URL('https://www.baidu.com?aa=111#/hash');
// const urlString = new URL('https://www.baidu.com/#/aaaa?bbb=1');

const hashIndex = urlString.href.indexOf('#');
const searchIndex = urlString.href.indexOf('?');

const hash = getHashParams(hashIndex, urlString);
const searchObj = getSearchParams(searchIndex, urlString);

if (hash) {
    console.log(chalk.red('===============hash 参数=============='));
    console.log(chalk.blue(`hash----->|: ${hash}`));
}

if (JSON.stringify(searchObj) !== '{}') {
    console.log(chalk.red('=============query 参数列表================'));

    const queryKeysArr = Object.keys(searchObj);

    for (let index = 0; index < queryKeysArr.length; index++) {
        const element = queryKeysArr[index];

        if (index % 2 === 0) {
            console.log(
                chalk.cyan(
                    `${queryKeysArr[index]}：${searchObj[queryKeysArr[index]]}`
                )
            );
        } else {
            console.log(
                chalk.magenta(
                    `${queryKeysArr[index]}：${searchObj[queryKeysArr[index]]}`
                )
            );
        }
    }
}

process.exit();

/**
 * 获取查询参数
 * @param {num} index url字符串中 ？ 出现的位置
 * @param {*} url url字符串
 */
function getSearchParams(index, url) {
    const searchStr = url.search;

    if (!searchStr) return {};
    return stringToObj(searchStr);
}

/**
 * 获取hash字符串
 * @param {num} index url字符串中 # 出现的位置
 * @param {*} url url字符串
 */
function getHashParams(index, url) {
    if (index <= 0) return null;

    // 忽略 hash 字符串中的 ？ 只将字符串开头的 #/替换为 空
    const hashString = url.hash.replace('#/', '');

    if (!hashString) return null;

    return hashString;
}

// 转化str为 obj对象
function stringToObj(str) {
    const strArr = str.split('&');
    const obj = {};

    strArr.forEach(item => {
        const arr = item.split('=');

        obj[arr[0]] = arr[1];
    });

    return obj;
}
