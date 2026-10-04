/**
  Recursive Merge Sort
  mergeSort([3, 2, 1, 13, 8, 5, 0, 1])
  -> [0, 1, 1, 2, 3, 5, 8, 13]
 */

/**
 * Sort an array using recursive merge sort.
 */
export function mergeSort(array) {
  if (!Array.isArray(array)) {
    throw new TypeError("mergeSort expects an array.");
  }

  // Base case:
  // An array with 0 or 1 element is already sorted.
  if (array.length <= 1) {
    return [...array];
  }

  // Divide the array into two halves.
  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  // Delegate sorting each half to mergeSort itself.
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  // Combine the two sorted halves.
  return merge(sortedLeft, sortedRight);
}

/**
 Merge two already-sorted arrays into one sorted array.
 */
function merge(left, right) {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // One side may still contain elements.
  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }

  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }

  return result;
}
