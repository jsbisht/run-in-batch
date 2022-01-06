# run-in-batch

Run your task like api calls in batch

## features

- Run either parallely or serially
- Set number of tasks in one batch
- Set timeout for each task
- Callback function for completion of each task
- Callback function post completion of each batch

## install

To install the latest version:

```
npm install --save run-in-batch
```

## examples

To perform one operation per batch, use 'onBatchRun`:

```js
const run = require("run-in-batch");

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const options = {
  batchSize: 3,
  onBatchRun: (value) => Promise.resolve(value)
};
const results = await run(arr, options);
```

To perform one operation for each item in the batch use 'onTaskRun`, while each batch tasks running **concurrently**:

```js
const run = require("run-in-batch");

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const options = {
  batchSize: 3,
  onTaskRun: (value) => Promise.resolve(value)
};
const results = await run(arr, options);
```

To perform one operation for each item in the batch use 'onTaskRun`, while each batch tasks running **sequentially**:

```js
const run = require("run-in-batch");

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const options = {
  runType: "series",
  batchSize: 3,
  onTaskRun: (value) => Promise.resolve(value)
};
const results = await run(arr, options);
```

To use the results, after each batch completes:

```js
const run = require("run-in-batch");

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const options = {
  batchSize: 3,
  onTaskRun: (value) => Promise.resolve(value),
  onBatchComplete: (tasks, options, results) => {
    console.log(`Completed processing of ${results.length} tasks`);
  }
};
const results = await run(arr, options);

// Completed processing of 3 tasks
// Completed processing of 6 tasks
// Completed processing of 9 tasks
// Completed processing of 12 tasks
// Completed processing of 13 tasks
```

To set timeout for each task's execution:

```js
const run = require("run-in-batch");

const userIds = [
  { name: "Alex", time: 150 },
  { name: "Bob", time: 250 },
  { name: "Carol", time: 200 },
  { name: "Dennis", time: 50 },
  { name: "Eric", time: 100 }
];

const options = {
  batchSize: 5,
  onTaskRun: (user) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(user.name), user.time);
    }),
  taskTimeout: 225
};
const results = await run(userIds, options);
// "Alex", "timeout", "Carol", "Dennis", "Eric"
```

## options

### Execute task in a batch parallely or sequentially

**runType** (Default: parallel)

- parallel
- series

### Set number of tasks in one batch

**batchSize** (Optional)

- If not specified, all tasks will execute concurrently
- If specified, tasks are chunked by `batchSize`

### Set timeout for each task

**taskTimeout** (Optional)

- If not specified, all tasks will run indefinately
- If specified, each task races against this timeout. Value specified is considered as milliseconds.

If timeout happens, task would return:

**taskTimeoutVal**

Default value: "timeout"

### Callback function for completion of each task

**onTaskRun** (Optional)

- If not specified, empty array is returned
- If specified, this method is run for each task

### Callback function for completion of each batch

**onBatchRun** (Optional)

- If not specified, you can opt to use `onTaskRun` for each item individually.
- If specified, this method is run for each batch instead of processing each item individually.

### Callback function post completion of each batch

**onBatchComplete** (Optional)

- If not specified, no error is thrown
- If specified, this method is run post each batch completion

### note

The task array passed is spliced directly to optmise memory usage. If you intend to use it later, please clone it before calling `run`.

Also, ES generators are used to fetch batches.
