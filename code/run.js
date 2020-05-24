require("./polyfill");

const chunk = require("./chunk");
const { PARALLEL, SERIES, RACE, TIMEOUT } = require("./constants");

async function run(tasks, options = {}) {
  let results = [];
  const { batchSize } = options;

  const batches = chunk(tasks, batchSize);
  for (const batch of batches) {
    const result = await runBatch(batch, options);
    results = results.concat(result);
    await postRunBatch(batch, options, results);
  }

  return results;
}

async function runBatch(batch, options) {
  const { onTaskRun, taskTimeout, taskTimeoutVal = TIMEOUT } = options;
  let { runType = PARALLEL } = options;

  if (!onTaskRun) return [];
  if (taskTimeout) runType = RACE;

  const tasks = batch.map((task) => onTaskRun(task));

  switch (runType) {
    case PARALLEL:
      return await Promise.all(tasks);
    case SERIES:
      return await Promise.series(tasks);
    case RACE:
      return await Promise.raceAll(tasks, taskTimeout, taskTimeoutVal);
  }
}

async function postRunBatch(batch, options, results) {
  const { onBatchComplete } = options;
  if (!onBatchComplete) return;

  return await onBatchComplete(batch, options, results);
}

module.exports = run;
