let $sourceFile = document.getElementById('sourceFile')
let $outputs = document.getElementById('outputs')
let metaSourceCode = [];

function evaluar(matriz) {  
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      let valorActual = matriz[i][j];
      
      if (palabrasReservadas(matriz[i][j]) != null) {
        if (valorActual === 'then') {
          metaSourceCode.push({
            token: 'condicional',
            string: valorActual,
            priority: null,
            extra: 1
          });
        } else if (valorActual === 'if') {
          metaSourceCode.push({
            token: 'condicional',
            string: valorActual,
            priority: null,
            extra: 3
          });
        } else if (valorActual === 'repeat') {
          metaSourceCode.push({
            token: 'repeat',
            string: valorActual,
            priority: null,
            extra: 4
          });
        } else if (valorActual === 'until') {
          metaSourceCode.push({
            token: 'repeat',
            string: valorActual,
            priority: null,
            extra: 5
          });
        } else if (valorActual === 'while') {
          metaSourceCode.push({
            token: 'while',
            string: valorActual,
            priority: null,
            extra: 6
          });
        } else if (valorActual === 'do') {
          metaSourceCode.push({
            token: 'while',
            string: valorActual,
            priority: null,
            extra: 7
          });
        } else if (valorActual === 'write') {
          metaSourceCode.push({
            token: 'write',
            string: valorActual,
            priority: null,
            extra: 8
          });
        } else if (valorActual === 'end') {
          metaSourceCode.push({
            token: 'end',
            string: valorActual,
            priority: null,
            extra: 9
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
            extra: 10
          });
        } else if (valorActual === '=') {
          metaSourceCode.push({
            token: 'asignacion',
            string: valorActual,
            priority: 0,
            extra: 11
          });
        } else if (valorActual === '(') {
          metaSourceCode.push({
            token: 'abreParentesis',
            string: valorActual,
            priority: 0,
            extra: 12
          });
        } else if (valorActual === ')') {
          metaSourceCode.push({
            token: 'cierraParentesis',
            string: valorActual,
            priority: 0,
            extra: 13
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
    case "<" || ">" || "<=" || ">=" || "==":
      prioridad = 40;
      break
    case "!":
      prioridad = 30
      break
    case "&&":
      prioridad = 20
      break
    case "||":
      prioridad = 10
      break
  }

  return prioridad;
}

function fragmentarArchivo(fuente) {
  let matriz = []
  let filas = fuente.split('\n')
  for (let index = 0; index < filas.length; index++) {
    matriz.push(filas[index].split(' '))
  }

  console.log(matriz);
  
  evaluar(matriz);
  console.log(metaSourceCode);
}

function mostrarContenido(contenido) {
  $sourceFile.innerText = contenido
  $outputs.classList.remove('hidden')

  fragmentarArchivo(contenido)
}

function cambiarNombre() {
  if (fileInput.value) {
    labelFile.innerText = fileInput.value.split('\\')[fileInput.value.split('\\').length-1]
  } else {
    labelFile.innerText = 'Seleccione un archivo (txt)'
  }
}

function leerArchivo(e) {
  cambiarNombre()
  
  let archivo = e.target.files[0]
  if (archivo) {
    let lector = new FileReader()
    lector.onload = function(e) {
      let contenido = e.target.result
      mostrarContenido(contenido)
    }
    lector.readAsText(archivo)
  }

}

document.getElementById('fileInput').addEventListener('change', leerArchivo, false)