#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

try {
  const root = process.cwd();

  const gitignorePath = path.join(root, 'gitignore');
  const dotGitignorePath = path.join(root, '.gitignore');

  if (fs.existsSync(gitignorePath)) {
    // If .gitignore already exists, remove it to avoid conflict
    if (fs.existsSync(dotGitignorePath)) {
      fs.unlinkSync(dotGitignorePath);
    }

    fs.renameSync(gitignorePath, dotGitignorePath);
    console.log('✅ Renamed gitignore → .gitignore');
  } else {
    console.log('ℹ️ gitignore file not found, skipping...');
  }

} catch (error) {
  console.error('❌ Error in postInitScript:', error.message);
}