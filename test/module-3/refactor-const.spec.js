const { expect } = require("chai");
const esprima = require("esprima");
const fs = require("fs");
const { describe, it } = require("mocha");
const path = require("path");

const source = fs.readFileSync(
  path.join(process.cwd(), "src/index.js"),
  "utf8"
);

describe("Main Module (src/index.js)", () => {
  it("should use `const` for `transformLineEnding`, `LineEndings`, and `LineEndingReplacements` @refactor-const", () => {
    // const transformLineEnding = ...

    let foundTransformLineEndingConst = false;

    esprima.parseModule(source, {}, node => {
      if (
        node.type === "VariableDeclaration" &&
        node.declarations.some(
          declaration => declaration.id.name === "transformLineEnding"
        ) &&
        node.kind === "const"
      ) {
        foundTransformLineEndingConst = true;
      }
    });

    expect(
      foundTransformLineEndingConst,
      "In src/index.js, let's use `const` in our declaration of the `transformLineEnding` variable"
    ).to.be.true;

    // const LineEndings = ...

    let foundLineEndingsConst = false;

    esprima.parseModule(source, {}, node => {
      if (
        node.type === "VariableDeclaration" &&
        node.declarations.some(
          declaration => declaration.id.name === "LineEndings"
        ) &&
        node.kind === "const"
      ) {
        foundLineEndingsConst = true;
      }
    });

    expect(
      foundLineEndingsConst,
      "In src/index.js, we want to use `const` in our declaration of the `LineEndings` variable"
    ).to.be.true;

    // const LineEndingReplacements = ...

    let foundLineEndingReplacementsConst = false;

    esprima.parseModule(source, {}, node => {
      if (
        node.type === "VariableDeclaration" &&
        node.declarations.some(
          declaration => declaration.id.name === "LineEndingReplacements"
        ) &&
        node.kind === "const"
      ) {
        foundLineEndingReplacementsConst = true;
      }
    });

    expect(
      foundLineEndingReplacementsConst,
      "In src/index.js, let's use `const` in our declaration of the `LineEndingReplacements` variable"
    ).to.be.true;
  });
});
