/**
 * Chunking using generators and array splice to be efficient on memory.
 * Generator makes sure that we create a chunk only when requested.
 * Array splice makes sure that chuck processed gets freed from memory.
 * @param {Array} arr Array of objects
 */
function* chunk(arr, batch_size) {
  const batch_count = Math.ceil(arr.length / batch_size);
  for (let i = 0; i < batch_count; i++) {
    yield arr.splice(0, batch_size);
  }
}

module.exports = chunk;
