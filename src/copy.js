/**
 * @file 将源路径下的文件拷贝到目标目录
 * @date 2019/11/25
 * @author hpuhouzhiqiang@gmail.com
 */

const path = require('path');
const fs = require('fs-extra');




function getFileName(url) {
    if(!url) return '';

    return url.substring(url.lastIndexOf('/')+1);
}

 /**
  *
  * @param {string} srcPath 源目录
  * @param {string} desPath 目标路径
  */
 function copyFile(srcPath, desPath) {
    const srcItemList = fs.readdirSync(srcPath);
    const copyDesPath = path.resolve(process.cwd(), desPath);

    srcItemList.forEach(item => {
        const itemPath = path.resolve(process.cwd(), srcPath, item);
        const fileState = fs.statSync(itemPath);

        if(fileState.isDirectory()) {
            copyFile(itemPath, copyDesPath)
        } else {
            const fileName = getFileName(itemPath);
            fs.copyFileSync(itemPath, `${copyDesPath}/${fileName}`);
        }
    })
 }

 copyFile('./lib', './test/')