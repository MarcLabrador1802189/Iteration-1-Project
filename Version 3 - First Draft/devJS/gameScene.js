// Game File for Game Prototype - Temporary
/*
 *  This game is a work-in-progress project. Few things to remember, I will test for UI Gameplay controls on week 20, and will implement collectables as well as an updated tile map
 *  ensuring it's playable, fun and responsive to play for mobile.
 *  Started this project on 04/03/2019 at 11:50
 */

class GameScene extends Phaser.Scene {

    preload() {
        //main asset upload
        this.load.image("platforms1", "assets/platforms/platform-100.png");
        this.load.image("platforms2", "assets/platforms/platform-1600.png");
        this.load.image("background", "assets/platforms/testBG.png");
        this.load.spritesheet("player", "assets/platforms/player.png", { frameWidth: 32, frameHeight: 32 });
    }

    create() {

        // ASPECT RATIO CHECK FOR MOBILE DEVICES (PC - TESTING ONLY)
        window.addEventListener("resize", reSize, false);
        //Create everything else here
        var background = this.add.image(400, 300, "background");
        background.setDisplaySize(mapwidth, mapHeight);
        console.log(this);
        platforms = this.physics.add.staticGroup();
        platforms.create(100, 530, "platforms1");
        platforms.create(250, 430, "platforms1");

        player = this.physics.add.sprite(100, 400, "player", 1);
        player.setScale(1.5, 1.5);
        player.maxJump = 1;
        player.jumpCount = 0;
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, platforms);

        this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers("player", { start: 1, end: 5 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("player", { frames: [1, 1] }),
            frameRate: 3,
            repeat: -1
        });

        this.scene.launch('uiscene');
        this.cameras.main.setBounds(0, 0, mapwidth, mapHeight);
        this.physics.world.setBounds(0, 0, mapwidth, mapHeight);
        this.cameras.main.startFollow(player, true, 0.05);
        this.cameras.main.setZoom(1.5);
    }

    update() {
        //test update for controls

    }
}