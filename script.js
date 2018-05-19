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
    // this.numberOfObstacles = this.obstacles.length;
    this.virtualCanvas = {
      width: 3000,
      height: 3000,
      canvasX: 1500,
      canvasY: 1500
    };
    // change the number to increase # of obstacles pushed into array
    for (var i = 0; i < 100; i++) {
      currentObstacle = new Obstacle(
        this.virtualCanvas.width,
        this.virtualCanvas.height
      );
      this.obstacles.push(currentObstacle);
      // currentObstacle.drawObstacle();
    }
  }

  Game.prototype.drawGame = function() {
    this.player.drawPlayer();
  };

  Game.prototype.startGame = function() {
    return null;
  };

  // PLAYER MOVEMENT
  Game.prototype.movePlayer = function(clickedKey) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var xInnerBoundary =
      this.virtualCanvas.canvasX <= canvas.width / 2 ||
      this.virtualCanvas.canvasX >= this.virtualCanvas.width - canvas.width / 2;

    var yInnerBoundary =
      this.virtualCanvas.canvasY <= canvas.height / 2 ||
      this.virtualCanvas.canvasY >=
        this.virtualCanvas.height - canvas.height / 2;

    switch (clickedKey) {
      case 37: // console.log("left");
        if (this.virtualCanvas.canvasX >= 0) {
          this.virtualCanvas.canvasX -= 20;
          console.log("xInnerBoundary: ", xInnerBoundary);
          console.log(
            "this.virtualCanvas.canvasX: ",
            this.virtualCanvas.canvasX
          );
        }
        if (xInnerBoundary === true && this.virtualCanvas.canvasX >= 0) {
          this.virtualCanvas.canvasX -= 20;
          this.player.x -= 20;
        }
        break;
      case 38: // console.log("up");
        if (this.virtualCanvas.canvasY >= 0) {
          this.virtualCanvas.canvasY -= 20;
          console.log("yInnerBoundary: ", yInnerBoundary);
          console.log(
            "this.virtualCanvas.canvasY: ",
            this.virtualCanvas.canvasY
          );
        }
        if (yInnerBoundary === true && this.virtualCanvas.canvasY >= 0) {
          this.virtualCanvas.canvasY -= 20;
          this.player.y -= 20;
          console.log("this.player.y: ", this.player.y);
        }
        break;
      case 39: // console.log("right");
        if (this.virtualCanvas.canvasX <= this.virtualCanvas.width) {
          this.virtualCanvas.canvasX += 20;
          console.log("xInnerBoundary: ", xInnerBoundary);
          console.log(
            "this.virtualCanvas.canvasX: ",
            this.virtualCanvas.canvasX
          );
        }
        if (
          xInnerBoundary === true &&
          this.virtualCanvas.canvasX <= this.virtualCanvas.width
        ) {
          this.virtualCanvas.canvasX += 20;
          this.player.x += 20;
        }
        break;
      case 40: // console.log("down");
        if (this.virtualCanvas.canvasY <= this.virtualCanvas.height) {
          this.virtualCanvas.canvasY += 20;
          console.log("yInnerBoundary: ", yInnerBoundary);
          console.log(
            "this.virtualCanvas.canvasY: ",
            this.virtualCanvas.canvasY
          );
        }
        if (
          yInnerBoundary === true &&
          this.virtualCanvas.canvasY <= this.virtualCanvas.height
        ) {
          this.virtualCanvas.canvasY += 20;
          this.player.y += 20;
          console.log("this.player.y: ", this.player.y);
        }
        break;

      default:
        console.log("You're pressing the wrong button");
    }
    currentGame.player.drawPlayer();

    for (var i = 0; i < currentGame.obstacles.length; i++) {
      currentGame.obstacles[i].drawObstacle(currentGame.virtualCanvas);
    }
  };

  // Player constructor functiom
  var Player = function() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
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

  var Obstacle = function(canvasWidth, canvasHeight) {
    this.x = Math.floor(Math.random() * canvasWidth);
    this.y = Math.floor(Math.random() * canvasHeight);
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
    //define a random x and y value to add to obstacle when they are created
    this.xMovement = Math.floor(Math.random() * 10) - 5;
    this.yMovement = Math.floor(Math.random() * 10) - 5;
  };

  //create Obstacles function
  Obstacle.prototype.drawObstacle = function(virtualCanvas) {
    // console.log("virtualCanvas ", virtualCanvas);
    ctx.beginPath();
    ctx.arc(
      this.x - virtualCanvas.canvasX,
      this.y - virtualCanvas.canvasY,
      this.r,
      0,
      2 * Math.PI,
      true
    );
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

    var samecolor = [];
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
      currentGame.obstacles[i].x += currentGame.obstacles[i].xMovement;
      currentGame.obstacles[i].y += currentGame.obstacles[i].yMovement;
      if (
        currentGame.obstacles[i].y + currentGame.obstacles[i].yMovement >
          currentGame.virtualCanvas.height ||
        currentGame.obstacles[i].y + currentGame.obstacles[i].yMovement < 0
      ) {
        currentGame.obstacles[i].yMovement *= -1;
      }
      //creates boundaries for obstacles
      if (
        currentGame.obstacles[i].x > currentGame.virtualCanvas.width ||
        currentGame.obstacles[i].x + currentGame.obstacles[i].xMovement < 0
      ) {
        currentGame.obstacles[i].xMovement *= -1;
      }

      currentGame.obstacles[i].drawObstacle(currentGame.virtualCanvas);
    }
  };
};
