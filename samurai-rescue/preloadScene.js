class preloadScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'preloadScene' });
    }


    create () {

        this.add.text(10, 10, 'Samurai Rescue', { font: '24px Courier', fill: '#FFFF00' });

        console.log("preloadScene")
        this.add.text(10,500, 'Animation labs, press spacebar to continue', 
            { font: '24px Courier', fill: '#ffffff' });

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            this.scene.start("gameScene");
            }, this );

    }

}
