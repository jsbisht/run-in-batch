const chunk = require("./chunk");

async function run(tasks, options = {}) {
  const results = [];
  const { batch_size } = options;

  const batches = chunk(tasks, batch_size);
  for (const batch of batches) {
    const result = await Promise.all(batch);
    results.concat(result);
  }
  return results;
}

module.exports = run;
