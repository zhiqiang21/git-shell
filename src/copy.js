/**
 * @file 将源路径下的文件拷贝到目标目录
 * @date 2019/11/25
 * @author hpuhouzhiqiang@gmail.com
 * -f 源路径
 * -t 目标路径
 * -r 支持正则
 * -n 文件名字
 */
const gb = require("fast-glob");
const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");
const argv = require("minimist")(process.argv.slice(2));
const currentPath = process.cwd();

if (!argv["f"] || !argv["t"]) {
    console.log(chalk.red("please input from path and to path!"));
    return;
}

const fromPath = path.resolve(currentPath, argv["f"]);
const toPath = path.resolve(currentPath, argv["t"]);
const dirList = gb.sync(`${fromPath}/${argv["n"]}*/`, {
    onlyDirectories: true,
});

const copyTask = dirList.map((item) => {
    return new Promise((resolve, reject) => {
        copyFile(item, toPath);
        resolve();
    });
});

Promise.all(copyTask).then((resp) => {
    // deleteFromDir(dirList);
    console.log(`-------------`, chalk.blue('文件移动完毕！'));
});

function getFileName(url) {
    if (!url) return "";
    return url.substring(url.lastIndexOf("/") + 1);
}



/**
 * 从源路径到目标路径
 * @param {string} srcPath 源目录
 * @param {string} desPath 目标路径
 */
function copyFile(srcPath, desPath) {
    const srcItemList = fs.readdirSync(srcPath);

    for (let i = 0; i < srcItemList.length; i++) {
        const item = srcItemList[i];
        if (/^\..+/.test(item)) continue;

        const _path = path.resolve(srcPath, item);
        const fileState = fs.statSync(_path);

        if (fileState.isDirectory()) {
            copyFile(_path, desPath);
        } else {
            const fileName = getFileName(_path);
            fs.copySync(_path, `${desPath}/${fileName}`);
        }
    }
}

/**
 * 删除文件夹列表
 * @param {*} list 移除的文件列表
 */
function deleteFromDir(list = []) {
    list.forEach((item) => {
        fs.removeSync(item);
    });
}
