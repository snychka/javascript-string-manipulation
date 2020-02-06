const { expect } = require("chai");
const esprima = require("esprima");
const fs = require("fs");
const { describe, it } = require("mocha");
const path = require("path");

const cliSource = fs.readFileSync(path.join(process.cwd(), "src/cli.js"), "utf8");
const infoSource = fs.readFileSync(path.join(process.cwd(), "src/info.js"), "utf8");

describe("Command-Line Interface (src/cli.js) and Informational Text (src/info.js)", () => {
  it("should replace uses of `var` @refactor-let", () => {
    // let buffer = ...

    let foundLetBuffer = false;

    esprima.parseModule(cliSource, {}, node => {
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

    esprima.parseModule(cliSource, {}, node => {
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

    // const usage = ...

    let foundConstUsage = false;

    esprima.parseModule(infoSource, {}, node => {
      if (
        node.type === "VariableDeclaration" &&
        node.declarations.some(
          declaration => declaration.id.name === "usage"
        ) &&
        node.kind === "const"
      ) {
        foundConstUsage = true;
      }
    });

    expect(
      foundConstUsage,
      "In src/info.js, let's use `const` in our declaration of the `usage` variable"
    ).to.be.true;

    // const help = ...

    let foundConstHelp = false;

    esprima.parseModule(infoSource, {}, node => {
      if (
        node.type === "VariableDeclaration" &&
        node.declarations.some(
          declaration => declaration.id.name === "help"
        ) &&
        node.kind === "const"
      ) {
        foundConstHelp = true;
      }
    });

    expect(
      foundConstHelp,
      "In src/info.js, let's use `const` in our declaration of the `help` variable"
    ).to.be.true;
  });
});
