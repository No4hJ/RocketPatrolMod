class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    //init(), preload(), create(), update()
    preload(){
        // load images/tile sprites
        this.load.image('cannon', './assets/gun.png');
        this.load.image('cannon2','./assets/gun2.png');
        this.load.image('bullet', './assets/bullet.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('earth', './assets/earth.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 102,
            frameHeight: 36,
            startFrame: 0,
            endFrame: 7
        });
    }

    create() {

        let music = this.sound.add('bgm');
        //initialize highest score
        this.highest = 0;

        //place starfield
        this.earth = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'earth')
        .setOrigin(0, 0);
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield')
        .setOrigin(0, 0);


        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, 
        borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin
        (0,0); // top bar
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, 
        borderUISize, 0xFFFFFF).setOrigin(0, 0); // bottom bar
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin
        (0, 0); // left bar
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.
        config. height, 0xFFFFFF).setOrigin(0, 0); // right bar

        // add cannon (player1)
        this.p1Cannon = new Cannon(this, game.config.width/2, game.config.height - 
        borderUISize - borderPadding*4.7, 'cannon').setOrigin(0.5, 0);
        // add bullet (player 1)
        this.p1Bullet = new Bullet(this, game.config.width/2, game.config.height - 
        borderUISize - borderPadding*4.7, 'bullet').setOrigin(0.5, 0);
        // add cannon and bullet (player 2)
        this.p2Cannon = new Cannon2(this, game.config.width/2 + 10, game.config.height - 
        borderUISize - borderPadding*4.7, 'cannon2').setOrigin(0.5, 0);
        this.p2Bullet = new Bullet2(this, game.config.width/2 + 10, game.config.height - 
        borderUISize - borderPadding*4.7, 'bullet').setOrigin(0.5, 0);

        // add spaceship (x4)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4,
        'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 +
        borderPadding*2, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width,borderUISize*6 + borderPadding*4,
        'spaceship', 0, 10).setOrigin(0, 0);
        this.ship04 = new SpaceshipSmall(this, game.config.width, borderUISize* 3 + borderPadding * 4,
        'rocket', 0, 100).setOrigin(0, 0);
            

        // define keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 7,
                first: 0
            }),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;
        this.p2Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        };
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + 
        borderPadding*2, 'P1: ' + this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(game.config.width - borderUISize - borderPadding*11, borderUISize + 
        borderPadding*2, 'P2: ' + this.p2Score, scoreConfig);
        // GAME OVER flag
        this.gameOver = false;
        
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            highScore.push(this.p1Score);
            highScore.push(this.p2Score);
            this.highest = Math.max(...highScore);
            console.log(this.highest);
            console.log(highScore);
            this.add.text(game.config.width/2 - 100, borderUISize + borderPadding*2, 'TIME LEFT: 0', scoreConfig).setOrigin(0, 0);
            this.add.text(game.config.width/2, game.config.height/2 - 20, 'GAME OVER!!!', scoreConfig).setOrigin(0.5);
            if(this.p1Score > this.p2Score) {
                this.add.text(game.config.width/2, game.config.height/2 + 20, 'P1 WIN!', scoreConfig).setOrigin(0.5);
            }else if(this.p2Score > this.p1Score) {
                this.add.text(game.config.width/2, game.config.height/2 + 20, 'P2 WIN!', scoreConfig).setOrigin(0.5);
            }else {
                this.add.text(game.config.width/2, game.config.height/2 + 20, 'TIE?!', scoreConfig).setOrigin(0.5);
            }
            this.add.text(game.config.width/2, game.config.height/2 + 60, 'HIGH SCORE: ' + this.highest, scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 100, '(R) to Restart or (M) for Menu',
            scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            music.stop();
        }, null, this);

        //initialize timer
        this.Timer = game.settings.gameTimer;

        //display timer
        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        };
        this.timeLeft = this.add.text(game.config.width/2 - 100, borderUISize + borderPadding*2, 'TIME LEFT: ' + this.Timer, timeConfig).setOrigin(0, 0);

        //play the background music
        music.play();
        
    }

    update(){
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }   
            
        // check key input for returning to menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= starSpeed;

        if(!this.gameOver) {
            // update players
            this.p1Cannon.update();
            this.p1Bullet.update();
            this.p2Cannon.update();
            this.p2Bullet.update();
            // update spaceships (x3)
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();  
            this.ship04.update();

            // update timer to get time
            this.Timer = game.settings.gameTimer - this.clock.getElapsed();
            // display updated time
            this.timeLeft.text = 'TIME LEFT: ' + Math.floor(this.Timer/1000 + 1);
        }

        // check collisions & give points to the corresponding player
        //if player 1 hits
        if(this.checkCollision(this.p1Bullet, this.ship04)){
            this.p1Bullet.reset();
            this.shipExplode(this.ship04);
            this.p1Score += this.ship04.points;
            this.scoreLeft.text = 'P1: ' + this.p1Score;
        }
        if(this.checkCollision(this.p1Bullet, this.ship03)){
            this.p1Bullet.reset();
            this.shipExplode(this.ship03);
            this.p1hit = true;
            this.p1Score += this.ship03.points;
            this.scoreLeft.text = 'P1: ' + this.p1Score;
        }
        if(this.checkCollision(this.p1Bullet, this.ship02)){
            this.p1Bullet.reset();
            this.shipExplode(this.ship02);
            this.p1hit = true;
            this.p1Score += this.ship02.points;
            this.scoreLeft.text = 'P1: ' + this.p1Score;
        }
        if(this.checkCollision(this.p1Bullet, this.ship01)){
            this.p1Bullet.reset();
            this.shipExplode(this.ship01);
            this.p1hit = true;
            this.p1Score += this.ship01.points;
            this.scoreLeft.text = 'P1: ' + this.p1Score;
        }
        // if player 2 hits
        if(this.checkCollision(this.p2Bullet, this.ship04)){
            this.p2Bullet.reset();
            this.shipExplode(this.ship04);
            this.p2Score += this.ship04.points;
            this.scoreRight.text = 'P2: ' + this.p2Score;
        }
        if(this.checkCollision(this.p2Bullet, this.ship03)){
            this.p2Bullet.reset();
            this.shipExplode(this.ship03);
            this.p2Score += this.ship03.points;
            this.scoreRight.text = 'P2: ' + this.p2Score;
        }
        if(this.checkCollision(this.p2Bullet, this.ship02)){
            this.p2Bullet.reset();
            this.shipExplode(this.ship02);
            this.p2Score += this.ship02.points;
            this.scoreRight.text = 'P2: ' + this.p2Score;
        }
        if(this.checkCollision(this.p2Bullet, this.ship01)){
            this.p2Bullet.reset();
            this.shipExplode(this.ship01);
            this.p2Score += this.ship01.points;
            this.scoreRight.text = 'P2: ' + this.p2Score;
        }
    }


    checkCollision(rocket, ship) {
        // simple AABB checking
        if( rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        // score add and repaint

        // play sfx
        this.sound.play('sfx_explosion');
    }
}
