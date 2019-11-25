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
let dummyVCI = ['x', '14', '=', 'x', '20', '==', '11', 'then', 'write', 'x']

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

function createVCI(vciElement) {
  console.log(vciElement);
}

function startVCIProcess() {
  btnVCI.classList.add('hidden')
  output2.classList.remove('hidden')

  for (let row = 0; row < metaSourceCode.length; row++) {
    createVCI(metaSourceCode[row])
  }

  drawVCI(vci)
}