const fs = require('fs');
const path = require('path');
const readline = require('readline');

const isAllEven = num => {
  if (num < 10) return num % 2 === 0;
  return isAllEven(num % 10) && isAllEven(parseInt(num / 10));
};

const getMovementsCount = num => {
  if (isAllEven(num)) return 0;
  let a = num;
  let b = num;
  while (1) {
    if (isAllEven(a)) return a - num;
    if (isAllEven(b)) return num - b;
    a += 1;
    b -= 1;
  }
};

async function readData(filePath) {
  return new Promise(resolve => {
    const contentLines = [];
    readline
      .createInterface({
        input: process.env.NODE_ENV === 'test' ? fs.createReadStream(filePath) : process.stdin,
      })
      .on('line', line => contentLines.push(line))
      .on('close', () => {
        contentLines.shift();
        const data = [];
        contentLines.forEach(v => data.push(v));
        return resolve(data);
      });
  });
}

const filePath = path.join(__dirname, 'input-samples', 'even-digits.txt');
readData(filePath).then(input => {
  input.forEach((data, idx) => {
    const answer = getMovementsCount(Number(data));
    console.log(`Case #${idx + 1}: ${answer}`);
  });
});
