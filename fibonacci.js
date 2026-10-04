/**
 * Fibonacci sequence practice
 *
 * fibs(8) -> [0, 1, 1, 2, 3, 5, 8, 13]
 */

/* 
 Iterative Fibonacci.
 */
export function fibs(n) {
  validateLength(n);

  if (n === 0) return [];

  const result = [0];

  if (n === 1) return result; 
// if we do have one element in an array with zero [0, 1] if we wanna add thrid element
  result.push(1);

  for (let i = 2; i < n; i++) {
    const next = result[i - 1] + result[i - 2];  // result[0, 1]  here i=2 so i-1 + i - 2  = 1 + 0= 1 = result[0, 1, 1] 
    result.push(next);
  }

  return result;
}

/**
 * Recursive Fibonacci.
 *
 * The recursion works by asking:
 * "What are the previous two Fibonacci numbers?"
 *
 * fibsRec(8)
 *   -> fibsRec(7) + fibsRec(6)
 *   -> ...5, 4, 3
 */
export function fibsRec(n) {
  validateLength(n);

  // Odin Project recursion demonstration:
  console.log("This was printed recursively");

  if (n === 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  const previous = fibsRec(n - 1);
  const next = previous[previous.length - 1] + previous[previous.length - 2]; // previous is an arr[0, 1] prev.length=2 

  return [...previous, next];  // spreaded previous , next have holds new sum value.
}

function validateLength(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new TypeError("The length must be a non-negative integer.");
  }
}
