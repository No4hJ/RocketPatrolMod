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
