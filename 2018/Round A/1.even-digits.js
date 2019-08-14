const isAllEven = num => {
  return (
    num
      .toString()
      .split('')
      .filter(x => x % 2 !== 0).length == 0
  );
};

const getMovementsCount = num => {
  let a = num;
  let b = num;
  while (!isAllEven(a)) {
    a++;
  }
  while (!isAllEven(b)) {
    b--;
  }
  const upwardMovementCount = a - num;
  const downwardMovmentCount = num - b;
  return upwardMovementCount > downwardMovmentCount ? downwardMovmentCount : upwardMovementCount;
};

console.time('start');
console.log(getMovementsCount(42));
console.log(getMovementsCount(11));
console.log(getMovementsCount(1));
console.log(getMovementsCount(2018));
console.timeEnd('start');
