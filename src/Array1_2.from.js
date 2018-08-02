/**
 * Array.from() more than just [...arr] in disguise
 */ |&ws=1.5&we|

// Use 'Array-like' object as input |&ws=0.5&we|
const like = { length: 3 };|&ws=0.5&we|
const emptyArray = Array.from(like);
// emptyArray => [undefined, undefined, undefined]|&ws=1&we|

// Initialize the array using the index
// Well known way: Use map() on the created array|&ws=1&we|
const mapPost = Array.from(like).map((_, idx) => idx);|&ws=1&we|
// ❌ creates unnecessary array before mapping|&ws=1&we|

// Better way: use from()'s second argument => a mapping function|&ws=1&we|
const mapDuring = Array.from(like, (_, idx) => idx);|&ws=1&we|
// ✅ no temporary array|&ws=1.5&we|

// Example, why to use the second approach|&ws=1&we|
const input = [300, 400];|&ws=1&we|

// create a new Uint8Array from input with values divided by 2|&ws=1&we|
const overflowed = Uint8Array.from(input).map(x => x / 2); |&ws=2&we|
// overflowed => [22, 72]
// not [150, 200], because of overflow in temporary array|&ws=1&we|

const noCutOff = Uint8Array.from(input, x => x / 2);|&ws=1&we|
// noCutOff => [150, 200], result as expected