let $sourceFile = document.getElementById('sourceFile')
let $outputs = document.getElementsByClassName('output')

function evaluar(matriz) {  
  console.log(matriz);

/*   for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      console.log(matriz[i][j] + ' $' + i + ' $' + j);
      
      if (identificadores(matriz[i][j]) != null) {
        console.log('identificadores:' + matriz[i][j]);
        
      } else if (operadoresAritmeticos(matriz[i][j]) != null) {
        
        console.log('operadoresAritmeticos:' + matriz[i][j]);
      } else if (operadoresRelacionales(matriz[i][j]) != null) {
        
        console.log('operadoresRelacionales:' + matriz[i][j]);
      } else if (operadoresLogicos(matriz[i][j]) != null) {
        
        console.log('operadoresLogicos:' + matriz[i][j]);
      } else if (palabrasReservadas(matriz[i][j]) != null) {
        
        console.log('palabrasReservadas:' + matriz[i][j]);
      } else if (caracteresEspeciales(matriz[i][j]) != null) {
        
        console.log('caracteresEspeciales:' + matriz[i][j]);
      } else if (comentarios(matriz[i][j]) != null) {
        
        console.log('comentarios:' + matriz[i][j]);
      } else if (numerosEnteros(matriz[i][j]) != null) {
        
        console.log('numerosEnteros:' + matriz[i][j]);
      } else if (numerosReales(matriz[i][j]) != null) {
        
        console.log('numerosReales:' + matriz[i][j]);
      }
    }
  } */
}

function fragmentarArchivo(fuente) {
  let matriz = []
  let filas = fuente.split('\n')
  for (let index = 0; index < filas.length; index++) {
    matriz.push(filas[index].split(' '))
  }
  
  evaluar(matriz)
}

function mostrarContenido(contenido) {
  $sourceFile.innerText = contenido

  for (let index = 0; index < $outputs.length; index++) {
    $outputs[index].classList.remove('hidden')
  }

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