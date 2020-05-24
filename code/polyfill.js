function loadPolyfills() {
  // https://decembersoft.com/posts/promises-in-serial-with-array-reduce/
  Promise.series = function asyncSeries(tasks) {
    return tasks.reduce((promiseChain, currentTask) => {
      return promiseChain.then((chainResults) =>
        currentTask.then((currentResult) => [...chainResults, currentResult])
      );
    }, Promise.resolve([]));
  };
  // https://stackoverflow.com/questions/48577702/setting-a-timeout-for-each-promise-within-a-promise-all
  Promise.delay = function (t, val) {
    return new Promise((resolve) => {
      setTimeout(resolve.bind(null, val), t);
    });
  };
  Promise.raceAll = function (promises, timeoutTime, timeoutVal) {
    return Promise.all(
      promises.map((p) => {
        return Promise.race([p, Promise.delay(timeoutTime, timeoutVal)]);
      })
    );
  };
}

module.exports = loadPolyfills();
