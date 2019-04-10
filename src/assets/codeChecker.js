const getNumber = (value) => {
  return value.toString().length < 2
  ? false
  : isNaN(value)
  ? Number(value.replace(/\D/g, ""))
  : value
}

const isPrime = (n, d = 2) => {
  return Math.abs(n)<2
  ? false
  : Math.abs(n)===d
  ? true:n%d===0
    ? false
    :isPrime(n,d+1);
}

const hasTwoPrimes = (numbersArr) => {
  let counter = 0;
  for (let i = 0; i < numbersArr.length; i++ ) {
    if (isPrime(numbersArr[i])) {
      counter ++;
      if (counter === 2) {
        return true
      }
    }
  }
  return false;
}

const splitNumber = (number) => {
  let splitted = number.toString().split('');
  let result = [...number.toString().split(''), number];
  for (let i = 2; i < splitted.length; i ++) {
    for (let j = 0; j < splitted.length - (i - 1); j ++) {
      result.push(number.toString().substr(j, i));
    }
  }
  return result;
}

export const codeChecker = (postCode) => {
  if (!getNumber(postCode)) {
    return false
  }
  let number = getNumber(postCode);
  return hasTwoPrimes(splitNumber(number));
}
