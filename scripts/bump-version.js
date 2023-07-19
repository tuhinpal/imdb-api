const fs = require("fs");
const packagejson = require("../package.json");
const { exec } = require("child_process");

function bumpVersion(current = "") {
  const splitted = current.split(".");
  let currentVersion = parseInt(splitted.join(""));
  currentVersion++;
  const newVersion = currentVersion.toString().split("").join(".");
  return newVersion;
}

const newVersion = bumpVersion(packagejson.version);

console.log(`Bumping version from ${packagejson.version} to ${newVersion}...`);

packagejson.version = newVersion;
fs.writeFileSync("./package.json", JSON.stringify(packagejson, null, 2));

console.log("Running npm install...");
exec("npm install", (err, stdout, stderr) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Installed dependencies");
  console.log(`Bumped version to ${newVersion}!`);
});
