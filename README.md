# SEI-project-1
Vanilla Javascript Game  

### Timeframe
7 days

## Technologies used

* Vanilla JavaScript (ES6)
* HTML5
* CSS
* git
* gitHub

## Installation

1. Clone or download the repo
1. Open the `index.html` in your browser of choice

## Overview

![lucha-screenshot2](https://user-images.githubusercontent.com/38182323/55620553-107dce00-5793-11e9-832e-b7b061156908.png)

Live version can be found here: https://lhmurphy.github.io/SEI-project-1/

### Introduction
Inspired by a recent trip to Mexico, my first SEI project is the classic Space Invaders game with a twist. In this version, the invading aliens are an army of Luche Libre extraterrestrials.

### Controls
←  → keys to move the player
Spacebar to shoot the bullets

### Game Instructions
1. The game begins with a start page introducing the theme of the game to the player. The player is instructed to kill the invading Luche Libre aliens.
1. Upon pressing the start button, the game begins with the aliens moving across the top of the page shooting bombs, at random intervals, at the player. 
1. The player is able to shoot the invading aliens using the spacebar, gaining 1 point per alien. 
1. Game Over happens if the player loses all 3 of their lives or if the aliens reach the player at the bottom of the page.

## Process
I started with creating a Trello board to plan out each step, this helped to break down the game into manageable chunks. Next I took some time to plan a wireframe for the basic layout but to also understand where the array of aliens would sit within the grid. To create the grid I used a for loop to generate individual divs in formation of 16 x 8. 

The first hurdle in writing the code was to create the logic for the aliens and to ensure they moved along the full width of the grid before then going down a row and making their way towards the player. The aliens start position are saved in an array variable while their movement is decided in a function called moveAliens which maps the sum of a second array to add +1 or -1 depending on the direction they are going and +width to go down one row.  

Timed intervals are used for:
- The bombs that drop from an alien at random
- The aliens movement 
- The bullets fired from the player
- The exploding bombs on collision with player
- The exploding bullets on collision with alien

The player start position is hard coded at a central point at the bottom of the grid and is able to move left and right only, this movement is on keydown event listener.

### Challenges
The most challenging part in this project was executing the logic of the alien movement and ensuring all timed intervals were stopped or cleared as they created a lot of issues with the game restart. This project was a huge learning curve and I really enjoyed the challange and putting all the things we've learnt so far into practice. 

### Wins
I am so pleased to have a functional game with no bugs after encountering recurring bugs throughout the process. The biggest win was getting the aliens to move across and down the page using map and splice on two arrays.  

## Future features
* Further styling
* Sounds
* Leaderboard
* Responsive
