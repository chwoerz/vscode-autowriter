// filter empty, null, undefined from string array
const stringArray = ['h', 'e', '', 'l', '', 'l', undefined, null, 'o'];
const filtered = stringArray.filter(s => s);
// => ['h', 'e', 'l', 'l', 'o']

// ⚠️ Also removes all falsy values like 0, false etc.