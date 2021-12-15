//storyline.js

class gameover extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'gameover' });
    }

    
    preload(){
    // instructions2
    this.load.image('gameoverPNG', 'assets/screens/Screen_07.png');

    }

    create() {
        this.add.image(0, 0, 'gameoverPNG').setOrigin(0, 0);

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            // console.log("Spacebar pressed, goto instruction01");
            this.scene.start("bigworld");
            }, this );


    }

    update(){

        if (window.health == 0){
            window.health = window.health + 3;
        } 





    }
}