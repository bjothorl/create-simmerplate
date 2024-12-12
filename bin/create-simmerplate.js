#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");

const projectName = process.argv[2] || "my-simmerplate-app";

// Create project directory
try {
  fs.mkdirSync(projectName);
} catch (error) {
  console.error(`Error creating directory ${projectName}: ${error}`);
  process.exit(1);
}

try {
  process.chdir(projectName);
} catch (error) {
  console.error(`Error changing directory to ${projectName}: ${error}`);
  process.exit(1);
}

// Clone the repository
console.log("Downloading Simmerplate...");
try {
  execSync("git clone --quiet https://github.com/bjothorl/simmerplate.git .");
} catch (error) {
  console.error(`Error cloning repository: ${error}`);
  process.exit(1);
}

// Remove git history
console.log("Removing git history...");
try {
  fs.rmdirSync(".git", { recursive: true });
} catch (error) {
  // Fallback for older Node.js versions
  try {
    execSync("rm -rf .git");
  } catch (error) {
    console.error(`Error removing git history: ${error}`);
    process.exit(1);
  }
}

try {
  // Change package name and version
  execSync(`npm pkg set name=${projectName}`);
  execSync(`npm pkg set version=1.0.0`);
} catch (error) {
  console.error(`Error changing package name and version: ${error}`);
  process.exit(1);
}

// Initialize new git repository
console.log("Initializing new git repository...");
try {
  execSync("git init");
  execSync("git add .");
  execSync('git commit -m "Initial commit"');
} catch (error) {
  console.error(`Error initializing git repository: ${error}`);
  process.exit(1);
}

// Install dependencies
console.log("Installing dependencies...");
try {
  execSync("npm install");
} catch (error) {
  console.error(`Error installing dependencies: ${error}`);
  process.exit(1);
}

console.log(`
Simmerplate 🍳 is ready!

To get started:
  cd ${projectName}
  
In one terminal:
  npm run dev

In another terminal:
  npm run dev-server
`);
