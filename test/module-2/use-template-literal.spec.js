const { expect } = require("chai");
const esprima = require("esprima");
const fs = require("fs");
const { describe, it } = require("mocha");
const path = require("path");

const source = fs.readFileSync(path.join(process.cwd(), "src/info.js"), "utf8");
const { help } = require("../../src/info.js");

describe("Informational Text (src/info.js)", () => {
  it("should use a template tag for the help text @use-template-literal", () => {
    let foundTemplateTag = false;

    esprima.parseModule(source, {}, node => {
      if (
        node.type === "VariableDeclarator" &&
        node.id.name === "help" &&
        node.init != null &&
        (node.init.type === "TemplateLiteral" ||
          node.init.type === "TaggedTemplateExpression")
      ) {
        foundTemplateTag = true;
      }
    });

    expect(
      foundTemplateTag,
      "In src/info.js, we can use a template tag to define the multi-line `help` text"
    ).to.be.true;

    expect(
      help,
      "In src/info.js, let's ensure there are two newlines before 'Converts text...' in the `help` text"
    ).includes("\n\nConverts text");

    expect(
      help,
      "In src/info.js, let's ensure there are two newlines before 'Options:' in the `help` text"
    ).includes("\n\nOptions:");

    expect(
      help,
      "In src/info.js, let's ensure there are two newlines before '[CR|LF|CRLF]: Desired line ending' in the `help` text"
    ).includes("\n\n[CR|LF|CRLF]: Desired line ending");

    expect(
      help,
      "In src/info.js, let's ensure there are two newlines after 'Desired line ending' in the `help` text"
    ).includes("Desired line ending\n\n");

    expect(
      help,
      "In src/info.js, let's ensure there are four spaces before 'Converts text...' in the `help` text"
    ).includes("    CR is a");

    expect(
      help,
      "In src/info.js, let's ensure there are four spaces before 'Converts text...' in the `help` text"
    ).includes("    LF is a");

    expect(
      help,
      "In src/info.js, let's ensure there are four spaces before 'Converts text...' in the `help` text"
    ).includes("    CRLF is a");

    expect(
      help,
      "In src/info.js, let's ensure there are two newlines before 'Example:' in the `help` text"
    ).includes("\n\nExample:");

    expect(
      help,
      "In src/info.js, let's ensure there are two newlines after 'Example:' in the `help` text"
    ).includes("Example:\n\n");

    expect(
      help,
      "In src/info.js, let's ensure there are four spaces before 'cat in.txt...' in the `help` text"
    ).includes("    cat in.txt");
  });
});
