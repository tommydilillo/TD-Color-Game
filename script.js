window.onload = function() {
  //global variables
  var currentGame;
  var currentPlayer;

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  // game constructor function
  var Game = function() {
    console.log("this: " + this);
    this.player = {};
    this.obstacles = [];
  };

  // Player constructor functiom
  var Player = function() {
    this.x = 100;
    this.y = 100;
    this.r = 20;
    this.startAngle = 0;
    this.endAngle = 2 * Math.PI;
    //   clockwise: anti - clockwise;
    this.boolean = true;
  };
  //Draws Player on the board
  Player.prototype.drawPlayer = function() {
    console.log("hey: ", this);
    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      this.r,
      this.startAngle,
      this.endAngle,
      // this.clockwise,
      this.boolean
    );
    ctx.fillStyle = "green";
    ctx.fill();
  };

  //Defining the player move options
  Player.prototype.move = function(clickedKey) {
    // console.log(this.x);
    ctx.clearRect(0 - this.r, 0 - this.r, this.r * 2, this.r * 2); // NEED TO ACCESS this.x, etc.
    switch (clickedKey) {
      //ISSUE NOT WORKING FOR DIAGONALLS ----------
      case 37 && 38:
        console.log("left & up");
        this.x -= 10;
        this.y -= 10;
        break;
      case 37:
        console.log("left");
        this.x -= 10;
        break;
      case 39 && 38:
        console.log("right & up");
        this.x += 10;
        this.y -= 10;
        break;
      case 37 && 40:
        console.log("left & down");
        this.x -= 10;
        this.y += 10;
        break;
      case 39 && 40:
        console.log("left & down");
        this.x += 10;
        this.y += 10;
        break;

      case 38:
        console.log("up");
        this.y -= 10;
        break;
      case 39:
        console.log("right");
        this.x += 10;
        break;
      case 40:
        console.log("down");
        this.y += 10;
        break;

      default:
        console.log("You're pressing the wrong button");
    }
    this.drawPlayer();
  };
  // Obstacle constructor function
  var Obstacle = function(x, y, r, startAngle, endAngle, boolean) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.startAngle = 0;
    this.endAngle = 2 * Math.PI;
    //   clockwise: anti - clockwise,
    this.boolean = true;
  };

  //create Obstacles function
  Obstacle.prototype.createObstacle = function() {
    // console.log("hey: ", this);
    ctx.beginPath();
    ctx.arc(
      (this.x = Math.floor(Math.random() * 500)),
      (this.y = Math.floor(Math.random() * 500)),
      (this.r = 3 + Math.floor(Math.random() * 100)),
      this.startAngle,
      this.endAngle,
      // this.clockwise,
      this.boolean
    );
  };

  Obstacle.prototype.drawObstacles = function() {
    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      this.r,
      this.startAngle,
      this.endAngle,
      // this.clockwise,
      this.boolean
    );
    ctx.fillStyle = "red";
    ctx.fill();
  };

  function startGame() {
    console.log("start-game works");
    currentGame = new Game();
    currentPlayer = new Player();
    currentGame.player = currentPlayer;
    currentGame.player.drawPlayer();

    //creating new Obstackes
    // currentGame.obstacles.push(
    //   new Obstacle((x, y, r, startAngle, endAngle, boolean))
    // );

    // currentGame.update();
  }
  //CALL START GAME
  startGame();

  document.onkeydown = function(e) {
    var clickedKey = e.keyCode;
    console.log(clickedKey);
    currentGame.player.move(clickedKey);
  };

  //   Game.prototype.update = function() {
  //     ctx.clearRect(0, 0, 500, 500);
  //     currentGame.player.drawPlayer();
  //     create;
  //   };
};
