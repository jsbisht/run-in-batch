const run = require("../code/run");

describe("test run in batch", () => {
  test("should not throw when no task or option is specified", () => {
    run();
  });
});
