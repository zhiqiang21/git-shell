#!/usr/bin/env node

/**
 * @file 获取url的查询参数
 * @date 2018/08/06
 * @author houzhiqiang@gmail.com
 */

//  https://www.baidu.com?aa=111#/hash
// https://www.baidu.com/#/aaaa?bbb=1
//  https://www.baidu.com?aa=111#/hash?bbb=2&aa=222

// 因为平时大家url中拼接参数时的不规范导致 hash 和 query参数的获取错误以上列举了四种可能的情况
const {URL} = require('url');

const args = process.argv;

if (args.length < 3) {
    return 'please input you url string !';
}

const urlString = (new URL(args.slice(2))).href;

// const urlString = 'https://www.baidu.com?aa=111#/hash?bbb=2&aa=222';
// const urlString = 'https://www.baidu.com?aa=111#/hash';
// const urlString = 'https://www.baidu.com/#/aaaa?bbb=1';

const hashIndex = urlString.indexOf('#');
const searchIndex = urlString.indexOf('?');

const hash = getHashParams(hashIndex, urlString);
const searchObj = getSearchParams(searchIndex, urlString);

if (hash) {
    console.log('===============hash 参数==============');
    console.log(`hash：${hash}`);
}

if (JSON.stringify(searchObj) !== '{}') {
    console.log('=============query 参数列表================');

    for (let item in searchObj) {
        if (searchObj.hasOwnProperty(item)) {
            console.log(`${item}：${searchObj[item]}`);
        }
    }
}


// 获取query参数
function getSearchParams(index, url) {

    const searchObj = {};

    if (index < 0) {
        return null;
    }

    const search = url.substring(index + 1);
    const hashIndex = search.indexOf('#');

    //  https://www.baidu.com?aa=111#/hash?bbb=2&aa=222
    if (hashIndex) {
        const before = search.substring(0, hashIndex);
        const hashString = search.substring(hashIndex);

        if (hashString.indexOf('?') >= 0) {
            const queryString = before + '&' + hashString.substring(hashString.indexOf('?') + 1);

            return stringToObj(queryString);
        } else {

            return stringToObj(before);
        }


    } else {
        const searchArr = search.split('&');

        searchArr.forEach(item => {
            const arr = item.split('=');

            searchObj[arr[0]] = arr[1];
        });
    }

    return searchObj;

}


// 获取hash参数
function getHashParams(index, url) {
    if (index < 0) {
        return null;
    }

    const hashString = url.substring(url.indexOf('#') + 2);

    if (hashString.indexOf('?') >= 0) {
        return hashString.substring(0, hashString.indexOf('?'));

    } else {
        return hashString;
    }


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
