// User-Interface File for Game Prototype - Temporary
/*
 *  This game is a work-in-progress project. Few things to remember, I will test for UI Gameplay controls on week 20, and will implement collectables as well as an updated tile map
 *  ensuring it's playable, fun and responsive to play for mobile.
 *  Started this project on 04/03/2019 at 11:50
 */

//Class UIScene for I/O mobile
class UIScene extends Phaser.Scene {
    constructor() {
        super('uiscene');
    }
    preload() {
        this.load.image("left", "assets/controls/left1.png");
        this.load.image("right", "assets/controls/right2.png");
        this.load.image("jump", "assets/controls/jump3.png");
    }
    create() {

        this.input.addPointer(1);
        this.input.setTopOnly(true);
        // JUMP BUTTON FEATURE FOR MOBILE - Completed on 05/03/2018
        jump = this.add.sprite(850, 650, "jump").setInteractive();
        jump.setAlpha(0.2);
        jump.setDisplaySize(160, 160);
        jump.on('pointerdown', function (event) { jumpOver = true; });
        //jump.on('pointerover', function (event) { jumpOver = true; });
        jump.on('pointerup', function (event) { jumpOver = false; });
        //jump.on('pointerout', function (event) { jumpOver = false; });

        //LEFT BUTTON FOR MOBILE
        buttonLeft = this.add.sprite(105, 650, "left").setInteractive();
        buttonLeft.setAlpha(0.2);
        buttonLeft.setDisplaySize(160, 160);
        buttonLeft.on('pointerdown', function (pointer) {
            isLeft = true;
            console.log(pointer);
            this.input.once('pointerup', function (pointer) {
                //if () {
                isLeft = false;
                //}
            })
        }, this);


        //RIGHT BUTTON FOR MOBILE
        buttonRight = this.add.sprite(355, 650, "right").setInteractive();
        buttonRight.setAlpha(0.2);
        buttonRight.setDisplaySize(160, 160);

        buttonRight.on('pointerdown', function (pointer) {
            isRight = true;

            this.input.once('pointerup', function (pointer) {
                //if () {
                    isRight = false;
                //}
            })
        }, this);
        //buttonRight.on('pointerover', function (pointer) { isRight = true; });
        //buttonRight.on('pointerup', function (pointer) { isRight = false; });
        //buttonRight.on('pointerout', function (pointer) { isRight = false; });



    }

    update() {
        //JUMP LOGIC
 
            if (jumpOver && player.jumpCount < player.maxJump) {
                console.log(jumpOver);
                player.jumpCount++;
                jump.setTint(0xff0000);
                player.body.setVelocityY(-400);
            } else if (jumpOver && player.jumpCount > player.maxJump) {
                player.jumpCount = 0;
                jump.clearTint();
            }

            if (player.body.blocked.down) {
                player.jumpCount = 0;
                jump.clearTint();
            }


            //UPDATED VERSION OF THE LEFT/RIGHT/JUMP MECHANIC.

            if (isLeft) {
                buttonLeft.setTint(0xff0000);
                player.body.setVelocityX(-250);
                player.anims.play("walk", true);
                player.flipX = true;
                console.log(isLeft);
            } else if (isRight) {
                buttonRight.setTint(0xff0000);
                player.body.setVelocityX(250);
                player.anims.play("walk", true);
                player.flipX = false;
                console.log(isRight);
            } else {
                isLeft = false;
                isRight = false;
                //console.log(isLeft);
                //console.log(isRight);
                buttonLeft.clearTint();
                buttonRight.clearTint();
                player.body.setVelocityX(0);
                player.anims.play("idle", true);
            }
        }

        //CONTROL SCHEME TURNED OUT TO BE REALLY CLUNKY AND STIFF, SO I ADJUSTED THE IF STATEMENT ON
        /*
         * HOW THE PLAYER MOVES
         * THE RESPONSE FEEDBACK ON BUTTONS FOR USER
         */
        /*if (isLeft) {
            buttonLeft.setTint(0xff0000);
            player.body.setVelocityX(-150);
        } else if (!isLeft) {
            player.body.setVelocityX(0);
            buttonLeft.clearTint();
        }
          if (isRight) {
            buttonRight.setTint(0xff0000);
            player.body.setVelocityX(150);
        } else if (!isRight) {
            player.body.setVelocityX(0);
            buttonRight.clearTint();
        }*/
    }
