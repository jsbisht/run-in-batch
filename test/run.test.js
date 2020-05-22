const run = require("../code/run");

describe("test run in batch", () => {
  test("if task or option is specified not specified, empty array is returned", () => {
    const result = run();
    expect(result).resolves.toEqual([]);
  });
});
