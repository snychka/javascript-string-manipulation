const { expect } = require("chai");
const { describe, it } = require("mocha");

describe("Main Module (src/index.js)", () => {
  it("should use symbols for `LineEndings` values @use-string-raw", () => {
    const { LineEndings } = require("../../src/index.js");

    expect(
      typeof LineEndings.CR === "symbol",
      "In src/index.js, change the value of `LineEndings.CR` to be a symbol"
    ).to.be.true;

    expect(
      LineEndings.CR.toString() === "Symbol(CR)",
      "In src/index.js, use `\"CR\"` as the descriptor of the `LineEndings.CR` symbol"
    ).to.be.true;

    expect(
      typeof LineEndings.LF === "symbol",
      "In src/index.js, change the value of `LineEndings.LF` to be a symbol"
    ).to.be.true;

    expect(
      LineEndings.LF.toString() === "Symbol(LF)",
      "In src/index.js, use `\"LF\"` as the descriptor of the `LineEndings.LF` symbol"
    ).to.be.true;

    expect(
      typeof LineEndings.CRLF === "symbol",
      "In src/index.js, change the value of `LineEndings.CRLF` to be a symbol"
    ).to.be.true;

    expect(
      LineEndings.CRLF.toString() === "Symbol(CRLF)",
      "In src/index.js, use `\"CRLF\"` as the descriptor of the `LineEndings.CRLF` symbol"
    ).to.be.true;
  });
});
