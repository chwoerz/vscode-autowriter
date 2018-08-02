# Autowriting possibility for VSCode

## Tl;dr
I've wanted to create a "smooth" programming presentation using VSCode. But because I've made to many mistakes while typing, I've decided to create an extension to write the code automatically.

# How to initialize the code?
1. Create the code you wanted to have typed:
```javascript
class Example {
    aMethod() {
        const aLine = 'hello';
        const anotherLine = 'again';
    }

    // this method will be written first
    anotherMethod() {
        console.log('first');
    }
}
```

2. Add the autowriter markers. The following are available until now:
   - `#x|` : You are able set a sequence in which order the code will be written. 
   - `|&ws=X&we|` : By adding this suffix to a line, the writer will wait X seconds before continuing. 

This added to the code will look like that:
```javascript
#2|class Example {
    #1|aMethod() {
        const aLine = 'hello';
        const anotherLine = 'again';
    }//Here will be waited 2 seconds|&ws=2&we|

    #0|// this method will be written first
    anotherMethod() {
        console.log('first');
    }
#3|}
```
