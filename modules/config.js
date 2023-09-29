import { fs } from "./imports.js";

function parseINIString(data) {
  var regex = {
    section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
    param: /^\s*([^=]+?)\s*=\s*(.*?)\s*$/,
    comment: /^\s*;.*$/,
  };
  var value = {};
  var lines = data.split(/[\r\n]+/);
  var section = null;
  //Check every line in .ini file
  lines.forEach(function (line) {
    if (regex.comment.test(line)) {
      //If line is a comment return
      return;
    } else if (regex.param.test(line)) {
      //If line is a parameter
      var match = line.match(regex.param);
      if (section) {
        //If there is already a valid section write parameter name as key and value as value under that section
        value[section][match[1].toLowerCase()] = match[2];
      } else {
        //If there is not already a valid section write parameter name as key and value as value
        value[match[1].toLowerCase()] = match[2];
      }
    } else if (regex.section.test(line)) {
      //If line is section create a new empty section
      var match = line.match(regex.section);
      value[match[1].toLowerCase()] = {};
      section = match[1].toLowerCase();
    } else if (line.length == 0 && section) {
      //If section doesn't have name set value as null
      section = null;
    }
  });
  return value;
}

function loadConfig() {
  try {
    var data = fs.readFileSync(".\\config.ini", "utf8");

    var configuration = parseINIString(data);
    return configuration;
  } catch (e) {
    console.log(e);
  }
}

export const options = loadConfig();
