/**
 * @file 判断是文件还是目录
 * @date 2019/11/25
 * @author hpuhouzhiqiang@gmail.com
 */


exports.getDir = function (pathDir) {
    const cwd = process.cwd();
    const dirItem = fs.readdirSync(pathDir);
    const dirList = [];

    dirItem.forEach(item => {
        const itemPath = path.join(cwd, pathDir, item);

        try {
            const fsStats = fs.statSync(itemPath);

            if (fsStats.isDirectory()) {
                dirList.push(itemPath);
            }
        } catch (error) {
            console.log(chalk.red(`get zip dir infor error ,${error}`));
            return;
        }

    });

    return dirList;
};