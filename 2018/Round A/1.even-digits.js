const isAllEvenString = num => {
  if (num < 10) return num % 2 === 0 ? 0 : 1;
  return (
    num
      .toString()
      .split('')
      .filter(x => x % 2 !== 0).length == 0
  );
};

const isAllEvenNumber = num => {
  if (num < 10) return num % 2 == 0;
  return isAllEvenNumber(num % 10) && isAllEvenNumber(parseInt(num / 10));
};

const getMovementsCount = (num, useStrFunction) => {
  const isAllEven = useStrFunction ? isAllEvenString : isAllEvenNumber;
  if (isAllEven(num)) return 0;
  let a = num;
  let b = num;
  while (!isAllEven(a)) {
    a++;
  }
  while (!isAllEven(b)) {
    b--;
  }
  const upwardMovementCount = a - num;
  const downwardMovementCount = num - b;
  return upwardMovementCount > downwardMovementCount ? -downwardMovementCount : upwardMovementCount;
};

const tests = [1, 42, 2018, 3179, 113797, 3373797, 33373797, 733373797];

console.time('Number function');
tests.forEach(getMovementsCount);
console.timeEnd('Number function');

console.time('String function');
tests.forEach(input => getMovementsCount(input, 1));
console.timeEnd('String function');
