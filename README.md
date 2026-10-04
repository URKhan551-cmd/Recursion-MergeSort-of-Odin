# Recursion Practice: Fibonacci & Merge Sort

This project implements two classic recursion exercises from **The Odin Project**:

1. Fibonacci sequence
   - `fibs()` — iterative
   - `fibsRec()` — recursive
2. Merge sort
   - `mergeSort()` — recursive divide-and-conquer sorting

It also includes a Jest test suite covering the expected examples, edge cases, duplicates, negative numbers, invalid input, and the recursive logging demonstration.

---

## 1. Fibonacci Sequence

### Problem

Write a function that receives a number `n` and returns an array containing the first `n` Fibonacci numbers.

Example:

```js
fibs(8);
// [0, 1, 1, 2, 3, 5, 8, 13]
```

### Fibonacci rule

The sequence starts:

```text
0, 1, 1, 2, 3, 5, 8, 13, 21, 34...
```

Each new number is the sum of the previous two:

```text
0 + 1 = 1
1 + 1 = 2
1 + 2 = 3
2 + 3 = 5
3 + 5 = 8
```

---

## 2. Iterative `fibs`

The iterative solution uses a loop.

Conceptually:

```text
start with [0, 1]

repeat until the array has n numbers:
    next = last number + second-last number
    push next

return array
```

Example:

```js
fibs(8);
// [0, 1, 1, 2, 3, 5, 8, 13]
```

### Complexity

For `n` Fibonacci numbers:

- Time: `O(n)`
- Space: `O(n)` because the returned array contains `n` numbers.

---

## 3. Recursive `fibsRec`

The recursive solution asks the same function to solve a smaller version of the problem.

For example:

```text
fibsRec(8)
    ↓
fibsRec(7)
    ↓
fibsRec(6)
    ↓
...
```

The important part is the **base case**.

```js
if (n === 0) return [];
if (n === 1) return [0];
if (n === 2) return [0, 1];
```

Once the function reaches one of these cases, recursion stops.

Then the function builds its way back up:

```text
fibsRec(3)
    previous = fibsRec(2)
    next = 1
    return [0, 1, 1]

fibsRec(4)
    previous = fibsRec(3)
    next = 2
    return [0, 1, 1, 2]
```

### Why the console message prints multiple times

The recursive function contains:

```js
console.log("This was printed recursively");
```

When you run:

```js
fibsRec(8);
```

the function calls itself with smaller values.

Therefore the message appears multiple times.

The exact number depends on where the log is placed and how the recursion is implemented.

### Important distinction

This `fibsRec` implementation is recursive, but it is **not the classic exponential recursive Fibonacci implementation** such as:

```js
fib(n) = fib(n - 1) + fib(n - 2)
```

Instead, it recursively builds the **array** one element at a time.

That means this particular implementation is approximately:

- Time: `O(n²)` due to repeatedly copying arrays with `[...previous, next]`
- Recursion depth: `O(n)`
- Returned data: `O(n)`

This is useful for learning recursion without immediately introducing the much larger branching recursion tree of naive Fibonacci.

---

# 4. Merge Sort

Now we move from Fibonacci to a much more important recursive algorithm:

```text
Merge Sort
```

Example:

```js
mergeSort([3, 2, 1, 13, 8, 5, 0, 1]);

// [0, 1, 1, 2, 3, 5, 8, 13]
```

The key idea is:

> Don't try to sort the entire array at once. Break it into smaller arrays until each array is trivially sorted, then merge the sorted pieces.

---

## 5. Merge sort's base case

The smallest possible useful arrays are:

```js
[]
```

and:

```js
[73]
```

Both are already sorted.

Therefore:

```js
if (array.length <= 1) {
    return [...array];
}
```

This is our recursive stopping condition.

---

## 6. Divide

Suppose we have:

```js
[3, 2, 1, 13, 8, 5, 0, 1]
```

Split it:

```text
[3, 2, 1, 13]       [8, 5, 0, 1]
```

Then split again:

```text
[3, 2] [1, 13]      [8, 5] [0, 1]
```

Then:

```text
[3] [2] [1] [13]    [8] [5] [0] [1]
```

Every array now contains one element.

Every one of those arrays is already sorted.

---

## 7. Merge

Now we start coming back upward.

Merge:

