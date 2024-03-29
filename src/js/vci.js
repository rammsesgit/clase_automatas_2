let $VCI = document.getElementById('VCIContent')
let vci = [];
let ope = [];
let est = [];
let dir = [];
let ctx = [];

function drawVCI(VCIToDraw) {
  VCIToDraw.map((item, index) => {
    $VCI.innerHTML += `
      <td class="vci-element">
        <div class="element">${item.string}</div>
        <div class="position">${index + 1}</div>
      </td>
    `
  })
}

function startVCIProcess() {
  btnVCI.classList.add('hidden')
  output2.classList.remove('hidden')
}

function evaluar(matriz) {  
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      let valorActual = matriz[i][j];
      
      if (palabrasReservadas(matriz[i][j]) != null) {
        if (valorActual === 'then') {
          metaSourceCode.push({
            token: 'then',
            string: valorActual,
            priority: null,
            extra: 1
          });
        } else if (valorActual === 'if') {
          metaSourceCode.push({
            token: 'if',
            string: valorActual,
            priority: null,
            extra: 3
          });
        } else if (valorActual === 'else') {
          metaSourceCode.push({
            token: 'else',
            string: valorActual,
            priority: null,
            extra: 4
          });
        } else if (valorActual === 'repeat') {
          metaSourceCode.push({
            token: 'repeat',
            string: valorActual,
            priority: null,
            extra: 5
          });
        } else if (valorActual === 'until') {
          metaSourceCode.push({
            token: 'until',
            string: valorActual,
            priority: null,
            extra: 6
          });
        } else if (valorActual === 'while') {
          metaSourceCode.push({
            token: 'while',
            string: valorActual,
            priority: null,
            extra: 7
          });
        } else if (valorActual === 'do') {
          metaSourceCode.push({
            token: 'do',
            string: valorActual,
            priority: null,
            extra: 8
          });
        } else if (valorActual === 'write') {
          metaSourceCode.push({
            token: 'write',
            string: valorActual,
            priority: null,
            extra: 9
          });
        } else if (valorActual === 'end') {
          metaSourceCode.push({
            token: 'end',
            string: valorActual,
            priority: null,
            extra: 10
          });
        }
      } else if (identificadores(matriz[i][j]) != null) {
        metaSourceCode.push({
          token: 'identificador',
          string: valorActual,
          priority: null,
          extra: null
        });
      } else if (operadoresAritmeticos(matriz[i][j]) != null) {
        metaSourceCode.push({
          token: 'aritmetico',
          string: valorActual,
          priority: obtenerPrioridad(valorActual),
          extra: null
        });
      } else if (operadoresRelacionales(matriz[i][j]) != null) {
        metaSourceCode.push({
          token: 'relacional',
          string: valorActual,
          priority: obtenerPrioridad(valorActual),
          extra: null
        });
      } else if (operadoresLogicos(matriz[i][j]) != null) {
        metaSourceCode.push({
          token: 'logico',
          string: valorActual,
          priority: obtenerPrioridad(valorActual),
          extra: null
        });
      } else if (comentarios(matriz[i][j]) != null) {
        
      } else if (numerosEnteros(matriz[i][j]) != null) {
        metaSourceCode.push({
          token: 'numero',
          string: valorActual,
          priority: null,
          extra: null
        });
      } else if (numerosReales(matriz[i][j]) != null) {
        metaSourceCode.push({
          token: 'numero',
          string: valorActual,
          priority: null,
          extra: null
        });
      } else if (caracteresEspeciales(matriz[i][j]) != null) {
        if (valorActual === ';') {
          metaSourceCode.push({
            token: 'delimitador',
            string: valorActual,
            priority: null,
            extra: 11
          });
        } else if (valorActual === '=') {
          metaSourceCode.push({
            token: 'asignacion',
            string: valorActual,
            priority: 0,
            extra: 12
          });
        } else if (valorActual === '(') {
          metaSourceCode.push({
            token: 'abreParentesis',
            string: valorActual,
            priority: 0,
            extra: 13
          });
        } else if (valorActual === ')') {
          metaSourceCode.push({
            token: 'cierraParentesis',
            string: valorActual,
            priority: 0,
            extra: 14
          });
        }
      }
    }
  } 
}

function obtenerPrioridad(string) {
  let prioridad = 0;

  switch (string) {
    case "/":
      prioridad = 60;
      break
    case "*":
      prioridad = 60;
      break
    case "+":
      prioridad = 50;
      break
    case "-":
      prioridad = 50;
      break
    case "<":
      prioridad = 40;
      break
    case ">":
      prioridad = 40;
      break
    case "<=":
      prioridad = 40;
      break
    case ">=":
      prioridad = 40;
      break
    case "==":
      prioridad = 40;
      break
    case "~":
      prioridad = 30;
      break
    case "&":
      prioridad = 20;
      break
    case "|":
      prioridad = 10;
      break
  }

  return prioridad;
}

function generarVci() {
  metaSourceCode.map((item, ap) => {
    if (item.token === 'abreParentesis' || item.token === 'asignacion') {
      ope.push(item);
    }
    if (item.token === 'numero' || item.token === 'identificador' || item.token === 'write') {
      vci.push(item);
    }
    if (item.token === 'delimitador') {
      while (ope.length > 0) {
        vci.push(ope.pop());
      }
    }
    if (item.token === 'cierraParentesis') {
      while (true) {
        let current = ope.pop()
        if (current !== undefined && current.token !== 'abreParentesis') {
          vci.push(current);
        } else {
          break;
        }
      }
    }
    if (item.token === 'aritmetico' || item.token === 'relacional' || item.token === 'logico') {
      if (ope.length === 0) {
        ope.push(item);
      } else {
        while (ope.length > 0 && obtenerPrioridad(item.string) <= obtenerPrioridad(ope[ope.length-1].string)) {
          vci.push(ope.pop());
        }
        ope.push(item);
      }
    }
    if (item.token === 'if') {
      est.push(item); // almacena dirección actual
    }
    if (item.token === 'then') {
      while (ope.length > 0) { // vacia pila de operadores
        vci.push(ope.pop());
      }
      dir.push(vci.length); // almacena dirección
      vci.push({token: 'falso'}); // genera token falso
      vci.push({token: 'then', string: 'then'}) // genera token then
      ctx.unshift(item.string);
    }
    if (item.token === 'else') {
      est.push(item);
      vci[dir.pop()] = {
        token: 'dir',
        string: (vci.length + 3).toString(),
        extra: ap
      };
      dir.push(vci.length)
      vci.push({token: 'falso'});
      vci.push({token: 'else', string: 'else'})
      ctx.unshift(item.string);
    }
    if (item.token === 'end') {
      if (ctx.pop() === 'then') {
        vci[dir.pop()] = {
          token: 'dir', 
          string: (vci.length + 1).toString(),
          extra: ap
        };
      }
    }
  });
}
