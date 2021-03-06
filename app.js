document.addEventListener('DOMContentLoaded', () => {

  const board = document.querySelector('.board')
  const start = document.querySelector('.start')
  const grid = document.querySelector('.grid')
  const totalScore = document.querySelector('.score-total')
  const playAgainDiv = document.querySelector('.play-again')
  const loseDiv = document.querySelector('.you-lose')
  const scoreDiv = document.querySelector('.score')
  const playerLivesDiv = document.querySelector('.lives')
  const introDiv = document.querySelector('.intro')
  const width = 16
  const height = 10
  const squares = []
  const alienMovement = [1, 1, 1, 1, 1, 1, width, -1, -1, -1, -1, -1, -1, width]
  const alienStart = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
    32, 33, 34, 35, 36, 37, 38, 39, 40, 41
  ]
  let gameInPlay = false
  let currentMove = 0
  let randomAlienInterval
  let aliensInterval
  let playerIndex = 150
  let score = 0
  let playerLives = 3
  let aliens = alienStart.slice()

  // start.innerText = 'Click here to play'

  function setAlienClass() {
    aliens.forEach(alienIndex => {
      // console.log('toggling alien on ', alienIndex)
      squares[alienIndex].classList.toggle('alien')
    })
  }

  function clearClass(className){
    squares.forEach(element => {
      element.classList.remove(className)
    })
  }

  function startGame() {
    gameInPlay = true
    clearClass('alien')
    clearClass('bomb')
    clearClass('bullet')
    clearClass('boom')
    clearClass('player')
    setAlienClass()
    aliensInterval = setInterval(moveAliens, 600)
    randomAlienInterval = setInterval(alienBombs, 800)
    playerIndex = 152
    score = 0
    playerLives = 3
    currentMove = 0
    scoreDiv.innerText = 0
    playerLivesDiv.innerText = 3
    start.classList.add('hidden')
    playAgainDiv.classList.add('hidden')
    totalScore.classList.add('hidden')
    loseDiv.classList.add('hidden')
    loseDiv.classList.add('hidden')
    introDiv.classList.add('hidden')
    squares[playerIndex].classList.add('player')
    grid.classList.remove('hidden')
    board.classList.remove('hidden')
    board.classList.remove('hidden')
    addEvents()
  }

  function endGame() {
    gameInPlay = false
    clearClass('alien')
    clearClass('bomb')
    clearClass('bullet')
    clearClass('boom')
    clearClass('player')
    aliens = alienStart.slice()
    clearInterval(aliensInterval)
    clearInterval(randomAlienInterval)
    removeEvents()
    grid.classList.add('hidden')
    board.classList.add('hidden')
    // console.log('endgame running')
  }


  //=========GRID=========

  for(let i = 0; i < width * height; i++) {
    const square = document.createElement('div')
    squares.push(square)
    grid.appendChild(square)
  }

  //=========PLAYER=========

  squares[playerIndex].classList.add('player')
  // find the square that contains player then remove it and add at the new playerIndex
  function playerMove(){
    const player = squares.find(square => square.classList.contains('player'))
    player.classList.remove('player')
    squares[playerIndex].classList.add('player')
  }

  // event listener on player left and right
  function handleSpaceShipMove(e) {
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
  }

  //=========PLAYER BULLETS=========

  // event listener on spacebar
  function handleShootBullets(e) {
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
          setTimeout(() => {
            squares[bulletIndex].classList.remove('explode')
          }, 1000)

          // remove both the alien and the bullet
          squares[bulletIndex].classList.remove('alien')
          squares[bulletIndex].classList.remove('bullet')
        }
        if(!gameInPlay) clearInterval(bulletInterval)
      }, 200)
      // bulletIntervals.push(bulletInterval)
    }
  }

  //=========ALIENS=========

  function moveAliens() {
    setAlienClass()
    // update the array with plus 1 to each alien index
    aliens = aliens.map(alienIndex => alienIndex + alienMovement[currentMove])
    // loop over array again and add class of alien to new squares
    setAlienClass()
    // increase the current move by 1
    currentMove++
    //
    if(currentMove === alienMovement.length) {
      //
      currentMove = 0
    }
    // if some of the aliens reach the furthest most point in the grid, then end the game
    if(aliens.some(alien => alien >= 111)) {
      // console.log('aliens reached bottom')
      playAgainDiv.classList.remove('hidden')
      totalScore.classList.remove('hidden')
      loseDiv.innerText = 'You lost!'
      loseDiv.classList.remove('hidden')
      playAgainDiv.innerText = 'Play again?'
      totalScore.innerHTML = `Your score: ${score}`
      endGame()
    }

    // if there are no aliens left, end the game
    if(aliens.length === 0) {
      playAgainDiv.classList.remove('hidden')
      totalScore.classList.remove('hidden')
      loseDiv.innerText = 'You\'re a winner!'
      loseDiv.classList.remove('hidden')
      playAgainDiv.innerText = 'Play again?'
      totalScore.innerHTML = `Your score: ${score}`
      endGame()
    }
  }
  //=========EVENT LISTENERS=========

  function addEvents(){
    document.addEventListener('keydown', handleSpaceShipMove)
    document.addEventListener('keydown', handleShootBullets)
  }

  function removeEvents(){
    document.removeEventListener('keydown', handleSpaceShipMove)
    document.removeEventListener('keydown', handleShootBullets)
  }

  //=========ALIEN BOMBS=========

  function livesLost() {
    // decrease lives by 1 each time
    playerLives--
    console.log(playerLives)
    // show s lives on screen
    playerLivesDiv.innerHTML = playerLives
    squares[playerIndex].classList.add('boom')
    setTimeout(() => {
      squares[playerIndex].classList.remove('boom')
    }, 100)
  }

  function alienBombs() {

    // pick random alien - math.random
    let randomAlien = aliens[Math.floor(Math.random() * aliens.length)]

    const bombInterval = setInterval(() => {
      if(!gameInPlay) clearInterval(bombInterval)
      // if the randomly selected alien is less than the numbers on the grid (it appears on the grid)
      if(randomAlien <= 159) {
        // remove the bomb
        squares[randomAlien].classList.remove('bomb')
        // inscreade the alien by width (make it do down one row each time)
        randomAlien += width
        // add the bomb at the new index
        if(!squares[randomAlien]) {
          clearInterval(bombInterval)
          return false
        }
        squares[randomAlien].classList.add('bomb')
      } else {
        // if the bomb is off the page then remove the bomb (this should stop the errors BUT IT DOES NOT)
        squares[randomAlien].classList.remove('bomb')
      }
      // if the bomb hits the player (which is the incrementing location of the random alien bomb)
      if(squares[randomAlien].classList.contains('player')) {

        livesLost()

        squares[randomAlien].classList.remove('bomb')
        // stop bomb interval
        clearInterval(bombInterval)
      }
      // if all player lives are gone
      if (playerLives === 0) {
        playAgainDiv.classList.remove('hidden')
        playAgainDiv.innerText = 'Play again?'
        totalScore.classList.remove('hidden')
        totalScore.innerHTML = `Your score: ${score}`
        loseDiv.classList.remove('hidden')
        loseDiv.innerText = 'You lost!'
        squares[playerIndex].classList.remove('player')
        squares[randomAlien].classList.remove('bomb')
        clearInterval(randomAlienInterval)
        clearInterval(bombInterval)
        endGame()
      }
    }, 500)

  }

  start.addEventListener('click', startGame)
  playAgainDiv.addEventListener('click', startGame)

  //============DO NOT REMOVE BRACKETS BELOW

})


// so stuck on how to use the updated map array the then move all the alies down a row and then move them back across the other way
// first approach to make aliens go backwards was to test them from startign point which meant they were going into negatives in the array which came back as undefined so that was unehlpful.
// putting all the functions within one setinterval is not working
//

// need to tell both functions to hide/add
