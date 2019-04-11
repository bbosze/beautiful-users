const getNumber = (value) => {
  return value.toString().length < 2
  ? false
  : isNaN(value)
  ? Number(value.replace(/\D/g, ""))
  : value
}

const isPrime = num => {
  for(let i = 2; i < num; i++)
    if(num % i === 0) return false;
  return num > 1;
}

const hasTwoPrimes = (number) => {
  let splitted = number.toString().split('');
  let counter = 0;
  let primes = [];
  for (let i = 1; i <= splitted.length; i ++) {
    for (let j = 0; j < splitted.length - (i - 1); j ++) {
      if (isPrime(number.toString().substr(j, i))) {
        primes.push(number.toString().substr(j, i));
        counter ++;
        if (counter === 2) {
          return {hasTwoPrimes: true, primes: primes.join(', ')}
        }
      }
    }
  }
  return {hasTwoPrimes: false};
}

export const codeChecker = (postCode) => {
  if (!getNumber(postCode)) {
    return false
  }
  let number = getNumber(postCode);
  return hasTwoPrimes((number));
}
