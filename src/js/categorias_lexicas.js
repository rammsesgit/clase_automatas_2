// Token ( 100 )
// Inicia con @ seguida de una letra y puede contener más letras
function identificadores(posibleToken) {
  const regex = /^[a-z]|[A-Z]+/
  let found = posibleToken.match(regex)
  return found
}

// Token ( 200 )
//- ( Resta ) + ( Suma ) / ( división ) * (multiplicación)
function operadoresAritmeticos(posibleToken) {
  const regex = /^-$|^\+$|^\/$|^\*$/
  let found = posibleToken.match(regex)
  return found
}

// Token ( 300 )
// < (menor que) > ( mayor que ) <= (menor igual) >= (mayor igual) = (comparación)
function operadoresRelacionales(posibleToken) {
  const regex = /^<$|^>$|^<=$|^>=$|^==$/
  let found = posibleToken.match(regex)
  return found
}

// Token ( 400 ) 
// & ( AND ) | ( OR ) ~ ( NOT )
function operadoresLogicos(posibleToken) {
  const regex = /^\&$|^\|$|^~$/
  let found = posibleToken.match(regex)
  return found
}

// Token ( 500 ) 
// Program, begin, end, input, output, integer, real, char, string, boolean, if, else, then, while, do, repeat, until, var, true, false
function palabrasReservadas(posibleToken) {
  const regex = /^Program$|^begin$|^end$|^read$|^write$|^integer$|^real$|^char$|^string$|^boolean$|^if$|^else$|^then$|^while$|^do$|^repeat$|^until$|^var$|^true$|^false$/
  let found = posibleToken.match(regex)
  return found
}

// Token ( 600 ) 
// ( ) ; , :=
function caracteresEspeciales(posibleToken) {
  const regex = /^\(|\)$|;$|,$|^=$/
  let found = posibleToken.match(regex)
  return found
}

// Token ( 700 ) 
// Inician y terminan con // y puede contener cualquier otro carácter o estar vacío separado al menos de un espacio // hola // , // //
function comentarios(posibleToken) {
  const regex = /^\/\/$/
  let found = posibleToken.match(regex)
  return found
}

// Token ( 800 ) 
// Cualquier cantidad entera incluya negativos
function numerosEnteros(posibleToken) {
  const regex = /-?[0-9]+$/
  let found = posibleToken.match(regex)
  return found
}

// Token ( 900 ) 
// Cualquier cantidad con punto decimal puede ser positivo o negativo, no maneja notación científica ni exponencial, siempre debe manejar una parte entera y una parte decimal, puede incluir negativos.
function numerosReales(posibleToken) {
  const regex = /-?[0-9]+\.[0-9]+$/
  let found = posibleToken.match(regex)
  return found
}

// CARACTERES ESPECIALES QUE NO GENERAN TOKEN 
// . BCO TAB EOLN (END OF LINE) EOF (END OF FILE)