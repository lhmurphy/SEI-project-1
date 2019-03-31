document.addEventListener('DOMContentLoaded', () => {

  const grid = document.querySelector('.grid')
  const width = 16
  const height = 8
  const squares = []
  let playerIndex = 120
  //let alienIndex = 0
  //const bulletLocation = [playerIndex - width]

  //let testAliens = [54, 55, 56]

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
      setInterval(() => {
        squares[bulletIndex].classList.remove('bullet')
        bulletIndex -= width
        squares[bulletIndex].classList.add('bullet')
      }, 500)
    }
  })

  //=========ALIENS=========

  aliens.forEach(alienIndex => {
    squares[alienIndex].classList.add('alien')
  })

  function aliensRight() {
    // loop over aliens array and remove alien class from current squares
    aliens.forEach(alienIndex => {
      squares[alienIndex].classList.remove('alien')
    })
    // update array with plus 1 index
    aliens = aliens.map(alienIndex => alienIndex + 1)

    // loop over array again and add class of alien to new squares
    aliens.forEach(alienIndex => {
      squares[alienIndex].classList.add('alien')
    })


  }

  function aliensLeft() {

    // loop over aliens array and remove alien class from current squares
    aliens.forEach(alienIndex => {
      squares[alienIndex].classList.remove('alien')
    })
    // update array with plus 1 index
    aliens = aliens.map(alienIndex => alienIndex - 1)

    // loop over array again and add class of alien to new squares
    aliens.forEach(alienIndex => {
      squares[alienIndex].classList.add('alien')
    })
  }

  var interval = setInterval(() => {
    aliensRight()
    const lastAlienIndex = aliens[0]
    if(
      aliens[lastAlienIndex] === 10
    ) {

      aliens.forEach(alienIndex => {
        squares[alienIndex].classList.remove('alien')
      })
      aliens = aliens.map(alienIndex => alienIndex + 16)


      clearInterval(interval)

      aliensLeft()
      setInterval(aliensLeft, 1000)
      // aliens.forEach(alienIndex => {
      //   squares[alienIndex].classList.add('alien')
      // })
      console.log(aliensLeft)
      console.log(aliens)
    }

    // when alien array reaches width-1 (15), need to plus 16 to whole array
    // then need to move aliens alienIndex-- each time

  }, 1000)



  // //=========TEST ALIENS=========
  //
  // testAliens.forEach(testAlienIndex => {
  //   squares[testAlienIndex].classList.add('alien')
  // })
  //
  // setInterval(() => {
  //   testAliens.forEach(testAlienIndex => {
  //     squares[testAlienIndex].classList.remove('alien')
  //   })
  //   testAliens = testAliens.map(testAlienIndex => testAlienIndex - 1)
  //
  //   // loop over array again and add class of alien to new squares
  //   testAliens.forEach(testAlienIndex => {
  //     squares[testAlienIndex].classList.add('alien')
  //   })
  // }, 200)


// DO NOT REMOVE BRACKETS BELOW
})


// so stuck on how to use the updated map array the then move all the alies down a row and then move them back across the other way
// first approach to make aliens go backwards was to test them from startign point which meant they were going into negatives in the array which came back as undefined so that was unehlpful.
// putting all the functions within one setinterval is not working
//
