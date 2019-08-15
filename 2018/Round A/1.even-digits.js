const isAllEven = num => {
  if (num < 10) return num % 2 === 0 ? 0 : 1;
  return (
    num
      .toString()
      .split('')
      .filter(x => x % 2 !== 0).length == 0
  );
};

const getMovementsCount = num => {
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

console.time('start');
console.log(getMovementsCount(1));
console.log(getMovementsCount(11));
console.log(getMovementsCount(42));
console.log(getMovementsCount(2018));
console.log(getMovementsCount(3179));
console.log(getMovementsCount(113797));
console.log(getMovementsCount(373797));
console.timeEnd('start');
