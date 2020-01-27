const { expect } = require("chai");
const esprima = require("esprima");
const fs = require("fs");
const { describe, it } = require("mocha");
const path = require("path");

const source = fs.readFileSync(path.join(process.cwd(), "src/cli.js"), "utf8");

describe("Command-Line Interface (src/cli.js)", () => {
  it("should destructure `LineEndings`, `transformLineEnding`, `help`, and `usage` @refactor-require", () => {
    // const { LineEndings, transformLineEnding } = ...

    let foundIndexDestructure = false;

    esprima.parseModule(source, {}, node => {
      if (
        node.type === "VariableDeclarator" &&
        node.id != null &&
        node.id.type === "ObjectPattern" &&
        node.id.properties.some(
          property => property.value.name === "LineEndings"
        ) &&
        node.id.properties.some(
          property => property.value.name === "transformLineEnding"
        )
      ) {
        foundIndexDestructure = true;
      }
    });

    expect(
      foundIndexDestructure,
      "In src/cli.js, let's use object destructuring to assign `LineEndings` and `transformLineEnding` without using the intermediate `index` variable"
    ).to.be.true;

    // const { help, usage } = ...

    let foundInfoDestructure = false;

    esprima.parseModule(source, {}, node => {
      if (
        node.type === "VariableDeclarator" &&
        node.id != null &&
        node.id.type === "ObjectPattern" &&
        node.id.properties.some(property => property.value.name === "help") &&
        node.id.properties.some(property => property.value.name === "usage")
      ) {
        foundInfoDestructure = true;
      }
    });

    expect(
      foundInfoDestructure,
      "In src/cli.js, let's use object destructuring to assign `help` and `usage` without using the intermediate `helpText` variable"
    ).to.be.true;
  });
});
