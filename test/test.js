

// gitclone git@github.com:facebook/regenerator.git
// gitclone git@github.com:facebook/regenerator.git -didi
// gitclone git@github.com:facebook/regenerator.git testname
// gitclone git@github.com:facebook/regenerator.git testname -didi




const {URL} = require('url');

// const urlString = 'https://www.baidu.com?aa=111#/hash?bbb=2&aa=222';
// const urlString = 'https://www.baidu.com?aa=111#/hash';
// const urlString = 'https://www.baidu.com/#/aaaa?bbb=1';



console.log((new URL('https://www.baidu.com?aa=111#/hash?bbb=2&aa=222')).hash);
console.log((new URL('https://www.baidu.com?aa=111#/hash')).hash);
console.log((new URL('https://www.baidu.com?aa=111#/')).hash);
console.log((new URL('https://www.baidu.com?aa=111#')).hash);
console.log((new URL('https://www.baidu.com/#/aaaa?bbb=1')).hash);




console.log('===============')

console.log((new URL('https://www.baidu.com?aa=111#/hash?bbb=2&aa=222')).search);
console.log((new URL('https://www.baidu.com?aa=111#/hash')).search);
console.log((new URL('https://www.baidu.com?aa=111#/')).search);
console.log((new URL('https://www.baidu.com?aa=111#')).search);
console.log((new URL('https://www.baidu.com/#/aaaa?bbb=1')).search);