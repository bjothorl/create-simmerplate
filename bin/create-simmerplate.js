#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");

const projectName = process.argv[2] || "my-simmerplate-app";

// Create project directory
fs.mkdirSync(projectName);
process.chdir(projectName);

// Clone the repository
console.log("Downloading Simmerplate...");
execSync("git clone https://github.com/bjothorl/simmerplate.git .");

// Remove git history
console.log("Removing git history...");
try {
  fs.rmdirSync(".git", { recursive: true });
} catch (error) {
  // Fallback for older Node.js versions
  execSync("rm -rf .git");
}

// Initialize new git repository
console.log("Initializing new git repository...");
execSync("git init");

// Install dependencies
console.log("Installing dependencies...");
execSync("npm install");

console.log(`
🍳 Simmerplate is ready!

To get started:
  cd ${projectName}
  
In one terminal:
  npm run dev

In another terminal:
  npm run dev-server
`);
