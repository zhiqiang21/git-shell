const fs = require('fs');
const path = require('path');

/**
 * 重命名文件
 * @param {string} oldPath - 原文件路径
 * @param {string} newPath - 新文件路径
 */
function renameFile(oldPath, newPath) {
    try {
        // 检查源文件是否存在
        if (!fs.existsSync(oldPath)) {
            console.error(`错误: 文件 "${oldPath}" 不存在`);
            return;
        }

        // 检查目标文件是否已存在
        if (fs.existsSync(newPath)) {
            console.error(`错误: 文件 "${newPath}" 已存在`);
            return;
        }

        // 执行重命名
        fs.renameSync(oldPath, newPath);
        console.log(`成功: "${oldPath}" 已重命名为 "${newPath}"`);
    } catch (error) {
        console.error('重命名过程中发生错误:', error.message);
    }
}

// 示例用法
const oldFileName = 'old.txt';
const newFileName = 'new.txt';

// 获取当前目录
const currentDir = process.cwd();

// 构建完整的文件路径
const oldPath = path.join(currentDir, oldFileName);
const newPath = path.join(currentDir, newFileName);

// 执行重命名
renameFile(oldPath, newPath); 