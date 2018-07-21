// #1 Create array from 'array-like' objects
// Array-like => has length-property|&ws=1&we|
const like = { length: 3 };
const emptyArray = Array.from(like);
// => [undefined, undefined, undefined]

// #2 Prefill with index
const mapFn = (_, idx) => idx;
// Okay-way
const mapPost = Array.from(like).map(mapFn);
// ❌ creates unnecessary array before mapping
// ❌ unnecessary map()-call

// Better-way:
const mapDuring = Array.from(like, mapFn);
// ✅ no temporary array
// ✅ more compact
