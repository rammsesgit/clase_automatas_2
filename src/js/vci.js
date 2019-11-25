/*
  Dummy source code:
  
  x = 14;
  if (x < 20) then
      begin
          write(x);
      end
  end
*/
let $VCI = document.getElementById('VCIContent')
let dummyVCI = ['x', '10', '=', 'x', 'x', '10', '=', 'x', 'x', '10',
'=sdf', 'x', 'x', '1sefsef0', '=', 'x', '*']

function drawVCI(VCIToDraw) {
  for (let index = 0; index < VCIToDraw.length; index++) {
    $VCI.innerHTML += `
      <td class="vci-element">
        <div class="element">${VCIToDraw[index]}</div>
        <div class="position">${index + 1}</div>
      </td>
    `
  }
}

function createVCI(vciElement) {
  console.log(vciElement);
}

function startVCIProcess() {
  btnVCI.classList.add('hidden')
  output2.classList.remove('hidden')

  for (let row = 0; row < metaSourceCode.length; row++) {
    createVCI(metaSourceCode[row])
  }

  drawVCI(dummyVCI)
}