```text
[3]
[2]
```

Compare:

```text
3 vs 2
```

Take `2` first:

```text
[2, 3]
```

Then:

```text
[1]
[13]
```

becomes:

```text
[1, 13]
```

So now:

```text
[2, 3]    [1, 13]
```

Merge them:

```text
2 vs 1 → take 1
2 vs 13 → take 2
3 vs 13 → take 3
then 13
```

Result:

```text
[1, 2, 3, 13]
```

The same thing happens on the right side.

Finally:

```text
[1, 2, 3, 13]
[0, 1, 5, 8]
```

are merged into:

```text
[0, 1, 1, 2, 3, 5, 8, 13]
```

---

# 8. The most important recursion idea

Look at this:

```js
const sortedLeft = mergeSort(left);
const sortedRight = mergeSort(right);
```

This is the heart of the exercise.

We are telling the function:

> "I don't personally need to figure out how to sort `left`. You already know how to sort an array — sort it yourself."

And:

> "You also know how to sort `right`. Do the same thing."

Then our current function only has to solve the final smaller problem:

```js
merge(sortedLeft, sortedRight);
```

This is one of the most important ideas in recursion:

```text
Don't solve the smaller problem yourself.

Delegate it to the same function.
```

---

# 9. Merge operation

The `merge()` function receives two arrays that are **already sorted**.

Example:

```js
left  = [2, 5, 8]
right = [1, 3, 7]
```

We compare the front elements:

```text
2 vs 1 → take 1
2 vs 3 → take 2
5 vs 3 → take 3
5 vs 7 → take 5
8 vs 7 → take 7
8 remains → take 8
```

Result:

```js
[1, 2, 3, 5, 7, 8]
```

That is what `merge()` does.

---

# 10. Merge sort complexity

For an array of `n` elements:

```text
Divide:
n
↓
n/2 + n/2
↓
n/4 + n/4 + n/4 + n/4
↓
...
```

The number of levels is approximately:

```text
log₂(n)
```

At each level, we process approximately `n` elements while merging.

Therefore:

```text
Time = O(n log n)
```

Merge sort's typical auxiliary space is:

```text
O(n)
```

because this implementation creates arrays while splitting and merging.

---

# 11. Run the project

After extracting the project:

```bash
cd recursion-fibonacci-merge-sort
```

Install Jest:

```bash
npm install
```

Run all tests:

```bash
npm test
```

You can also use:

```bash
npm run test:watch
```

for continuous testing.

Coverage:

```bash
npm run test:coverage
```

---

## Included test cases

### Fibonacci

The tests cover:

```text
fibs(0)
fibs(1)
fibs(2)
fibs(3)
fibs(5)
fibs(8)
fibs(10)
```

and the same for `fibsRec`.

They also test invalid lengths such as:

```text
-1
1.5
"8"
null
undefined
```

The recursive version additionally verifies that:

```text
"This was printed recursively"
```

is actually logged.

### Merge Sort

Tests include:

```js
mergeSort([])
// []

mergeSort([73])
// [73]

mergeSort([1, 2, 3, 4, 5])
// [1, 2, 3, 4, 5]

mergeSort([3, 2, 1, 13, 8, 5, 0, 1])
// [0, 1, 1, 2, 3, 5, 8, 13]

mergeSort([105, 79, 100, 110])
// [79, 100, 105, 110]
```

Additional tests cover:

- negative numbers
- duplicate values
- reverse-sorted arrays
- input immutability
- invalid input
- one-element arrays

---

## Suggested learning order

Don't just run the tests and move on.

Work through it in this order:

```text
1. fibs()
      ↓
2. Understand the loop
      ↓
3. fibsRec()
      ↓
4. Trace fibsRec(5) manually
      ↓
5. Understand base case
      ↓
6. Understand recursive case
      ↓
7. mergeSort()
      ↓
8. Trace mergeSort([3, 2, 1, 4])
      ↓
9. Understand merge()
      ↓
10. Run Jest
```

The real goal is not memorizing the code.

The goal is being able to look at:

```js
mergeSort(left)
```

and understand:

> "This function is asking another copy of itself to solve a smaller version of the exact same problem."

That is the recursive thinking you will later use for trees, backtracking, DFS, divide-and-conquer algorithms, and many harder DSA problems.
