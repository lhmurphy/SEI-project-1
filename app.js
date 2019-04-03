document.addEventListener('DOMContentLoaded', () => {

  const grid = document.querySelector('.grid')
  const totalScore = document.querySelector('.score-total')
  const playAgainDiv = document.querySelector('.play-again')


  const width = 16
  const height = 8
  const squares = []
  let playerIndex = 120
  let score = 0
  let playerLives = 3
  //let gameInPlay = true

  const scoreDiv = document.querySelector('.score')
  const playerLivesDiv = document.querySelector('.lives')

  // new array to add to aliens.map, this moves the array along 4 and then down 16
  const alienMovement = [1, 1, 1, 1, width, -1, -1, -1, -1, width]
  let currentMove = 0

  let aliens = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
    32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43
  ]

  // this function will bring up the end of game page with: final score, play again button to refresh screen
  function endGame() {
    //gameInPlay = false
    clearInterval(aliensInterval)
    setTimeout(() => {
      grid.remove('.grid')
      playAgainDiv.innerText = 'You lost! Play again?'
      totalScore.innerText = `Your score: ${score}`
      // totalScore.innerText = `Your score: ${score}`
    }, 1500)
  }

  function createAlien() {
    aliens.forEach(alienIndex => {
      squares[alienIndex].classList.add('alien')
    })
  }

  function createGrid() {
    for(let i = 0; i < width * height; i++) {
      const square = document.createElement('div')
      squares.push(square)
      grid.appendChild(square)
    }
  }



  // need play again function with: new grid, restart aliens moving, score at zero, lives at 3

  //=========GRID=========

  createGrid() // put this into a newGame function

  //=========PLAYER=========

  // add player class to player index of 120 (hard coded in variables)
  squares[playerIndex].classList.add('player')

  // find the square that contains player then remove it and add at the new playerIndex
  function playerMove(){
    const player = squares.find(square => square.classList.contains('player'))
    player.classList.remove('player')
    squares[playerIndex].classList.add('player')
  }

  // event listener on player left and right
  document.addEventListener('keydown', (e) => {
    switch(e.keyCode) {
      case 37:
      //left if the location of player is divisble by the width
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

  // event listener on spacebar
  document.addEventListener('keydown', (e) => {
    // give bullet index the same location as the player index
    let bulletIndex = playerIndex
    if(e.keyCode === 32) {
      // give the bullet interval a setinterval variable to clear later
      const bulletInterval = setInterval(() => {
        // if location of bullet minus 16 is great than or equal to zero then minus one each time to go up the page
        if (bulletIndex - width >= 0) {
          squares[bulletIndex].classList.remove('bullet')
          bulletIndex -= width
          squares[bulletIndex].classList.add('bullet')
        } else {
          // remove bullets once they get below 0 (off the top of page)
          squares[bulletIndex].classList.remove('bullet')
        }
        // if bullet location contains alien, plus score
        if(squares[bulletIndex].classList.contains('alien')) {
          squares[bulletIndex].classList.remove('bullet')
          score++
          scoreDiv.innerHTML = score

          clearInterval(bulletInterval)
          // find the index of bullet index within the aliens array
          const index = aliens.indexOf(bulletIndex)
          // remove the found index from the array
          aliens.splice(index,1)
          // if bullet index contains alien, add explode class
          if(squares[bulletIndex].classList.contains('alien')) {
            squares[bulletIndex].classList.add('explode')
          }
          setInterval(() => {
            squares[bulletIndex].classList.remove('explode')
          }, 100)

          // remove both the alien and the bullet
          squares[bulletIndex].classList.remove('alien')
          squares[bulletIndex].classList.remove('bullet')

        }
      }, 200)
    }
  })

  //=========ALIENS=========

  // create aliens
  createAlien()

  // set moving interval on all aliens
  const aliensInterval = setInterval(() => {
    // for each alien...
    aliens.forEach(alienIndex => {
      // remove all the aliens first
      squares[alienIndex].classList.remove('alien')
    })
    // update the array with plus 1 to each alien index
    aliens = aliens.map(alienIndex => alienIndex + alienMovement[currentMove])
    // loop over array again and add class of alien to new squares
    createAlien()
    // increase the current move by 1
    currentMove++
    //
    if(currentMove === alienMovement.length) {
      //
      currentMove = 0
    }
    // if some of the aliens reach the furthest most point in the grid, then end the game
    if(aliens.some(alien => alien >= 127)) {
      endGame()
    }
  }, 1000)

  //=========ALIEN BOMBS=========

  function alienBombs() {
    const randomAlienInterval = setInterval(() => {
    // pick random alien - math.random
      let randomAlien = aliens[Math.floor(Math.random() * aliens.length)]

      const bombInterval = setInterval(() => {
        // if the randomly selected alien is less than the numbers on the grid (it appears on the grid)
        if(randomAlien <= 127) {
          // remove the bomb
          squares[randomAlien].classList.remove('bomb')
          // inscreade the alien by width (make it do down one row each time)
          randomAlien += width
          // add the bomb at the new index
          squares[randomAlien].classList.add('bomb')
        } else {
          // if the bomb is off the page then remove the bomb (this should stop the errors BUT IT DOES NOT)
          squares[randomAlien].classList.remove('bomb')
        }
        // if the bomb hits the player (which is the incrementing location of the random alien bomb)
        if(squares[randomAlien].classList.contains('player')) {
          // decrease lives by 1 each time
          playerLives--
          // show current lives on screen
          playerLivesDiv.innerHTML = playerLives
          // remove bomb
          squares[randomAlien].classList.remove('bomb')
          // stop bomb interval
          clearInterval(bombInterval)

        }
        // if all player lives are gone
        if (playerLives === 0) {
          // add class of boom to randomalien
          squares[randomAlien].classList.add('boom')
          squares[randomAlien].classList.remove('player')
          clearInterval(randomAlienInterval)
          clearInterval(bombInterval)
          // gameInPlay = false
          endGame()
        }
      }, 500)
    }, 2000)
  }

  alienBombs()


//============DO NOT REMOVE BRACKETS BELOW
})


// so stuck on how to use the updated map array the then move all the alies down a row and then move them back across the other way
// first approach to make aliens go backwards was to test them from startign point which meant they were going into negatives in the array which came back as undefined so that was unehlpful.
// putting all the functions within one setinterval is not working
//
