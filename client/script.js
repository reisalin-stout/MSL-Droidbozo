document.addEventListener("DOMContentLoaded", function () {
  console.log("hello world");
});

async function closeProcess() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://127.0.0.1:1337/command", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  var data = {
    command: "reboot",
  };
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      console.log(response);
    }
  };
  xhr.send(JSON.stringify(data));
}

window.addEventListener("beforeunload", function () {
  closeProcess();
});
