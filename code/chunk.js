/**
 * Chunking using generators and array splice to be efficient on memory.
 * Generator makes sure that we create a chunk only when requested.
 * Array splice makes sure that chuck processed gets freed from memory.
 * @param {Array} arr Array of objects
 * @param {Number} batchSize Batch size
 */
function* chunk(arr = [], batchSize) {
  // TODO change the check
  if (isNaN(batchSize)) yield arr;

  const batch_count = Math.ceil(arr.length / batchSize);
  for (let i = 0; i < batch_count; i++) {
    yield arr.splice(0, batchSize);
  }
}

module.exports = chunk;
