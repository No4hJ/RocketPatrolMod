/*
# RocketPatrolMod
Name: Noah Jiang
Project title: Guardians of the Universe
Date: 4/18/2021
Time spent: two afternoons and one night on the weekend, approximately 14-15 hours
Help received: I have received help from the online phaser notes
https://rexrainbow.github.io/phaser3-rex-notes/docs/site/audio/

Points breakdown:
Add your own (copyright-free) background music to the Play scene (5)
Create a new scrolling tile sprite for the background (5)
Track a high score that persists across scenes and display it in the UI (5)
Display the time remaining (in seconds) on the screen (10)
Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20) 
Create and implement a new weapon (w/ new behavior and graphics) (20)
Implement a simultaneous two-player mode (30)

Explaination: 
This is my first time doing visual art work so im sorry if they look bad XD
I just used some modular sequencer to generate random notes to produce the bgm
Hope you enjoy the game!
*/

// game configuration
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let starSpeed = 2;

// reserve keyboard bindings
let keyA, keyD, keyW, keyR, keyM, keyLEFT, keyRIGHT, keyUP;

//highScore array that stores all the score
let highScore = [];

// define isFiring
let isFiringp1 = false;
let isFiringp2 = false;
