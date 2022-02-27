document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div')) 
    const wid = 10

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
 
 

})