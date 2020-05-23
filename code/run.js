const chunk = require("./chunk");

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
  const { onTaskRun } = options;
  if (!onTaskRun) return [];

  const tasks = batch;
  tasks.map((task) => onTaskRun(task));
  return await Promise.all(tasks);
}

async function postRunBatch(batch, options) {
  const { onBatchComplete } = options;
  if (!onBatchComplete) return;

  return await onBatchComplete(batch, options);
}

module.exports = run;
