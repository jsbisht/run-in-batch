const run = require("../code/run");
const request = require("../__mocks__/request");

function getUserName(userID) {
  return request("/users/" + userID).then((user) => user.name);
}

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

  test("if onTaskRun and batch_size is specified, tasks resolve", async () => {
    const userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const options = {
      batch_size: 3,
      onTaskRun: (userID) => getUserName(userID)
    };
    const results = await run(userIds, options);
    expect(results.length).toEqual(13);
  });

  test("if batch_size is specified, tasks execute in batches", async () => {
    const onBatchComplete = jest.fn(() => {});
    const userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const options = {
      batch_size: 3,
      onTaskRun: (userID) => getUserName(userID),
      onBatchComplete
    };
    await run(userIds, options);
    expect(onBatchComplete.mock.calls.length).toBe(5);
  });
});
