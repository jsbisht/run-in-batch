require("./polyfill");

const chunk = require("./chunk");
const { PARALLEL, SERIES } = require("./constants");

async function run(tasks, options = {}) {
  let results = [];
  const { batch_size } = options;

  const batches = chunk(tasks, batch_size);
  for (const batch of batches) {
    const result = await runBatch(batch, options);
    results = results.concat(result);
    await postRunBatch(batch, options);
  }
  return results;
}

async function runBatch(batch, options) {
  const { onTaskRun, runType = PARALLEL } = options;
  if (!onTaskRun) return [];

  const tasks = batch.map((task) => onTaskRun(task));
  if (runType === PARALLEL) return await Promise.all(tasks);
  if (runType === SERIES) return await Promise.series(tasks);
}

async function postRunBatch(batch, options) {
  const { onBatchComplete } = options;
  if (!onBatchComplete) return;

  return await onBatchComplete(batch, options);
}

module.exports = run;
