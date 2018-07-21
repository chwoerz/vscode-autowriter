// Usage Example:
// Array to Uint8Array
const input = [300, 400];

// new Uint8Array from input with values divided by 2
const div2 = x => x / 2;
const cuttedOff = Uint8Array.from(input).map(div2);
// expected => [150, 200]
// result => [22, 77] because of creating array before mapping

const noCutOff = Uint8Array.from(input, mapFn);
// result => [150, 200]