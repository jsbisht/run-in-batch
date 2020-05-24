const run = require("../code/run");
const request = require("../__mocks__/request");
const { PARALLEL, SERIES } = require("../code/constants");

function getUserName(userID, responseTime = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      request("/users/" + userID).then((user) => resolve(user.name));
    }, responseTime);
  });
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
      onTaskRun: (value) => Promise.resolve(value)
    };
    const results = await run(userIds, options);
    expect(results.length).toEqual(13);
  });

  test("if onTaskRun and batch_size is specified, check resoled values", async () => {
    const userIds = [1, 2, 3, 4, 5];
    const options = {
      batch_size: 5,
      onTaskRun: (userID) => getUserName(userID)
    };
    const results = await run(userIds, options);
    expect(results).toEqual(["Alex", "Bob", "Carol", "Dennis", "Eric"]);
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

  test("if runType is serial, batch should execute task serially", async () => {
    const spy = jest.spyOn(Promise, "series");
    const userIds = [
      { id: 1, time: 150 },
      { id: 2, time: 250 },
      { id: 3, time: 200 },
      { id: 4, time: 50 },
      { id: 5, time: 100 }
    ];
    const options = {
      batch_size: 5,
      onTaskRun: (user) => getUserName(user.id, user.time),
      runType: SERIES
    };
    await run(userIds, options);
    expect(spy).toHaveBeenCalled();
  });

  test("if runType is parallel, batch should execute task parallely", async () => {
    const spy = jest.spyOn(Promise, "all");
    const userIds = [
      { id: 1, time: 150 },
      { id: 2, time: 250 },
      { id: 3, time: 200 },
      { id: 4, time: 50 },
      { id: 5, time: 100 }
    ];
    const options = {
      batch_size: 5,
      onTaskRun: (user) => getUserName(user.id, user.time),
      runType: PARALLEL
    };
    await run(userIds, options);
    expect(spy).toHaveBeenCalled();
  });
});
