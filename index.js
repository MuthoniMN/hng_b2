const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const getProperties = (number) => {
  const props = [];
  let sum = 0

  if(number > 0){
    const splitNumbers = number.toString().split('').map(n => Number(n));

    splitNumbers.forEach(element => {
      const cube = element **splitNumbers.length;

      sum += cube
    });

    if(sum === number){
      props.push('armstrong')
    }  
  }

  if (number % 2 === 0){
    props.push('even');
  }else {
    props.push('odd')
  }

  return props;
}

const isPerfect = (number) => {
  let sum = 1;
  if(number <= 0){
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
  if(number <= 0){
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
  if(number === 0){ return 0; }
  const sum = Math.abs(number).toString().split('').map(n => Number(n)).reduce((acc, curr) => acc + curr, 0);

  return number < 0 ? -sum : sum;
}

app.get('/api/classify-number', async (req, res, next) => {
  try {
    let { number } = req.query;
    number = number ? number.replaceAll(',', '') : number;
    
    console.log(Number(number));

    if((!number && number != 0) || (!Number(number) && number != 0) || Number(number) != Math.trunc(Number(number)) || number.includes('.')){
      return res.json({
        'number': "alphabet",
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
      'digit_sum': digitSum(Number(number)),
      'fun_fact': fact.text
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
