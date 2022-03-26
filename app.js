document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div')) 
    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    const wid = 10
    let nextRandom = 0
    let score = 0
    var timerId;
    var number; 
    const colors = ['orange', 'red', 'purple', 'green', 'yellow']

    $("#start-button").prop( "disabled", true);

      //move down funciton 
  function moveDown(){
    undraw()
    currentPosition += wid
    draw()
    freeze()
} 

      $('#easy').click(function () { 
        draw();
       timerId = setInterval(moveDown, 2000);
        nextRandom = Math.floor(Math.random()*allterto.length)
        displayShape();
          number = 2000; 
          $("#fast").hide();
          $("#fastest").hide();
          $("#start-button").prop( "disabled", false);


                document.getElementById("fast").disabled = true;
          document.getElementById("fastest").disabled = true;
    
    
      });
      $('#fast').click(function (e) { 
        draw();
    timerId = setInterval(moveDown, 1000);
        nextRandom = Math.floor(Math.random()*allterto.length)
        displayShape();
        number = 1000; 
    
        $("#easy").hide();
        $("#fastest").hide();
        $("#start-button").prop( "disabled", false);

          document.getElementById("easy").disabled = true;
        document.getElementById("fastest").disabled = true;
    
      });
      $('#fastest').click(function (e) { 
        draw();
     timerId =  setInterval(moveDown,500);      
        nextRandom = Math.floor(Math.random()*allterto.length)
        displayShape();
        number = 500; 
        $("#fast").hide();
        $("#easy").hide();
        $("#start-button").prop( "disabled", false);
        document.getElementById("fast").disabled = true;
        document.getElementById("easy").disabled = true;
    
        
      }); 

      
  //Tetrominoes
  const lTetromino = terto1()

  const zTetromino = tertoZ()

  const tTetromino = tertot()

  const oTetromino = tertoo()

  const iTetromino = tertoi()

  const allterto = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  let currentPosition = 4
  let currentRotation = 0

  //randomly select a tetromino and its first rotation
  let random = Math.floor(Math.random()*allterto.length)
  let current = allterto[random][currentRotation]



  
  function tertoi() {
    return [
      [1, wid + 1, wid * 2 + 1, wid * 3 + 1],
      [wid, wid + 1, wid + 2, wid + 3],
      [1, wid + 1, wid * 2 + 1, wid * 3 + 1],
      [wid, wid + 1, wid + 2, wid + 3]
    ]
  }

  function tertoo() {
    return [
      [0, 1, wid, wid + 1],
      [0, 1, wid, wid + 1],
      [0, 1, wid, wid + 1],
      [0, 1, wid, wid + 1]
    ]
  }

  function tertot() {
    return [
      [1, wid, wid + 1, wid + 2],
      [1, wid + 1, wid + 2, wid * 2 + 1],
      [wid, wid + 1, wid + 2, wid * 2 + 1],
      [1, wid, wid + 1, wid * 2 + 1]
    ]
  }

  function tertoZ() {
    return [
      [0, wid, wid + 1, wid * 2 + 1],
      [wid + 1, wid + 2, wid * 2, wid * 2 + 1],
      [0, wid, wid + 1, wid * 2 + 1],
      [wid + 1, wid + 2, wid * 2, wid * 2 + 1]
    ]
  }

  function terto1() {
    return [
      [1, wid + 1, wid * 2 + 1, 2],
      [wid, wid + 1, wid + 2, wid * 2 + 2],
      [1, wid + 1, wid * 2 + 1, wid * 2],
      [wid, wid * 2, wid * 2 + 1, wid * 2 + 2]
    ]
  }

  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino')
      squares[currentPosition + index].style.backgroundColor = colors[random] 
     
    })
  }
  

  function undraw(){
      current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetromino')
        squares[currentPosition + index].style.backgroundColor = ''
      })
  }

 

   //assign functions to keyCodes
   function control(e) {
    if(e.keyCode === 37) {
      moveLeft()
    } else if (e.keyCode === 38) {
      rotate()
    } else if (e.keyCode === 39) {
      moveRight()
    } else if (e.keyCode === 40) {
      moveDown()
    }
  }

  document.addEventListener('keyup', control)

 

   
    function freeze() {
      if(current.some(index => squares[currentPosition + index + wid].classList.contains('taken'))) {
        current.forEach(index => squares[currentPosition + index].classList.add('taken'))
        //start a new tetromino falling
        random = nextRandom
        nextRandom =  Math.floor(Math.random() * allterto.length)
        current = allterto[random][currentRotation]
        currentPosition = 4
        draw()
        displayShape()
        addScore()
        gameOver()
        }
    }
  
 
  function moveLeft(){
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % wid ===0)

    if (!isAtLeftEdge) currentPosition -=1

    if (current.some(index => squares [currentPosition + index].classList.contains('taken'))){
        currentPosition +=1
    }
    draw()
}

 //move the tetromino right, unless is at the edge or there is a blockage
 function moveRight() {
  undraw()
  const isAtRightEdge = current.some(index => (currentPosition + index) % wid === wid -1)
  if(!isAtRightEdge) currentPosition +=1
  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition -=1
  }
  draw()
}


