#!/usr/bin/env node

/**
 * @file 获取url的查询参数
 * @date 2018/08/06
 * @author houzhiqiang@gmail.com
 */


const queryString = require('query-string');

const args = process.argv;


outPutFn(args.slice(2));

/**
 * 输入命令的方式
 * urlhelp hash  [url]   只输出hash对象
 * urlhelp query [url]   只输出query对象
 * urlhelp qh [url]   /  urlhelp [url]    输出query和hash对象
 * @param {*} params
 */
function outPutFn(params) {

  if (params.length === 1) {
    getQueryObj(params[0].substring(params[0].indexOf('?')));
    // getHashObj(urlSearch);
  } else {
    const urlSearch = params[1].substring(params[1].indexOf('?'));

    if (params[0] === 'hash') {
      getHashObj(urlSearch);
    }

    if (params[0] === 'query' || params[0] === 'q') {
      getQueryObj(urlSearch);
    }
  }
}


function getQueryObj(url) {
  console.log('*************query对象****************');
  const queryObj = queryString.parse(url);

  for (let item in queryObj) {
    console.log(`${item} --> ${queryObj[item]}`);
  }
  console.log('*******************************');
}


function getHashObj(url) {
  console.log('*************hash对象****************');
  console.log(queryString.parse(url));
  console.log('*******************************');
}
