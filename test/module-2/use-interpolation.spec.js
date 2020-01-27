const { expect } = require("chai");
const esprima = require("esprima");
const fs = require("fs");
const { describe, it } = require("mocha");
const path = require("path");

const source = fs.readFileSync(path.join(process.cwd(), "src/info.js"), "utf8");

describe("Informational Text (src/info.js)", () => {
  it("should use interpolation in the help text @use-interpolation", () => {
    let foundStringRaw = false;

    esprima.parseModule(source, {}, node => {
      if (
        node.type === "VariableDeclarator" &&
        node.id.name === "help" &&
        node.init != null &&
        node.init.type === "TaggedTemplateExpression" &&
        node.init.quasi.type === "TemplateLiteral" &&
        node.init.quasi.expressions.some(expression => {
          return (
            expression.type === "Identifier" && expression.name === "usage"
          );
        })
      ) {
        foundStringRaw = true;
      }
    });

    expect(
      foundStringRaw,
      "In src/info.js, we can interpolate the `usage` constant in place of the equivalent `help` text"
    ).to.be.true;

    const { help } = require("../../src/info.js");
    const foundUsageText = help.startsWith("Usage: crlf-convert [CR|LF|CRLF]");

    expect(
      foundUsageText,
      "In src/info.js, let's interpolate `usage` as the very first part of the `help` text"
    ).to.be.true;
  });
});
