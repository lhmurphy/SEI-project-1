document.addEventListener('DOMContentLoaded', () => {

  const grid = document.querySelector('.grid')
  const width = 16
  const height = 8
  const squares = []
  let playerIndex = 120
  let score = 0
  //let alienIndex = 0
  //const bulletLocation = [playerIndex - width]

  const scoreDiv = document.getElementById('score')

  const alienMovement = [1, 1, 1, 1, width, -1, -1, -1, -1, width]
  let currentMove = 0

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
    let bulletIndex = playerIndex
    if(e.keyCode === 32) {
      const bulletInterval = setInterval(() => {
        if (bulletIndex - width >= 0) {
          squares[bulletIndex].classList.remove('bullet')
          bulletIndex -= width
          squares[bulletIndex].classList.add('bullet')
        } else {
          squares[bulletIndex].classList.remove('bullet')
        }

        if(squares[bulletIndex].classList.contains('alien')) {
          squares[bulletIndex].classList.remove('bullet')
          score++
          scoreDiv.innerHTML = score
          clearInterval(bulletInterval)

          const index = aliens.indexOf(bulletIndex)
          aliens.splice(index,1)

          squares[bulletIndex].classList.remove('alien')
          squares[bulletIndex].classList.remove('bullet')

        }
      }, 200)
    }

  })

  //=========ALIENS=========

  // when alien array reaches width-1 (15), need to plus 16 to whole array
  // then need to move aliens alienIndex-- each time

  aliens.forEach(alienIndex => {
    squares[alienIndex].classList.add('alien')
  })

  const aliensInterval = setInterval(() => {
    aliens.forEach(alienIndex => {
      squares[alienIndex].classList.remove('alien')
    })
    // update array with plus 1 index
    aliens = aliens.map(alienIndex => alienIndex + alienMovement[currentMove])

    // loop over array again and add class of alien to new squares
    aliens.forEach(alienIndex => {
      squares[alienIndex].classList.add('alien')
    })

    currentMove++
    // console.log(currentMove)
    // console.log(aliens)

    if(currentMove === alienMovement.length) {
      currentMove = 0
    }
    if(aliens.some(alien => alien >= 127)) clearInterval(aliensInterval)

  }, 1000)

  //=========ALIENS BULLETS=========

  function alienBombs() {
    const alienBombInterval = setInterval(() => {
    // pick random number - math.random
      let randomAlien = aliens[Math.floor(Math.random() * aliens.length)]

      setInterval(() => {
        if(randomAlien + width <= 127) {
          squares[randomAlien].classList.remove('bomb')
          randomAlien += width
          squares[randomAlien].classList.add('bomb')
        } else {
          squares[randomAlien].classList.remove('bomb')
        }
        if(squares[randomAlien].classList.contains('player')) {
          squares[randomAlien].classList.remove('player')
          squares[randomAlien].classList.remove('bomb')

          clearInterval(alienBombInterval)
          clearInterval(aliensInterval)
        }
      }, 500)

    }, 2000)
    // link that random number with alienIndex
    // assign random number to the aliens
    // add set interval to the random number and remove/add class
  }

  alienBombs()


// DO NOT REMOVE BRACKETS BELOW
})


// so stuck on how to use the updated map array the then move all the alies down a row and then move them back across the other way
// first approach to make aliens go backwards was to test them from startign point which meant they were going into negatives in the array which came back as undefined so that was unehlpful.
// putting all the functions within one setinterval is not working
//
