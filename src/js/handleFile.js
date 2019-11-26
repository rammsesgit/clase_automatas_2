let $sourceFile = document.getElementById('sourceFile')
let $outputs = document.getElementById('outputs')
let metaSourceCode = [];

function fragmentarArchivo(fuente) {
  let matriz = []
  let filas = fuente.split('\n')
  for (let index = 0; index < filas.length; index++) {
    matriz.push(filas[index].split(' '))
  }

  evaluar(matriz);
  generarVci();
  drawVCI(vci);
  startPEProcess(vci);
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