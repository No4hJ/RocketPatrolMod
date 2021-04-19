// Cannon (player2) prefab
class Cannon2 extends Phaser.GameObjects.Sprite {
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
        // left/ right movement
        if(!isFiringp2) {
            if(keyA.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyD.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }
        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyW) && !isFiringp2) {
            isFiringp2 = true;
            this.sfxRocket.play();   // play sfx
        }
    }

}