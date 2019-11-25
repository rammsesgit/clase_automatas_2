/*
  Dummy source code:
  
  x = 14;
  if (x < 20) then
      begin
          write(x);
      end
  end
*/
let dummyMetaSourceCode = [
  {token: 'Identificador', string: 'x', priority: null, extra: null},
  {token: 'Operador relacional', string: '=', priority: null, extra: null},
  {token: 'Número entero', string: '14', priority: null, extra: null},
  {token: 'Caracter especial', string: ';', priority: null, extra: null},
  {token: 'Identificador', string: 'if', priority: null, extra: null},
  {token: 'Caracter especial', string: '(', priority: null, extra: null},
  {token: 'Identificador', string: 'x', priority: null, extra: null},
  {token: 'Operador relacional', string: '<', priority: null, extra: null},
  {token: 'Número entero', string: '20', priority: null, extra: null},
  {token: 'Caracter especial', string: ')', priority: null, extra: null},
  {token: 'Identificador', string: 'then', priority: null, extra: null},
  {token: 'TBA', string: 'begin', priority: null, extra: null},
  {token: 'TBA', string: 'write', priority: null, extra: null},
  {token: 'Caracter especial', string: '(', priority: null, extra: null},
  {token: 'Identificador', string: 'x', priority: null, extra: null},
  {token: 'Caracter especial', string: ')', priority: null, extra: null},
  {token: 'Caracter especial', string: ';', priority: null, extra: null},
  {token: 'Identificador', string: 'end', priority: null, extra: null},
  {token: 'Identificador', string: 'end', priority: null, extra: null}
]

let $VCI = document.getElementById('VCIContent')
let VCI = ['x', '10', '=', 'x', 'x', '10', '=', 'x', 'x', '10',
'=sdf', 'x', 'x', '1sefsef0', '=', 'x', '*']

function filterByTokens(vciElement) {
  console.log(vciElement);
}

function drawVCI() {
  for (let index = 0; index < VCI.length; index++) {
    $VCI.innerHTML += `
      <td class="vci-element">
        <div class="element">${VCI[index]}</div>
        <div class="position">${index + 1}</div>
      </td>
    `
  }
}

function startVCI(metaSourceCode = dummyMetaSourceCode) {
  console.log(metaSourceCode);

  for (let row = 0; row < metaSourceCode.length; row++) {
    filterByTokens(metaSourceCode[row])
  }
}