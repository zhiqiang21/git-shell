#!/usr/bin/env node

// src/rename.js --dir ./test --delimiter "_" --index-position 1 --prefix photo
const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
let inputDir = '';
let delimiter = '-';
let indexPosition = 0;
let prefix = 'file';

// Parse command line arguments
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--dir' && i + 1 < args.length) {
    inputDir = args[i + 1];
    i++;
  } else if (args[i] === '--delimiter' && i + 1 < args.length) {
    delimiter = args[i + 1];
    i++;
  } else if (args[i] === '--index-position' && i + 1 < args.length) {
    indexPosition = parseInt(args[i + 1], 10);
    i++;
  } else if (args[i] === '--prefix' && i + 1 < args.length) {
    prefix = args[i + 1];
    i++;
  } else if (args[i] === '--help') {
    showHelp();
    process.exit(0);
  }
}

// Show help information
function showHelp() {
  console.log(`
Usage: node rename.js [options]

Options:
  --dir <path>              Directory containing files to rename (required)
  --delimiter <char>        Character to split filename (default: '-')
  --index-position <number> Position of the index in the split array (0-based, default: 0)
  --prefix <string>         Prefix for renamed files (default: 'file')
  --help                    Show this help message
  
Example:
  node rename.js --dir ./images --delimiter "_" --index-position 1 --prefix photo
  
  This will rename files like "abc_123_xyz.jpg" to "photo-123.jpg" if index-position is 1
`);
}

// Validate input directory
if (!inputDir) {
  console.error('Error: Input directory is required');
  showHelp();
  process.exit(1);
}

// Check if directory exists
if (!fs.existsSync(inputDir) || !fs.statSync(inputDir).isDirectory()) {
  console.error(`Error: Directory "${inputDir}" does not exist or is not a directory`);
  process.exit(1);
}

// Get all files in the directory
const files = fs.readdirSync(inputDir);

// Process each file
let renamedCount = 0;
let errorCount = 0;

files.forEach(file => {
  // Skip directories
  const filePath = path.join(inputDir, file);
  if (fs.statSync(filePath).isDirectory()) {
    return;
  }
  
  try {
    // Get file extension
    const ext = path.extname(file);
    const basename = path.basename(file, ext);
    
    // Split the filename by delimiter
    const parts = basename.split(delimiter);
    
    // Check if index position is valid
    if (indexPosition < 0 || indexPosition >= parts.length) {
      console.warn(`Warning: Index position ${indexPosition} is out of range for file "${file}". Skipping.`);
      return;
    }
    
    // Get the index part
    const index = parts[indexPosition];
    
    // Create new filename
    const newFilename = `${prefix}-${index}${ext}`;
    const newFilePath = path.join(inputDir, newFilename);
    
    // Rename the file
    fs.renameSync(filePath, newFilePath);
    console.log(`Renamed: ${file} -> ${newFilename}`);
    renamedCount++;
  } catch (error) {
    console.error(`Error renaming file "${file}": ${error.message}`);
    errorCount++;
  }
});

console.log(`\nRename operation completed:`);
console.log(`- ${renamedCount} files renamed successfully`);
console.log(`- ${errorCount} errors encountered`);
