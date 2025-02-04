const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const getProperties = (number) => {
  const props = [];
  let sum = 0

  if (number % 2 === 0){
    props.push('even');
  }else {
    props.push('odd')
  }

  if(number < 0){
    return props;
  }

  const splitNumbers = number.toString().split('').map(n => Number(n));

  splitNumbers.forEach(element => {
    const cube = element **3;

    sum += cube
  });

  if(sum === number){
    props.push('armstrong')
  }

  return props;
}

const isPerfect = (number) => {
  let sum = 1;
  if(number < 0){
    return false;
  }
  for (let i = 2; i <= Math.sqrt(number); i++) {
      if (number % i === 0) {
          sum += i;
          if (i !== number / i) {
              sum += number / i;
          }
      }
  }

  return sum === number;
}

const isPrime = (number) => {
  let prime = true;
  if(number < 0){
    return false;
  }

  for (let i = 2; i <= number/2; i++) {
    if (number % i == 0) {
        prime = false;
        break;
    }
  }

  return prime;
}

const digitSum = (number) => {
  const sum = Math.abs(number).toString().split('').map(n => Number(n)).reduce((acc, curr) => acc + curr, 0);

  return sum;
}

app.get('/api/classify-number', async (req, res, next) => {
  try {
    const { number } = req.query;

    if(!number || !Number(number) || Number(number) != Math.trunc(Number(number)) || number < 0){
      return res.json({
        'number': 'alphabet',
        'error': true
      }).status(400);
    }

    const response = await fetch(`http://numbersapi.com/${number}/math?json`);
    const fact = await response.json();

    return res.json({
      'number': Number(number),
      'is_prime': isPrime(Number(number)),
      'is_perfect': isPerfect(Number(number)),
      'properties': getProperties(Number(number)),
      'fun_fact': fact.text,
      'digits_sum': digitSum(Number(number))
    }).status(200);
    }catch(e){
      console.log(e);
      next(e);
    }
});

app.use((err, req, res, next) => {
  return res.json({
    'error': true,
    'message': "Internal Server Error!"
  }).status(500);
});

app.listen(5000, () => console.log("Server is running!"));
