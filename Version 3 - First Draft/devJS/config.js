// Main File for Game Prototype - Temporary
/*
 *  TThis game is a work-in-progress project. Few things to remember, I will test for UI Gameplay controls on week 20, and will implement collectables as well as an updated tile map
 *  ensuring it's playable, fun and responsive to play for mobile.
 *  Started this project on 04/03/2019 at 11:50
 */
//configuration via PHASER 3
var config = {
    type: Phaser.AUTO,
    width: 68 * 12,
    height: 68 * 8,
    pixelArt: false,
    backgroundColor: '#000000',
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 500 },
            debug: true
        }
    },
    scene: [GameScene, UIScene],
    callbacks: {
        postBoot: function () {
            reSize();
        }
    },
  
    parent: "phaser-example"


};

var game = new Phaser.Game(config);
//ASSIGN Global Variables
var platforms, player, jump, buttonRight, buttonLeft;
var mapwidth = 68 * 12;
var mapHeight = 68 * 8;
var jumpOver = false;
var isRight = false;
var isLeft = false;

function reSize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;

    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    } else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
