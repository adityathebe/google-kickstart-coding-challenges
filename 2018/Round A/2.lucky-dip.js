/*
 Problem :: You are participating in the Grand Kickstart Lucky Dip with many fantastic and amazing prizes (and some not so good ones)!
 
 In this Lucky Dip, there is a bag with N items. The i-th item in the bag has value Vi. 
 You will put your hand into the bag and draw one item at random; all items in the bag have an equal probability of being chosen. 
 The organizers want contestants to feel that they have some element of choice, so after you draw an item, 
 you can either keep it, or "redip" by returning it to the bag and drawing again. 
 (Note that the returned item is now just as likely to be chosen as any of the other items in the bag.) 
 You may only redip a maximum of K times. 
 If you use K redips, you must keep the item that you draw on your (K + 1)-th draw.
 
 If you play optimally to maximize the value of the item you will end the game with, what is the expected value of that item?

 N items
 Value(ith element) = Vi
 K redips at max

 Input :: The input starts with one line containing one integer T: the number of test cases. T test cases follow.

 Each test case consists of two lines. 
 The first line consists of two integers N and K: the number of items in the bag, and the maximum number of times you may redip. 
 The second line consists of N integers Vi, each representing the value of the i-th item.

 Output :: For each test case, output one line containing Case #x: y, 
 where x is the test case number (starting from 1) and y is the expected value described above.
 Your answer will be considered correct if it is within an absolute or relative error of 10-6 of the correct answer.
 See the FAQ for an explanation of what that means, and what formats of real numbers we accept.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

function main(items, maxRedips) {
  const itemSize = items.length;
  let bestItem = 0;

  // Generate hashmap
  const hashMap = {};
  for (const item of items) {
    hashMap[item] = hashMap[item] ? hashMap[item] + 1 : 1;
    if (item > bestItem) {
      bestItem = item;
    }
  }

  // Establish probability hash map & Perform redips
  let redipsAvailable = maxRedips;
  let bestEstimatedValue = 0;
  const probabilityHashMap = {};
  do {
    for (const item in hashMap) {
      const frequency = hashMap[item];
      const probability = frequency / itemSize;
      probabilityHashMap[item] = probabilityHashMap[item] ? probabilityHashMap[item] * probability : probability;
    }

    // Measure estimated value
    let estimatedValueComp = 0;
    let complementProbability = 0;
    for (const item in hashMap) {
      if (Number(item) == bestItem) continue;
      estimatedValueComp += probabilityHashMap[item] * Number(item);
      complementProbability += probabilityHashMap[item];
    }
    const estimatedValue = bestItem * (1 - complementProbability) + estimatedValueComp;

    redipsAvailable -= 1;
    if (estimatedValue <= bestEstimatedValue) continue;
    bestEstimatedValue = estimatedValue;
  } while (redipsAvailable >= 0);

  return bestEstimatedValue;
}

async function readData(filePath) {
  return new Promise(resolve => {
    const contentLines = [];
    readline
      .createInterface({
        input: process.env.NODE_ENV === 'test' ? fs.createReadStream(filePath) : process.stdin,
      })
      .on('line', function(line) {
        contentLines.push(line);
      })
      .on('close', () => {
        contentLines.shift();
        const data = [];
        contentLines.forEach((line, idx) => {
          if (idx % 2 == 0) {
            data.push({ maxRedips: line.split(' ')[1] });
          } else {
            data[data.length - 1].items = line.split(' ');
          }
        });
        return resolve(data);
      });
  });
}

const filePath = process.argv[2] || path.join(__dirname, 'input-samples', 'lucky-dips.txt');
readData(filePath).then(input => {
  input.forEach((data, idx) => {
    const { maxRedips, items } = data;
    const answer = main(items, maxRedips);
    console.log(`Case #${idx + 1}: ${answer.toFixed(6)}`);
  });
});
