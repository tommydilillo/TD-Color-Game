window.onload = function() {
  //global variables
  var currentGame;
  var currentPlayer;

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  //setting the standard color
  var color = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
  var randomColor = color[Math.floor(Math.random() * color.length)];
  var obstacleColor = randomColor;
  var playerColor = color[3];
  //   var obstacleColor = randomColor.splice(playerColor);
  console.log(playerColor);

  // game constructor function
  var Game = function() {
    console.log("this: " + this);
    this.player = {}; // player => Object
    this.obstacle = {}; // alan doesn't think needs to be under game.
    this.obstacles = [];
    this.numberOfObstacles = this.obstacles.length;
    for (
      var numberOfObstacles = 0;
      numberOfObstacles < 10;
      numberOfObstacles++
    ) {
      currentObstacle = new Obstacle();
      this.obstacles.push(currentObstacle);
      currentObstacle.drawObstacle();
    }
  };

  Game.prototype.drawGame = function() {
    this.player.drawPlayer();
  };

  Game.prototype.startGame = function() {
    return null;
  };

  // Player constructor functiom
  var Player = function() {
    this.x = 350;
    this.y = 250;
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
    ctx.fillStyle = playerColor;
    ctx.fill();
    ctx.font = "8px Arial";
    ctx.fillText("p1", this.x, this.y);
  };

  //Defining the player move options

  Player.prototype.movePlayer = function(clickedKey) {
    // console.log(this.x);
    ctx.clearRect(0, 0, 750, 500); // NEED TO ACCESS this.x, etc.
    switch (clickedKey) {
      case 37:
        console.log("left");
        this.x -= 10;
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
  var Obstacle = function() {
    this.x = Math.floor(Math.random() * 750);
    this.y = Math.floor(Math.random() * 500);
    this.r = 3 + Math.floor(Math.random() * 100);
    //   this.startAngle = 0);
    //   this.endAngle = 2 * Math.PI;
    //   clockwise: anti - clockwise,
    //   this.boolean = true;
  };

  //create Obstacles function
  Obstacle.prototype.drawObstacle = function() {
    let color = [
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "indigo",
      "violet"
    ];
    let randomColor = color[Math.floor(Math.random() * color.length)];
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
    ctx.fillStyle = randomColor;
    ctx.fill();
  };

  //defining obstacle border
  Obstacle.prototype.left = function() {
    return this.x - r;
  };

  Obstacle.prototype.right = function() {
    return this.x + r;
  };

  Obstacle.prototype.top = function() {
    return this.y - r;
  };

  Obstacle.prototype.top = function() {
    return this.y + r;
  };

  //check collission between currentPlayer and obstacle.
  Obstacle.prototype.checkCollision = function(obstacle) {
    return !(
      currentPlayer.x + 20 < obstacle.left() ||
      currentPlayer.x - 20 > obstacle.right() ||
      currentPlayer.y + 20 > obstacle.bottom() ||
      currentPlayer.y - 20 < obstacle.top()
    );
  };

  function startGame() {
    console.log("start-game works");
    currentGame = new Game();
    currentPlayer = new Player();
    currentGame.player = currentPlayer;
    currentGame.player.drawPlayer();

    // CREATES A RANDOM OBSTACLE IF I WRITE LIKE THIS
    // currentObstacle = new Obstacle();
    // currentGame.obstacles.push(currentObstacle);
    // //currentGame.obstacles = currentObstacle;
    // currentObstacle.drawObstacle();

    console.log("OBSTACLES ", currentGame.obstacles);
  }
  //CALL START GAME
  startGame();

  document.onkeydown = function(e) {
    var clickedKey = e.keyCode;
    console.log(clickedKey);
    currentGame.player.movePlayer(clickedKey);
  };

  Game.prototype.update = function() {
    ctx.clearRect(0, 0, 500, 500);
    currentGame.player.drawPlayer();
    currentObstacle.drawObstacle();
  };
};
