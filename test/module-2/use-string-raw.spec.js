const { expect } = require("chai");
const esprima = require("esprima");
const fs = require("fs");
const { describe, it } = require("mocha");
const path = require("path");

const source = fs.readFileSync(path.join(process.cwd(), "src/info.js"), "utf8");

describe("Informational Text (src/info.js)", () => {
  it("should use `String.raw` for the `help` text @use-string-raw", () => {
    let foundStringRaw = false;

    esprima.parseModule(source, {}, node => {
      if (
        node.type === "VariableDeclarator" &&
        node.id.name === "help" &&
        node.init != null &&
        node.init.type === "TaggedTemplateExpression" &&
        node.init.tag.type === "MemberExpression" &&
        node.init.tag.object.name === "String" &&
        node.init.tag.property.name === "raw"
      ) {
        foundStringRaw = true;
      }
    });

    expect(
      foundStringRaw,
      "In src/info.js, we want to tag the `help` text with the built-in `String.raw` tag"
    ).to.be.true;

    const { help } = require("../../src/info.js");
    const foundDoubleBackslashes = help.includes(String.raw`\\`);

    expect(
      foundDoubleBackslashes,
      "In src/info.js, let's remove any (now unnecessary) double backslashes from the `help` text"
    ).to.be.false;
  });
});
