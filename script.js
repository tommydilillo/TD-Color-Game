window.onload = function() {
  //global variables
  var currentGame;
  var currentPlayer;

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  //defining colors
  var color = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
  var randomColor = color[Math.floor(Math.random() * color.length)];
  var playerColor = color[3];
  var obstacleColor = color.splice(playerColor);
  console.log(
    "player color: ",
    playerColor,
    "obstacle color array:",
    obstacleColor
  );

  // game constructor function
  var Game = function() {
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
    this.numberOfObstacles = this.obstacles.length;
    for (
      var numberOfObstacles = 0;
      numberOfObstacles < 10;
      numberOfObstacles++
    ) {
      this.obstacles[numberOfObstacles].drawObstacle();
    }
  };

  Game.prototype.startGame = function() {
    return null;
  };

  // PLAYER MOVEMENT
  Game.prototype.movePlayer = function(clickedKey) {
    ctx.clearRect(0, 0, 750, 500);
    switch (clickedKey) {
      case 37:
        console.log("left");
        this.player.x -= 10;
        break;
      case 38:
        console.log("up");
        this.player.y -= 10;
        break;
      case 39:
        console.log("right");
        this.player.x += 10;
        break;
      case 40:
        console.log("down");
        this.player.y += 10;
        break;

      default:
        console.log("You're pressing the wrong button");
    }
    //checking collision on playermovement
    this.drawGame();
    for (var i = 0; i < this.obstacles.length; i++) {
      if (this.obstacles[i].checkCollision(this.obstacles[i]) === true) {
        console.log("collission detected");
        // setTimeout(function() {
        //   alert("Crashed");
        // }, 30);
      }
    }
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

  var Obstacle = function() {
    this.x = Math.floor(Math.random() * 750);
    this.y = Math.floor(Math.random() * 500);
    this.r = 3 + Math.floor(Math.random() * 100);
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
    this.color = randomColor;
    // ADD this.direction = randomdDirection
  };

  //create Obstacles function
  Obstacle.prototype.drawObstacle = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  // OBSTACLE MOVEMENT

  window.onload = function() {
    //WILL LIKELY NEED TO MOVE THIS TO THE TOP
    function interval() {
      setInterval(updateCanvas, 50);
    }
  };
  Game.prototype.updateCanvas = function() {
    ctx.clearRect(0, 0, 750, 500);
    this.drawGame();
    this.updateObstacle();
  };

  Game.prototype.updateObstacle = function() {
    for (var numberOfObstacles = 0; numberOfObstacles < 10; numberOfObstacles++)
      this.obstacles[numberOfObstacles].y += 3;
  };

  // Game.prototype.moveObstacle = function() {
  //   this.obstacle.x += 5;
  //   this.obstacle.y += 5;
  //   //OR SHOULD I CREATE OBSTACLE DIRECTION VARIABLE AND ADD IT TO THE OBSTACLE
  //   var direction = [
  //     north,
  //     east,
  //     south,
  //     west,
  //     northEast,
  //     northWest,
  //     southEast,
  //     southWest
  //   ];
  //   randomDirection = direction[Math.floor(Math.random() * direction.length)];
  //   this.north = this.obstacle.y -= 2;
  //   this.south = this.obstacle.y += 2;
  //   this.east = this.obstacle.x += 2;
  //   this.west = this.obstacle.x -= 2;
  //   this.northEast = this.obstacle.x += 2;
  //   this.obstacle.y -= 2;
  //   this.southEast = this.obstacle.x += 2;
  //   this.obstacle.y += 2;
  //   this.northwest = this.obstacle.x -= 2;
  //   this.obstacle.y -= 2;
  //   this.southWest = this.obstacle.x -= 2;
  //   this.obstacle.y += 2;
  //ADD direction variable to obstacle
  // };

  //defining obstacle border
  Obstacle.prototype.left = function() {
    return this.x - this.r;
  };

  Obstacle.prototype.right = function() {
    return this.x + this.r;
  };

  Obstacle.prototype.top = function() {
    return this.y - this.r;
  };

  Obstacle.prototype.bottom = function() {
    return this.y + this.r;
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

    console.log("OBSTACLES ", currentGame.obstacles);
  }
  //CALL START GAME
  startGame();

  document.onkeydown = function(e) {
    var clickedKey = e.keyCode;
    console.log(clickedKey);
    currentGame.movePlayer(clickedKey);
  };

  Game.prototype.update = function() {
    ctx.clearRect(0, 0, 500, 500);
    currentGame.player.drawPlayer();
    currentObstacle.drawObstacle();
  };
};
