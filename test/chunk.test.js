const chunk = require("../code/chunk");

describe("test if chunk creation", () => {
  test("batchSize is not passed, all items should be returned", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const chunks = chunk(arr);
    const chunks_size = chunks.next().value.length;
    expect(chunks_size).toEqual(arr.length);
  });

  test("integer array chunking", () => {
    const batchSize = 3;
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const chunks = chunk(arr, batchSize);

    expect(chunks.next().value).toEqual(expect.arrayContaining([1, 2, 3]));
    expect(chunks.next().value).toEqual(expect.arrayContaining([4, 5, 6]));
    expect(chunks.next().value).toEqual(expect.arrayContaining([7, 8, 9]));
    expect(chunks.next().value).toEqual(expect.arrayContaining([10, 11, 12]));
    expect(chunks.next().value).toEqual(expect.arrayContaining([13]));
  });

  test("object array chunking", () => {
    const batchSize = 3;
    const arr = [
      { x: 1 },
      { x: 2 },
      { y: 3 },
      { x: 4 },
      { x: 5 },
      { x: 6 },
      { x: 7 },
      { x: 8 },
      { x: 9 },
      { x: 10 },
      { x: 11 },
      { x: 12 },
      { x: 13 }
    ];
    const chunks = chunk(arr, batchSize);

    expect(chunks.next().value).toEqual(
      expect.arrayContaining([{ x: 1 }, { x: 2 }, { y: 3 }])
    );
    expect(chunks.next().value).toEqual(
      expect.arrayContaining([{ x: 4 }, { x: 5 }, { x: 6 }])
    );
    expect(chunks.next().value).toEqual(
      expect.arrayContaining([{ x: 7 }, { x: 8 }, { x: 9 }])
    );
    expect(chunks.next().value).toEqual(
      expect.arrayContaining([{ x: 10 }, { x: 11 }, { x: 12 }])
    );
    expect(chunks.next().value).toEqual(expect.arrayContaining([{ x: 13 }]));
  });
});
