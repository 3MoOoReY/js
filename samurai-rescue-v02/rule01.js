//storyline.js

class rule01 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'rule01' });
    }

    
    preload(){
    // instructions2
    this.load.image('rule01PNG', 'assets/screens/Screen_06.jpg');

    }

    create() {
        this.add.image(0, 0, 'rule01PNG').setOrigin(0, 0);

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            console.log("Spacebar pressed, goto instruction01");
            this.scene.start("bigworld");
            }, this );


    }

    update(){



    }
}