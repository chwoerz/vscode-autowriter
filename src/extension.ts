'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "autowriter" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.autowrite', () => {
        // The code you place here will be executed every time your command is executed

        autowrite();
    });
    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

interface Line {
    finalPos: number;
    writePos: number;
    txt: string;
    waitSecsAfter: number;
}

interface WrapperEntry {
    [writePos: number] : Array<Line>;
}

async function autowrite() {
    const lb = '\n';
    let txt = fs.readFileSync('/Users/christian/projects/writer-extension/autowriter/src/Array.from.js', 'utf8');
    let lastBlockNr = 0;

    const wrapper = txt.replace(/    /g, '\t').split('\n').map((line, idx) => {
        const trimmedLine = line.trim();
        let waitSecsAfter = 0;
        const waitStart = '|&ws=';
        const waitEnd = '&we|';
        if(trimmedLine.includes(waitStart)) {
            const waitPart = trimmedLine.indexOf(waitStart);
            const startIndex = waitPart + waitStart.length;
            const endIndex = trimmedLine.indexOf(waitEnd);
            waitSecsAfter = +trimmedLine.substring(startIndex, endIndex);
            line = line.substring(0, trimmedLine.indexOf(waitStart));
        }
        if (trimmedLine.startsWith('#')) {
            const nr = +trimmedLine.substring(1, trimmedLine.indexOf('|'));
            const tabs = line.substring(0, line.indexOf('#'));
            const code = line.substring(line.indexOf('|')+1);
            const newBlock: Line = {
                finalPos: idx,
                writePos: nr,
                txt: tabs + code,
                waitSecsAfter
            };
            lastBlockNr = nr;
            return newBlock;
        } else {
            const newEntryInBlock: Line = {
                finalPos: idx,
                writePos: lastBlockNr,
                txt: line,
                waitSecsAfter
            };
            return newEntryInBlock;
        }
    }).reduce((acc: WrapperEntry, cur:Line) => {
        if (acc[cur.writePos]) {
            acc[cur.writePos].push(cur);
            return acc;
        } else {
            acc[cur.writePos] = [cur];
            return acc;
        }
    }, {} as WrapperEntry);
    console.log(wrapper);
    let writtenEntries = [];
    let sim = [];
    let enterAfterLine;
    for (const entry in Object.keys(wrapper)) {
        const writePosEntries: Array<Line> = wrapper[entry];
        for (const subEntry of writePosEntries) {
            enterAfterLine = -1;
            const amountSmallerThan = writtenEntries.filter(e => e.finalPos < subEntry.finalPos).length - 1;
            enterAfterLine = amountSmallerThan;
            sim.push({
                afterline: enterAfterLine,
                subEntry: subEntry
            });
            writtenEntries.push(subEntry);
        }
    }
    const editor = vscode.window.activeTextEditor;
    const line0left = new vscode.Position(0, 0);
    if (editor) {
        const enterLineOnTop = async (entry: Line) => {
            await editor.edit(editBuilder => {
                editBuilder.insert(line0left, lb);
            });
            await enterCharsOnLine(0, entry);
        };

        const enterLine = async (lineBefore: number, entry: Line) => {
            const position = new vscode.Position(lineBefore, 300);
            await editor.edit(editBuilder => {
                editBuilder.insert(position, lb);
            });
            await enterCharsOnLine(lineBefore+1, entry);
        };

        const enterCharsOnLine = async (line: number, entry: Line) => {
            const strArr = [...entry.txt];
            for (let i = 0; i < strArr.length; i++) {
                const enterPosition = new vscode.Position(line, i);
                const newPosition = new vscode.Position(line, i+1);
                const char = strArr[i];
                await editor.edit(editBuilder => {
                    editBuilder.insert(enterPosition, char);
                });
                editor.selection = new vscode.Selection(newPosition, newPosition);
                await sleep(60);
            }
            await sleep(entry.waitSecsAfter * 1000);
        };

        for (const entry of sim) {
            if (entry.afterline === -1) {
                await enterLineOnTop(entry.subEntry);
            } else {
                await enterLine(entry.afterline, entry.subEntry);
            }
        }
    }
}


function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}