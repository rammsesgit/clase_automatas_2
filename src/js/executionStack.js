let $executionStack = document.getElementById('executionStack')
let pcAux = 0;
let vv = 0;
let pc = 0;
let eje = [];
let res = {};

function startPEProcess(vci) {
  for (let i = 0 ; i < vci.length ; i++) {
    console.log(vci[i].string);
  }
}