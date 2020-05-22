const chunk = require("./chunk");

async function run(tasks, options = {}) {
  const results = [];
  const { batch_size } = options;

  const batches = chunk(tasks, batch_size);
  for (const batch of batches) {
    const result = await runBatch(batch, options);
    results.concat(result);
  }
  return results;
}

async function runBatch(batch, options) {
  const { onTaskRun } = options;
  if (!onTaskRun) return [];

  const tasks = batch;
  tasks.map((task) => {
    onTaskRun(task);
  });
  return await Promise.all(tasks);
}

module.exports = run;

run();
