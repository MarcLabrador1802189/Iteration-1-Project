// Game File for Game Prototype - Temporary
/*
 *  This game is a work-in-progress project. Few things to remember, I will test for UI Gameplay controls starting from week 20, and will implement collectables as well as an updated tile map
 *  ensuring it's playable, fun and responsive to play for mobile.
 *  Started this project on 04/03/2019 at 11:50
 *  Updated on 12/03/2019 at 09:30 - until 15/03/2019
 */

class GameScene extends Phaser.Scene {

    preload() {
        //main asset upload
        this.load.image("platforms1", "assets/platforms/platform-100.png");
        this.load.image("platforms2", "assets/platforms/platform-1600.png");
        this.load.image("background", "assets/tileset/scifi_platform_BG1.jpg");
        this.load.image("door", "assets/platforms/door.png");
        this.load.image("sci-fi", "assets/tileset/scifi_platformTiles_32x32.png");
        this.load.image("button", "assets/controls/buttons.png");
        this.load.spritesheet("jewel", "assets/item/jewel-sheet.png", { frameWidth: 16, frameHeight: 16 });
        this.load.tilemapTiledJSON("tileset", "assets/tileset/level1.json");
        this.load.spritesheet("player", "assets/platforms/player.png", { frameWidth: 32, frameHeight: 32 });
    }

    create() {

        // ASPECT RATIO CHECK FOR MOBILE DEVICES (PC - TESTING ONLY)
        window.addEventListener("resize", reSize, false);
        
        // -- OLD CODE FOR DOOR BEFORE TRIGGER -- 14/03/2019
        /*this.door = this.physics.add.staticGroup();
        this.automated = this.door.create(1056, 383.5, "door");
        this.automated.setDisplaySize(75, 190).refreshBody();
        this.automated.setDepth(5);
        */
        //this.door.setDisplaySize(75, 190).refreshBody();

        //Code for platforms, doors and backgrounds - Essentially applying in tilemap into game.
        var background = this.add.image(400, 350, "background").setScrollFactor(0.5, 1);
        background.setScale(1.5, 1.5);
        this.map = this.make.tilemap({ key: "tileset" });
        var landscape = this.map.addTilesetImage("scifi_platformTiles_32x32", "sci-fi");
        this.map.createStaticLayer("foLayer", landscape, 0, 0);

        //To apply static collision for player and tile map
        // this.map.createStaticLayer("collisionLayer", landscape, 0, 0);
        collisionLayer = this.map.createStaticLayer("collisionLayer", landscape, 0, 0);
        collisionLayer.setCollisionBetween(0, 1000);
        player =  this.map.findObject("objectLayer", function (object) {
            if (object.type === "player") {
               
                return object;
            }
        });
        
        this.jewel = this.physics.add.staticGroup();
        
        this.map.findObject("objectLayer", function (object) {
            if (object.type === "jewel") {
                this.jewel.create(object.x + this.map.tileWidth / 2, object.y + this.map.tileHeight / 2, "jewel");
            }
        }, this);

        //Collectable Feature
        
        
        //INTERACT WITH BUTTONS TO OPEN DOORS AND ELEVATORS
        var button1 = this.add.image(990, 406, "button");
        button1.setDisplaySize(32, 32).setInteractive();
        button1.once("pointerdown", function (event) { buttonDoor = true; });
        button1.on("pointerup", function (event) { buttonDoor = false; });

        //JEWEL ANIMATIONS
        this.anims.create({
            key: "jewelAnims",
            frames: this.anims.generateFrameNumbers("jewel", { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1,
        });

        //PLAYER ANIMATIONS
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

        //DOOR
        this.door = this.physics.add.sprite(1056, 383.5, "door");
        
        this.door.setDisplaySize(75, 190);
        //this.door.setSize(75, 190); - DETERMINING THE HITBOX OF THE DOOR
        this.door.body.setAllowGravity(false)
        this.door.body.immovable = true;

       // this.elevator = this.physics.add.sprite();

        this.scene.launch('uiscene');
        this.cameras.main.setBounds(0, 0, this.map.width * this.map.tileWidth, this.map.height * this.map.tileHeight);
        this.physics.world.setBounds(0, 0, this.map.tileWidth, this.map.tileHeight);
        this.cameras.main.startFollow(player, true, 0.25);
        createPlayer.call(this, player);
        setCamera.call(this, player);
        createCollision.call(this, player);
        this.physics.add.collider(player, this.door);




    }

    update() {
        //test update for controls
        
        if (buttonDoor) {
            console.log("Open");
            
            this.tweens.add({
                targets: this.door,
                y: this.door.y - 250,
                duration: 2500,
            });
            
        }

        jewelAnims.call(this);
    }
}
//In order for player to spawn
function createPlayer(playerSpawn) {
    player = this.physics.add.sprite(playerSpawn.x, playerSpawn.y, "player", 4);
    player.setScale(1.5, 1.5);
    player.maxJump = 1;
    player.jumpCount = 0;
    player.setDepth(1);
    this.physics.add.collider(player, platforms);
}

//Camera function to track player and set viewport
function setCamera() {
    this.cameras.main.startFollow(player, true, 0.25);
    this.cameras.main.setZoom(1.2);

}
// Collision between player and other events
function createCollision() {
    player.setBounce(0.3);
    this.physics.add.collider(player, collisionLayer);
    this.physics.add.overlap(player, this.jewel, pickUpJewel);
    
}
function jewelAnims() {
    this.jewel.playAnimation("jewelAnims", true);
}

function pickUpJewel(player, jewel) {
    jewel.disableBody(true, true);
}