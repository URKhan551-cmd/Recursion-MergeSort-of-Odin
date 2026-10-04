import { mergeSort } from "./mergeSort.js";

describe("mergeSort", () => {
  test("sorts an empty array", () => {
    expect(mergeSort([])).toEqual([]);
  });

  test("returns a one-element array unchanged", () => {
    expect(mergeSort([73])).toEqual([73]);
  });

  test("keeps an already sorted array sorted", () => {
    expect(mergeSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  test("sorts the main Odin Project example", () => {
    expect(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]))
      .toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
  });

  test("sorts another Odin Project example", () => {
    expect(mergeSort([105, 79, 100, 110]))
      .toEqual([79, 100, 105, 110]);
  });

  test("sorts negative numbers", () => {
    expect(mergeSort([3, -2, 0, -10, 8, -2]))
      .toEqual([-10, -2, -2, 0, 3, 8]);
  });

  test("handles duplicate values", () => {
    expect(mergeSort([5, 1, 5, 2, 1, 5]))
      .toEqual([1, 1, 2, 5, 5, 5]);
  });

  test("handles an already reverse-sorted array", () => {
    expect(mergeSort([9, 8, 7, 6, 5, 4, 3, 2, 1]))
      .toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test("does not mutate the original array", () => {
    const input = [4, 2, 7, 1];
    const copy = [...input];

    const result = mergeSort(input);

    expect(result).toEqual([1, 2, 4, 7]);
    expect(input).toEqual(copy);
  });

  test("returns a new array for a one-element input", () => {
    const input = [73];
    const result = mergeSort(input);

    expect(result).toEqual([73]);
    expect(result).not.toBe(input);
  });

  test("rejects a non-array input", () => {
    expect(() => mergeSort(null)).toThrow(TypeError);
    expect(() => mergeSort("321")).toThrow(TypeError);
    expect(() => mergeSort(123)).toThrow(TypeError);
  });
});
