#2|const inputArray = [300,500,400,4,5];
// Create a new array with each value from inputArray doubled...

// Well known way:|&ws=2&we|
#0|const doubleIt = Array.from(inputArray).map(entry => entry * 2);

// Easier way:|&ws=3&we|
#1|const easyDouble = Array.from(inputArray, entry => entry * 2);
// Why?
// 1. No unnecessary temporary array gets created
// 2. Useful especially for array like Int8Array, 
//    where things like these could happen:
const mapFn = entry => Math.min(255, entry);
const mapAfter = Int8Array.from(inputArray).map(mapFn);
// => values get cut off prior mapping
const mapDuring = Int8Array.from(inputArray, mapFn);
// => values can get mapped