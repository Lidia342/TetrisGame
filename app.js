document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div')) 
    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    const wid = 10
    let nextRandom = 0
    let score = 0
    const colors = [
        'orange',
        'red',
        'purple',
        'green',
        'blue'
      ]

  //The Tetrominoes
  const lTetromino = [
    [1, wid+1, wid*2+1, 2],
    [wid, wid+1, wid+2, wid*2+2],
    [1, wid+1, wid*2+1, wid*2],
    [wid, wid*2, wid*2+1, wid*2+2]
  ]

  const zTetromino = [
    [0,wid,wid+1,wid*2+1],
    [wid+1, wid+2,wid*2,wid*2+1],
    [0,wid,wid+1,wid*2+1],
    [wid+1, wid+2,wid*2,wid*2+1]
  ]

  const tTetromino = [
    [1,wid,wid+1,wid+2],
    [1,wid+1,wid+2,wid*2+1],
    [wid,wid+1,wid+2,wid*2+1],
    [1,wid,wid+1,wid*2+1]
  ]

  const oTetromino = [
    [0,1,wid,wid+1],
    [0,1,wid,wid+1],
    [0,1,wid,wid+1],
    [0,1,wid,wid+1]
  ]

  const iTetromino = [
    [1,wid+1,wid*2+1,wid*3+1],
    [wid,wid+1,wid+2,wid+3],
    [1,wid+1,wid*2+1,wid*3+1],
    [wid,wid+1,wid+2,wid+3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  let currentPosition = 4
  let currentRotation = 0

  //randomly select a tetromino and its first rotation
  let random = Math.floor(Math.random()*theTetrominoes.length)
  let current = theTetrominoes[random][currentRotation]



  //draw first rotation in the first tetromino
  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino')
      squares[currentPosition + index].style.backgroundColor = colors[random] 
     
    })
  }
  
  // undraw tetromino
  function undraw(){
      current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetromino')
        squares[currentPosition + index].style.backgroundColor = ''
      })
  }

  timerId= setInterval(moveDown, 1000);

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

  //move down funciton 
  function moveDown(){
      undraw()
      currentPosition += wid
      draw()
      freeze()
  }

    //freeze function
    function freeze() {
      if(current.some(index => squares[currentPosition + index + wid].classList.contains('taken'))) {
        current.forEach(index => squares[currentPosition + index].classList.add('taken'))
        //start a new tetromino falling
        random = nextRandom
        nextRandom =  Math.floor(Math.random() * theTetrominoes.length)
        current = theTetrominoes[random][currentRotation]
        currentPosition = 4
        draw()
        //displayShape()
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

//rotate the tetromino
function rotate() {
  undraw()
  currentRotation ++
  if(currentRotation === current.length) { //if the current rotation gets to 4, make it go back to 0
    currentRotation = 0
  }
  current = theTetrominoes[random][currentRotation]
  //checkRotatedPosition()
  draw()
}

const displaySquares = document.querySelectorAll('.mini-grid div')
const displayWid = 4


//the Tetrominos without rotations
const upNextTetrominoes = [
  [1, displayWid+1, displayWid*2+1, 2], //lTetromino
  [0, displayWid, displayWid+1, displayWid*2+1], //zTetromino
  [1, displayWid, displayWid+1, displayWid+2], //tTetromino
  [0, 1, displayWid, displayWid+1], //oTetromino
  [1, displayWid+1, displayWid*2+1, displayWid*3+1] //iTetromino
]


        //add functionality to the button
  startBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown, 1000)
      nextRandom = Math.floor(Math.random()*theTetrominoes.length)
      //displayShape()
    }
  })

  //add score
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

 /* if(isStorage && localStorage.getItem('fap-scores').split(','))*/



    //game over
function gameOver() {
if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
  scoreDisplay.innerHTML = 'end'
 /* isStorage && localStorage.setItem('fap-scores', elements.socres)*/
  clearInterval(timerId)
}
}

 

})