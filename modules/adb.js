import { win, jimp, options } from "./imports.js";
import { asyncCommand } from "./win.js";

const adbPath = `.\\adb\\nox_adb.exe`;
var frame = 0;

export async function start() {
  return new Promise((resolve, reject) => {
    const adb = http.createServer((req, res) => {
      serverLogic(req, res);
    });

    adb.on("error", (error) => {
      reject(error);
    });
  });
}
compare();

async function connect(address) {
  try {
    await checkAndStartADBServer();
    const emulatorList = await command("devices");

    const emulatorMatches = emulatorList.match(/emulator-\d+\s+device/g);

    if (!emulatorMatches) {
      console.log("No emulators found.");
      return;
    }

    const firstEmulator = emulatorMatches[0].split(/\s+/)[0];

    await command(`connect ${firstEmulator}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function closeADBServer() {
  await command("kill-server");
}

async function checkAndStartADBServer() {
  try {
    let isADBRunning = true;
    try {
      await command("version");
    } catch (error) {
      isADBRunning = false;
    }

    if (!isADBRunning) {
      console.log("ADB server is not running. Starting it now...");
      await command("start-server");
      console.log("ADB server has been started.");
    } else {
      console.log("ADB server is already running.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function capture() {
  await command(`exec-out screencap -p > ./images/frames/frame${frame}.png`);
}

async function compare() {
  try {
    const firstImage = await jimp.default.read(
      "./images/references/frame0.png"
    );
    const secondImage = await jimp.default.read("./images/frames/frame0.png");

    const diff = jimp.default.diff(firstImage, secondImage);

    console.log(`Image similarity: ${100 - diff.percent.toFixed(2)}%`);
  } catch (err) {
    console.error(err);
  }
}

async function command(string) {
  win
    .asyncCommand(`${adbPath} ${string}`)
    .then((result) => {
      console.log("Command executed successfully:");
      console.log("stdout:", result.stdout);
      return result.stdout;
    })
    .catch((error) => {
      console.error("Error executing command:", error);
    });
}
