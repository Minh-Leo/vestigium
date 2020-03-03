const AFINN = require("./sentiment.json")

function tokenize(input) {
  return input
          .toLowerCase()
          .split(" ");
}

function deleteUselessChars(input) {
  return input.replace(/[^\w]/g, "");
}

function rateWord(input) {
  return (input in AFINN) ? AFINN[input] : 0;
}

function sum(x, y) {
  return x + y;
}

function analyze(input) {
  return tokenize(input)
          .map(deleteUselessChars)
          .map(rateWord)
          .reduce(sum);
}

export { analyze };
