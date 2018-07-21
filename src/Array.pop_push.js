const array = [1, 2, 3, 4, 5];

// remove last entry
const poppedItem = array.pop();
// => 5
// array => [1, 2, 3, 4]

// remove first entry
const shiftedOut = array.shift();
// => 1
// array => [2, 3, 4]

// add element on first position
const newArrayLength = array.unshift(10, 9);
// array => [10, 9, 2, 3, 4]