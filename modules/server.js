import { fs, http, win, options } from "./imports.js";

function serverLogic(req, res) {
  switch (req.method) {
    // GET Requests
    case "GET":
      switch (req.url) {
        case "/":
          fs.readFile("./client/index.html", "utf8", (err, data) => {
            // Set the content type to HTML
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            res.end();
          });
          break;

        default:
          var extension = req.url.split(".")[1];
          var types = {
            js: "application/javascript",
            css: "text/css",
          };
          if (extension == "js" || extension == "css") {
            fs.readFile("./client" + req.url, "utf8", (err, data) => {
              // Set the content type to HTML
              res.writeHead(200, { "Content-Type": types[extension] });
              res.write(data);
              res.end();
            });
          }
      }
      break;
    // POST Requests
    case "POST":
      if (req.url == "/command") {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", () => {
          try {
            let data = JSON.parse(body);
            //win.command(`.\\adb\\nox_adb.exe reboot 127.0.0.1:62001`);
            win.capture();
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Data received");
          } catch (error) {
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end("Invalid data");
          }
        });
      }
      break;
  }
}

export async function start() {
  return new Promise((resolve, reject) => {
    const ide = http.createServer((req, res) => {
      serverLogic(req, res);
    });

    ide.listen(options.network.port, "127.0.0.1", () => {
      console.log(
        `Server is running on http://127.0.0.1:${options.network.port}`
      );
      win.command(`start http://127.0.0.1:${options.network.port}`);
      resolve(ide); // Resolve the promise with the server instance when it's running
    });

    ide.on("error", (error) => {
      reject(error);
    });
  });
}
