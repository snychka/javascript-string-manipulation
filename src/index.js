// Create a tagged template lf`...` that formats text using LF line endings.
var lf = () => {};

var transformLineEnding = (string, lineEnding) => {
  if (lineEnding === LineEndings.CR) {
    string = LineEndingReplacements.replaceCRLF(string, "\r");
    string = LineEndingReplacements.replaceLF(string, "\r");
  } else if (lineEnding === LineEndings.LF) {
    string = LineEndingReplacements.replaceCRLF(string, "\n");
    string = LineEndingReplacements.replaceCR(string, "\n");
  } else if (lineEnding === LineEndings.CRLF) {
    string = LineEndingReplacements.replaceCR(string, "\r\n");
    string = LineEndingReplacements.replaceLF(string, "\r\n");
  }
  return string;
};

var LineEndings = {
  CR: "CR",
  LF: "LF",
  CRLF: "CRLF"
};

var LineEndingReplacements = {
  replaceCR: (string, newEnding) =>
    string.replace(/(\r+)([^\n]|$)/g, (_match, p1, p2) => {
      return `${newEnding.repeat(p1.length)}${p2}`;
    }),

  replaceLF: (string, newEnding) =>
    string.replace(/([^\r]|^)(\n+)/g, (_match, p1, p2) => {
      return `${p1}${newEnding.repeat(p2.length)}`;
    }),

  replaceCRLF: (string, newEnding) => string.replace(/\r\n/g, `${newEnding}`)
};

module.exports = {
  lf,
  LineEndings,
  transformLineEnding
};
