import { tick, server, adb } from "./modules/imports.js";

async function init() {
  try {
    const ide = await server.start();
    console.log("Server started successfully!");

    const window = await adb.start();
    console.log("ADB connected successfully");

    tick(() => {
      console.log("new callback");
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

init();
