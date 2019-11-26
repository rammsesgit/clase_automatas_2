let $executionStack = document.getElementById('executionStack')
let pcAux = 0;
let vv = 0;
let pc = 0;
let eje = [];
let res = {};

function startPEProcess(vci) {
  for (let i = 0 ; i < vci.length ; i++) {
    let current = vci[i];
    if (identificadores(current) !== undefined) {
      if (current === 'then') {
        // implementar then
      } else if (current === 'else') {
        // implementar else
      } else {
        eje.push(current);
      }
    }
    if (numerosEnteros(current) !== undefined) {
      eje.push(current);
    }
    if (operadoresAritmeticos(current) !== undefined) {
      let second = eje.pop();
      let first = eje.pop();
      evaluateArithmeticOperator(current, first, second);
    }
    if (operadoresRelacionales(current) !== undefined) {
      let second = eje.pop();
      let first = eje.pop();
      evaluateRelationalOperator(current, first, second);
    }
    if (operadoresLogicos(current) !== undefined) {
      if (current === '~') {
        evaluateLogicalOperator(current, eje.pop(), null)
      } else {
        let second = eje.pop();
        let first = eje.pop();
        evaluateLogicalOperator(current, first, second);
      }
    }
    if (current === '=') {
      let value = eje.pop();
      let identifier = eje.pop();
      res[identifier] = value;
    }
  }
}

function evaluateArithmeticOperator(operator, first, second) {
  if (numerosEnteros(first) && numerosEnteros(second)) {
    switch (operator) {
      case "/":
        eje.push(first/second);
        break;
      case "*":
        eje.push(first*second);
        break;
      case "+":
        eje.push(first+second);
        break;
      case "-":
        eje.push(first-second);
        break;
    }
  } else {
    console.log('No se puede realizar la operación [aritmético] [' + first + ' ' + operator + ' ' + second + ']')
  }
}

function evaluateRelationalOperator(operator, first, second) {
  if (operator === '>') {
    if (identificadores(first) !== undefined && numerosEnteros(second) !== undefined) {
      eje.push(res[first] > second);
    } else if (numerosEnteros(first) !== undefined && identificadores(second) !== undefined) {
      eje.push(first > res[second]);
    } else {
      eje.push(first > second);
    }
  } else if (operator === '<') {
    if (identificadores(first) !== undefined && numerosEnteros(second) !== undefined) {
      eje.push(res[first] < second);
    } else if (numerosEnteros(first) !== undefined && identificadores(second) !== undefined) {
      eje.push(first < res[second]);
    } else {
      eje.push(first < second);
    }
  } else if (operator === '<=') {
    if (identificadores(first) !== undefined && numerosEnteros(second) !== undefined) {
      eje.push(res[first] <= second);
    } else if (numerosEnteros(first) !== undefined && identificadores(second) !== undefined) {
      eje.push(first <= res[second]);
    } else {
      eje.push(first <= second);
    }
  } else if (operator === '>=') {
    if (identificadores(first) !== undefined && numerosEnteros(second) !== undefined) {
      eje.push(res[first] >= second);
    } else if (numerosEnteros(first) !== undefined && identificadores(second) !== undefined) {
      eje.push(first >= res[second]);
    } else {
      eje.push(first >= second);
    }
  } else if (operator === '==') {
    if (identificadores(first) !== undefined && numerosEnteros(second) !== undefined) {
      eje.push(res[first] == second);
    } else if (numerosEnteros(first) !== undefined && identificadores(second) !== undefined) {
      eje.push(first == res[second]);
    } else {
      eje.push(first == second);
    }
  } else {
    console.log('No se puede realizar la operación [relacional] [' + first + ' ' + operator + ' ' + second + ']');
  }
}

function evaluateLogicalOperator(operator, first, second) {
  if (operator === '&') {
    eje.push(first && second);
  } else if (operator === '|') {
    eje.push(first || second);
  } else if (operator === '~' && second === null) {
    eje.push(!first)
  } else {
    console.log('No se puede realizar la operación [lógica] [' + first + ' ' + operator + ' ' + second + ']');
  }
}
