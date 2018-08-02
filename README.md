# Autowriting possibility for VSCode (Work in progress

## Tl;dr
I've wanted to create a "smooth" programming presentation using VSCode. But because I've made to many mistakes while typing, I've decided to create an extension to write the code automatically.

# Example:
![Example video](https://media.giphy.com/media/xkEOBaUdKYiFhXikBw/giphy.gif)



# How to use the extension?
Because it's work in progress, you need to open the project in your VSCode and start the extension.ts using the debugger. In the opened vscode, just open the prepared file(example.js for example) and start the "Autowriter" command. This will create another file with the same filename as the one which was opened when the command was executed. For example if you use the example.js file, a tt.example.js file will be created and written into it.

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
#0|class Example {
    #5|aMethod() {
        #7|const aLine = 'hello';
        const anotherLine = 'again';
    #6|} 
    #8|// After this line, autowriter will wait for 2 seconds  |&ws=2&we|
    // And now it's done
    #2|// this method will be written first
    anotherMethod() {
        #4|console.log('first');
    #3|}
#1|}


```
