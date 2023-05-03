// You're working with an intern that keeps coming to you with JavaScript code that won't run because the braces,
// brackets, and parentheses are off. To save you both some time, you decide to write a braces/brackets/parentheses validator.
// Let's say:
// '(', '{', '[' are called "openers."
// ')', '}', ']' are called "closers."
// Write an efficient function that tells us whether or not an input string's openers and closers are properly nested.
// Examples:
// "{ [ ] ( ) }" should return true
// "{ [ ( ] ) }" should return false
// "{ [ }" should return false
// Gotchas
// Simply making sure each opener has a corresponding closer is not enough—we must also confirm that they are correctly ordered.
// For example, "{ [ ( ] ) }" should return false, even though each opener can be matched to a closer.
// We can do this in O(n) time and space. One iteration is all we need!

const assertEqual = require('./assertEqual');

function isValid(code) {
  const openers = "([{";
  const closers = ")]}";
  const stack = [];

  for (let i = 0; i < code.length; i++) {
    const char = code[i];
    if (openers.includes(char)) {
      const closerIndex = openers.indexOf(char);
      stack.push(closers[closerIndex]);
    } else if (closers.includes(char)) {
      if (!stack.length || stack.pop() !== char) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

// Tests

let desc = "valid short code";
assertEqual(isValid("()"), true, desc);

desc = "valid longer code";
assertEqual(isValid("([]{[]})[]{{}()}"), true, desc);

desc = "mismatched opener and closer";
assertEqual(isValid("([][]}"), false, desc);

desc = "missing closer";
assertEqual(isValid("[[]()"), false, desc);

desc = "extra closer";
assertEqual(isValid("[[]]())"), false, desc);

desc = "empty string";
assertEqual(isValid(""), true, desc);
