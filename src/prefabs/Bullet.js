// Rocket (player) prefab
class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to the existing scene
        scene.add.existing(this);
        this.isFiring = false;          // track the rocket firing status
        this.moveSpeed = 2;             // pixels per frame
        
        //add sfx
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update() {
        // move invisibly with the cannon
        if(!isFiring) {
            this.alpha = 0;
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }
        // if fired, shoot the bullet
        if(isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.alpha = 1;
            this.y -= this.moveSpeed;
        }
        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    // reset bullet to cannon position
    reset() {
        this.alpha = 0;
        isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding*4.7;

    }
}