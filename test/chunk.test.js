const chunk = require("../code/chunk");

describe("test if chunk creation", () => {
  test("basic test", () => {
    const batch_size = 3;
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const chunks = chunk(arr, batch_size);

    expect(chunks.next().value).toEqual(expect.arrayContaining([1, 2, 3]));
    expect(chunks.next().value).toEqual(expect.arrayContaining([4, 5, 6]));
    expect(chunks.next().value).toEqual(expect.arrayContaining([7, 8, 9]));
    expect(chunks.next().value).toEqual(expect.arrayContaining([10, 11, 12]));
    expect(chunks.next().value).toEqual(expect.arrayContaining([13]));
  });
});
