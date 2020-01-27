const { expect } = require("chai");
const esprima = require("esprima");
const fs = require("fs");
const { describe, it } = require("mocha");
const path = require("path");

const source = fs.readFileSync(path.join(process.cwd(), "src/cli.js"), "utf8");

describe("Command-Line Interface (src/cli.js)", () => {
  it("should use `let` for `buffer` and `results` variable @refactor-let", () => {
    // let buffer = ...

    let foundLetBuffer = false;

    esprima.parseModule(source, {}, node => {
      if (
        node.type === "VariableDeclaration" &&
        node.declarations.some(
          declaration => declaration.id.name === "buffer"
        ) &&
        node.kind === "let"
      ) {
        foundLetBuffer = true;
      }
    });

    expect(
      foundLetBuffer,
      "In src/cli.js, we want to use `let` in our declaration of the `buffer` variable"
    ).to.be.true;

    // let results = ...

    let foundLetResults = false;

    esprima.parseModule(source, {}, node => {
      if (
        node.type === "VariableDeclaration" &&
        node.declarations.some(
          declaration => declaration.id.name === "results"
        ) &&
        node.kind === "let"
      ) {
        foundLetResults = true;
      }
    });

    expect(
      foundLetResults,
      "In src/cli.js, let's use `let` in our declaration of the `results` variable"
    ).to.be.true;
  });
});
