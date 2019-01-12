const chai = require("chai");
const assert = chai.assert;

const { restartDatabase, killDatabase } = require("./test-utilities");

describe("cleaning", () => {
  after(done => {
    killDatabase(done);
  });

  it("close connection", () => {
    assert.equal(true, true);
  });
});
