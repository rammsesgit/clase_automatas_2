/*
  Dummy source code:
  
  x = 14;
  if (x < 20) then
      begin
          write(x);
      end
  end
*/
let dummyVCI = [
  {string: '', position: 0},
  {string: '', position: 1},
  {string: '', position: 2},
  //...
]

let $executionStack = document.getElementById('executionStack')
let executionStack = []