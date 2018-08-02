#0|/**
 * Add/remove entries at the head and tail of arrays
 */ |&ws=2&we|

// the array to work with:|&ws=1&we|
const array = [1, 2, 3, 4, 5];|&ws=2&we|

// remove (and save) last element|&ws=1.5&we|
const poppedItem = array.pop();|&ws=2&we|
// poppedItem => 5
// array => [1, 2, 3, 4]|&ws=2&we|

// remove (and save) first element|&ws=2&we|
const shiftedOut = array.shift();|&ws=2&we|
// shiftedOut => 1
// array => [2, 3, 4]|&ws=2.5&we|

// add element(s) to head of array|&ws=2&we|
const lengthAfterUnshift = array.unshift(10, 9);|&ws=2&we|
// lengthAfterUnshift = 5
// array => [10, 9, 2, 3, 4]|&ws=2&we|

// add element(s) to head of array|&ws=2&we|
const lengthAfterPush = array.push(99, 100);|&ws=2&we|
// lengthAfterPush => 7
// array => [10, 9, 2, 3, 4]|&ws=2&we|

// @snippet_js