const run = require("../code/run");

describe("test running in batch", () => {
  test("if task or option is specified not specified, empty array is returned", () => {
    const result = run();
    expect(result).resolves.toEqual([]);
  });

  test("if onTaskRun is specified, tasks resolve", async () => {
    const arr = [1, 2, 3];
    const options = {
      onTaskRun: (value) => Promise.resolve(value)
    };
    const results = await run(arr, options);
    expect(results).toEqual([1, 2, 3]);
  });
});
