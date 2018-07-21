const address = {
    street: 'Devroad',
    nr: '100',
    postal: '1010'
};

// Object destructuring assignment
const {street, nr} = address;
// => street = address.street
// => nr = address.nr

// Array destructuring
let somePrimes = [1, 2, 3, 5, 7, 11, 13];
let [first, second, ...other] = somePrimes;
// first => 1
// second => 2
// other => [3, 5, 7, 11, 13];