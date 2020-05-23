const users = {
  1: { name: "Alex" },
  2: { name: "Bob" },
  3: { name: "Carol" },
  4: { name: "Dennis" },
  5: { name: "Eric" },
  6: { name: "Francis" },
  7: { name: "Gabriel" },
  8: { name: "Henry" },
  9: { name: "Isaac" },
  10: { name: "Jagdeep" },
  11: { name: "Kevin" },
  12: { name: "Larry" },
  13: { name: "Micheal" }
};

function request(url) {
  return new Promise((resolve, reject) => {
    const userID = parseInt(url.substr("/users/".length), 10);
    process.nextTick(() =>
      users[userID]
        ? resolve(users[userID])
        : reject({
            error: "User with " + userID + " not found."
          })
    );
  });
}

module.exports = request;
