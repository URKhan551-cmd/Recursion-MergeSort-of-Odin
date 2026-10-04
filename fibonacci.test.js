import { jest } from "@jest/globals";
import { fibs, fibsRec } from "./fibonacci.js";

describe("fibs - iterative Fibonacci", () => {
  test("returns an empty array for 0", () => {
    expect(fibs(0)).toEqual([]);
  });

  test("returns [0] for 1", () => {
    expect(fibs(1)).toEqual([0]);
  });

  test("returns [0, 1] for 2", () => {
    expect(fibs(2)).toEqual([0, 1]);
  });

  test("returns the expected sequence for 8", () => {
    expect(fibs(8)).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
  });

  test("works for several different lengths", () => {
    expect(fibs(3)).toEqual([0, 1, 1]);
    expect(fibs(5)).toEqual([0, 1, 1, 2, 3]);
    expect(fibs(10)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
  });

  test("does not mutate anything outside the function", () => {
    expect(fibs(6)).toEqual([0, 1, 1, 2, 3, 5]);
  });

  test.each([-1, 1.5, "8", null, undefined])(
    "rejects invalid length: %p",
    (input) => {
      expect(() => fibs(input)).toThrow(TypeError);
    }
  );
});

describe("fibsRec - recursive Fibonacci", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("returns an empty array for 0", () => {
    expect(fibsRec(0)).toEqual([]);
  });

  test("returns [0] for 1", () => {
    expect(fibsRec(1)).toEqual([0]);
  });

  test("returns [0, 1] for 2", () => {
    expect(fibsRec(2)).toEqual([0, 1]);
  });

  test("returns the expected sequence for 8", () => {
    expect(fibsRec(8)).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
  });

  test("works for several different lengths", () => {
    expect(fibsRec(3)).toEqual([0, 1, 1]);
    expect(fibsRec(5)).toEqual([0, 1, 1, 2, 3]);
    expect(fibsRec(10)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
  });

  test("prints the recursion message while running", () => {
    fibsRec(8);
    expect(console.log).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith("This was printed recursively");
  });

  test.each([-1, 1.5, "8", null, undefined])(
    "rejects invalid length: %p",
    (input) => {
      expect(() => fibsRec(input)).toThrow(TypeError);
    }
  );
});
