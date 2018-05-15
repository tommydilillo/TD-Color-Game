window.onload = function() {
  // make score not visible before the game starts
  document.getElementById("scoreDiv").style.display = "none";

  document.getElementById("start-button").onclick = function() {
    playerColor = document.getElementById("player-color").value;
    startGame();
    interval();
  };

  //global variables
  var currentGame;
  var currentPlayer;
  var score = 0;

  function interval() {
    setInterval(currentGame.updateCanvas, 50);
  }

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  //defining colors
  var color = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
  var randomColor = color[Math.floor(Math.random() * color.length)];
  var playerColor = "green";
  var obstacleColor = color.splice(playerColor);
  console.log(
    "player color: ",
    playerColor,
    "obstacle color array:",
    obstacleColor
  );

  // game constructor function
  function Game() {
    this.player = {}; // player => Object
    this.obstacles = [];
    this.numberOfObstacles = this.obstacles.length;
    // change the number to increase # of obstacles pushed into array
    for (var i = 0; i < 10; i++) {
      currentObstacle = new Obstacle();
      this.obstacles.push(currentObstacle);
      currentObstacle.drawObstacle();
    }
  }

  Game.prototype.drawGame = function() {
    this.player.drawPlayer();
    this.numberOfObstacles = this.obstacles.length;
    for (var i = 0; i < 10; i++) {
      this.obstacles[i].drawObstacle();
    }
  };

  Game.prototype.startGame = function() {
    return null;
  };

  // PLAYER MOVEMENT
  Game.prototype.movePlayer = function(clickedKey) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (clickedKey) {
      case 37:
        // console.log("left");
        if (this.player.x > 20) {
          this.player.x -= 20;
        }
        break;
      case 38:
        // console.log("up");
        if (this.player.y > 20) {
          this.player.y -= 20;
        }
        break;
      case 39:
        // console.log("right");
        if (this.player.x < canvas.width - 20) {
          this.player.x += 20;
        }
        break;
      case 40:
        // console.log("down");
        if (this.player.y < canvas.height - 20) {
          this.player.y += 20;
        }
        break;

      default:
        console.log("You're pressing the wrong button");
    }
    // this.drawGame();
    currentGame.player.drawPlayer();
    // currentGame.numberOfObstacles = currentGame.obstacles.length;
    for (var i = 0; i < currentGame.obstacles.length; i++) {
      currentGame.obstacles[i].drawObstacle();
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
    // console.log("hey: ", this);
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
    this.x = Math.floor(Math.random() * 500);
    this.y = Math.floor(Math.random() * 500);
    this.r = 10 + Math.floor(Math.random() * 75);
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
    this.xMovement = Math.floor(Math.random() * 10) - 5;
    this.yMovement = Math.floor(Math.random() * 10) - 5;
  };

  //create Obstacles function
  Obstacle.prototype.drawObstacle = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

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

  //check collission between currentPlayer and obstacle.  returns true if any of the
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
    document.getElementById("scoreDiv").style.display = "block";
    currentGame = new Game();
    currentPlayer = new Player();
    currentGame.player = currentPlayer;
    currentGame.player.drawPlayer();

    // console.log("OBSTACLES ", currentGame.obstacles);
  }

  // sets keydown events which are used in movePlayer
  document.onkeydown = function(e) {
    var clickedKey = e.keyCode;
    // console.log(clickedKey);
    currentGame.movePlayer(clickedKey);
  };

  // updates obstacle movements...
  Game.prototype.updateCanvas = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    currentGame.player.drawPlayer();

    //loop for all obstacles
    for (var i = 0; i < currentGame.obstacles.length; i++) {
      //CHECK COLLISSIONS

      // if collision is same color.  +1 point and splice obstacle.
      if (
        currentGame.obstacles[i].checkCollision(currentGame.obstacles[i]) ===
          true &&
        playerColor === currentGame.obstacles[i].color
      ) {
        currentGame.obstacles.splice(i, 1);
        score++;
        document.getElementById("score").innerHTML = score;

        console.log("score:", score);
      }

      //
      if (
        currentGame.obstacles[i].checkCollision(currentGame.obstacles[i]) ===
        true
      ) {
        console.log("collision detected");
        // setTimeout(function() {
        //   alert("wrong color! you lose");
        // }, 5);
      }

      //creates random movement for obstacles
      // vx = Math.floor(Math.random() * 10) - 5;
      // vy = Math.floor(Math.random() * 10) - 5;

      currentGame.obstacles[i].x += currentGame.obstacles[i].xMovement;
      currentGame.obstacles[i].y += currentGame.obstacles[i].yMovement;
      if (
        currentGame.obstacles[i].y + currentGame.obstacles[i].yMovement >
          canvas.height ||
        currentGame.obstacles[i].y + currentGame.obstacles[i].yMovement < 0
      ) {
        currentGame.obstacles[i].yMovement *= -1;
      }
      //creates boundaries for obstacles
      if (
        currentGame.obstacles[i].x + currentGame.obstacles[i].xMovement >
          canvas.width ||
        currentGame.obstacles[i].x + currentGame.obstacles[i].xMovement < 0
      ) {
        currentGame.obstacles[i].xMovement *= -1;
      }

      currentGame.obstacles[i].drawObstacle();
    }
  };
};
