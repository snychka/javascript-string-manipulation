var index = require("./index.js");
var LineEndings = index.LineEndings;
var transformLineEnding = index.transformLineEnding;

var helpText = require("./help.js");
var help = helpText.help;
var usage = helpText.usage;

// Display help text and exit if when someone passes `-h` or `--help`.
if (process.argv.includes("-h") || process.argv.includes("--help")) {
  console.log(help);
  process.exit(0);
}

// Gather input from stdin.
var buffer = "";

process.stdin.on("data", data => {
  buffer += data;
});

// When stdin closes, operate on the gathered input.
process.stdin.on("end", () => {
  var results;

  switch (process.argv.slice(-1)[0]) {
    case "CR":
      results = transformLineEnding(buffer, LineEndings.CR);
      process.stdout.write(results);
      break;

    case "LF":
      results = transformLineEnding(buffer, LineEndings.LF);
      process.stdout.write(results);
      break;

    case "CRLF":
      results = transformLineEnding(buffer, LineEndings.CRLF);
      process.stdout.write(results);
      break;

    default:
      console.error(usage);
      process.exit(1);
  }
});
