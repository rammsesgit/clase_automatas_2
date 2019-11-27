let $executionStack = document.getElementById('executionStack')
let pcAux = 0;
let vv = 0;
let pc = 0;
let eje = [];
let res = {};

function startPEProcess(vci) {
  console.log(vci);
  for (let i = 0 ; i < vci.length ; i++) {
    let current = vci[i].string;
    console.log(eje);
    console.log(res);
    console.log(i);
    
    if (current === '=') {
      let value = eje.pop();
      let identifier = eje.pop();
      res[identifier] = value;
    } else if (current === 'then') {
      pcAux = eje.pop();
      vv = eje.pop();
      if (vv == true) {
        continue;
      } else {
        i = pcAux - 2;
      }
    } else if (current === 'else') {
      i = eje.pop();
    } else if (current === 'write') {
      console.log(res[vci[i+1].string]);
      i += 1;
      continue;
    } else if (numerosEnteros(current) != null) {
      eje.push(Number(current));
    } else if (operadoresAritmeticos(current) != null) {
      let second = eje.pop();
      let first = eje.pop();
      evaluateArithmeticOperator(current, first, second);
    } else if (operadoresRelacionales(current) != null) {
      let second = eje.pop();
      let first = eje.pop();
      evaluateRelationalOperator(current, first, second);
    } else if (operadoresLogicos(current) != null) {
      if (current === '~') {
        evaluateLogicalOperator(current, eje.pop(), null)
      } else {
        let second = eje.pop();
        let first = eje.pop();
        evaluateLogicalOperator(current, first, second);
      }
    } else if (identificadores(current) != null) {
      eje.push(current);
    } else {
      console.log('ninguno');
    }
  }
  console.log('Resultados')
  console.log(res);
}

function evaluateArithmeticOperator(operator, first, second) {
  if (!isNaN(first) && !isNaN(second)) {
    switch (operator) {
      case "/":
        eje.push(Number(first)/Number(second));
        break;
      case "*":
        eje.push(Number(first)*Number(second));
        break;
      case "+":
        eje.push(Number(first)+Number(second));
        break;
      case "-":
        eje.push(Number(first)-Number(second));
        break;
    }
  } else if (identificadores(first) != null && numerosEnteros(second.toString()) != null) {
    switch (operator) {
      case "/":
        eje.push(Number(res[first])/second);
        break;
      case "*":
        eje.push(Number(res[first])*second);
        break;
      case "+":
        eje.push(Number(res[first])+second);
        break;
      case "-":
        eje.push(Number(res[first])-second);
        break;
    }
  } else if (numerosEnteros(first.toString()) != null && identificadores(second) != null) {
    switch (operator) {
      case "/":
        eje.push(first/Number(res[second]));
        break;
      case "*":
        eje.push(first*Number(res[second]));
        break;
      case "+":
        eje.push(first+Number(res[second]));
        break;
      case "-":
        eje.push(first-Number(res[second]));
        break;
    }
  } else {
    console.log('No se puede realizar la operación [aritmético] [' + first + ' ' + operator + ' ' + second + ']')
  }
}

function evaluateRelationalOperator(operator, first, second) {
  if (operator === '>') {
    if (!isNaN(first) && !isNaN(second)) {
      eje.push(first > second);
    } else if (identificadores(first) != null && numerosEnteros(second) != null) {
      eje.push(Number(res[first]) > Number(second));
    } else if (numerosEnteros(first) != null && identificadores(second) != null) {
      eje.push(Number(first) > Number(res[second]));
    }
  } else if (operator === '<') {
    if (!isNaN(first) && !isNaN(second)) {
      eje.push(first < second);
    } else if (identificadores(first.toString()) != null && numerosEnteros(second.toString()) != null) {
      eje.push(Number(res[first]) < Number(second));
    } else if (numerosEnteros(first.toString()) != null && identificadores(second.toString()) != null) {
      eje.push(Number(first) < Number(res[second]));
    }
  } else if (operator === '<=') {
    if (!isNaN(first) && !isNaN(second)) {
      eje.push(first <= second);
    } else if (identificadores(first.toString()) != null && numerosEnteros(second.toString()) != null) {
      eje.push(Number(res[first]) <= Number(second));
    } else if (numerosEnteros(first.toString()) != null && identificadores(second.toString()) != null) {
      eje.push(Number(first) <= Number(res[second]));
    }
  } else if (operator === '>=') {
    if (!isNaN(first) && !isNaN(second)) {
      eje.push(first >= second);
    } else if (identificadores(first.toString()) != null && numerosEnteros(second.toString()) != null) {
      eje.push(Number(res[first]) >= Number(second));
    } else if (numerosEnteros(first.toString()) != null && identificadores(second.toString()) != null) {
      eje.push(Number(first) >= Number(res[second]));
    }
  } else if (operator === '==') {
    if (!isNaN(first) && !isNaN(second)) {
      eje.push(first == second);
    } else if (identificadores(first.toString()) != null && numerosEnteros(second.toString()) != null) {
      eje.push(Number(res[first]) == Number(second));
    } else if (numerosEnteros(first.toString()) != null && identificadores(second.toString()) != null) {
      eje.push(Number(first) == Number(res[second]));
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
