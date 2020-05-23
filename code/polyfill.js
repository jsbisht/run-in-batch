function loadPolyfills() {
  // https://decembersoft.com/posts/promises-in-serial-with-array-reduce/
  Promise.series = function asyncSeries(tasks) {
    return tasks.reduce((promiseChain, currentTask) => {
      return promiseChain.then((chainResults) =>
        currentTask.then((currentResult) => [...chainResults, currentResult])
      );
    }, Promise.resolve([]));
  };
}

module.exports = loadPolyfills();
