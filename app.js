document.addEventListener('DOMContentLoaded', () => {

  const grid = document.querySelector('.grid')
  const width = 16
  const height = 8
  const squares = []
  let bullet = 0
  let playerIndex = 120

  let aliens = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
    32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43
  ]

  //=========GRID=========

  for(let i = 0; i < width * height; i++) {
    const square = document.createElement('div')
    squares.push(square)
    grid.appendChild(square)
  }

  //=========PLAYER=========

  squares[playerIndex].classList.add('player')

  function playerMove(){
    const player = squares.find(square => square.classList.contains('player'))
    player.classList.remove('player')
    squares[playerIndex].classList.add('player')
  }

  document.addEventListener('keydown', (e) => {
    switch(e.keyCode) {
      case 37:
      //left
        if (playerIndex % width > 0) {
          playerIndex--
          playerMove()
        }
        break

      case 39:
      // right
        if (playerIndex % width < width -1) {
          playerIndex++
          playerMove()
        }
        break
    }
  })

  //=========PLAYER BULLETS=========

  document.addEventListener('keydown', (e) => {
    if(e.keyCode === 32){
      bullet = squares[playerIndex - width].innerText  = '|'
    }
  })

  //=========ALIENS=========

  aliens.forEach(alienIndex => {
    squares[alienIndex].classList.add('alien')
  })

  setInterval(() => {
    aliens.forEach(alienIndex => {
      squares[alienIndex].classList.remove('alien')
    })

    aliens = aliens.map(alienIndex => alienIndex + 1)

    aliens.forEach(alienIndex => {
      squares[alienIndex].classList.add('alien')
    })
  }, 500)


// DO NOT REMOVE BRACKETS BELOW
})