function rotate() {
  undraw()
  currentRotation ++
  if(currentRotation === current.length) { //if the current rotation gets to 4, make it go back to 0
    currentRotation = 0
  }
  current = allterto[random][currentRotation]
  //checkRotatedPosition()
  draw()
}

const displaySquares = document.querySelectorAll('.mini-grid div')
const displayWid = 4
let displayIndex = 0

//without rotations
const upNextTetrominoes = [
  [1, displayWid+1, displayWid*2+1, 2], //lTetromino
  [0, displayWid, displayWid+1, displayWid*2+1], //zTetromino
  [1, displayWid, displayWid+1, displayWid+2], //tTetromino
  [0, 1, displayWid, displayWid+1], //oTetromino
  [1, displayWid+1, displayWid*2+1, displayWid*3+1] //iTetromino
]

 //display the shape in the mini-grid display
 function displayShape() {
  //remove any trace of a tetromino form the entire grid
  displaySquares.forEach(square => {
    square.classList.remove('tetromino')
    square.style.backgroundColor = ''
  })
  upNextTetrominoes[nextRandom].forEach( index => {
    displaySquares[displayIndex + index].classList.add('tetromino')
    displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
  })
}

startBtn.addEventListener('click', () => {

  var currentvalue = document.getElementById('start-button').value;

  if(currentvalue == "start"){
  clearInterval(timerId); 
  timerId = null;   
  

  document.getElementById("start-button").value="pause";
  }
  else{
    document.getElementById("start-button").value="start";
    draw();
    timerId = setInterval(moveDown, number)
     nextRandom = Math.floor(Math.random()*allterto.length)
     displayShape();
  }
})


  function addScore() {
    for (let i = 0; i < 199; i +=wid) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

      if(row.every(index => squares[index].classList.contains('taken'))) {
        score +=10
        scoreDisplay.innerHTML = score
        row.forEach(index => {
          squares[index].classList.remove('taken')
          squares[index].classList.remove('tetromino')
          squares[index].style.backgroundColor = ''
        })
        const squaresRemoved = squares.splice(i, wid)
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
    }
  }


function gameOver() {
if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
  scoreDisplay.innerHTML = 'end'
  clearInterval(timerId)

}
}

 

})
window.addEventListener('keydown', (e) => {
  if (e.target.localName != 'input') {   // if you need to filter <input> elements
      switch (e.keyCode) {
          case 37: // left
          case 39: // right
              e.preventDefault();
              break;
          case 38: // up
          case 40: // down
              e.preventDefault();
              break;
          default:
              break;
      }
  }
}, {
  capture: true,   // this disables arrow key scrolling in modern Chrome
  passive: false   // this is optional, code works without it
});