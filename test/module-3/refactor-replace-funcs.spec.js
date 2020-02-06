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
  it("should destructure the `LineEndingReplacements` variable within `transformLineEnding` @refactor-replace-funcs", () => {
    let foundDestructure = false;

    esprima.parseModule(source, {}, node => {
      if (
        node.type === "VariableDeclarator" &&
        node.id != null &&
        node.id.type === "ObjectPattern" &&
        node.id.properties.some(
          property => property.value.name === "replaceCR"
        ) &&
        node.id.properties.some(
          property => property.value.name === "replaceLF"
        ) &&
        node.id.properties.some(
          property => property.value.name === "replaceCRLF"
        )
      ) {
        foundDestructure = true;
      }
    });

    expect(
      foundDestructure,
      "In src/index.js, let's use object destructuring to extract `replaceCR`, `replaceLF`, and `replaceCRLF` inside the `transformLineEnding` function"
    ).to.be.true;
  });
});
