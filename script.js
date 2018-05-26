window.onload = function() {
  // make score not visible before the game starts
  document.getElementById("scoreDiv").style.display = "none";
  document.getElementById("loser").style.display = "none";
  document.getElementById("level-complete").style.display = "none";

  document.getElementById("start-button").onclick = function() {
    playerColor = document.getElementById("player-color").value;
    matchingColor = document.getElementById("matching-color").value;
    numberOfObstacles = document.getElementById("number-of-obstacles").value;

    startGame();
    interval();
git   };

  //global variables
  var currentGame;
  var currentPlayer;
  var score = 0;
  var backgroundMusic = document.getElementById("background-music");
  var loseMusic = document.getElementById("lose-music");
  var levelCompleteMusic = document.getElementById("level-complete-music");
  var matchColorAudio = document.getElementById("match-color-audio");

  function interval() {
    setInterval(currentGame.updateCanvas, 50);
  }

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  // game constructor function
  function Game() {
    this.player = {}; // player => Object
    this.obstacles = [];
    // this.numberOfObstacles = this.obstacles.length;
    this.virtualCanvas = {
      width: 4000,
      height: 4000,
      canvasX: 4000 / 2 - canvas.width / 2,
      canvasY: 4000 / 2 - canvas.height / 2,
      virtualPlayerX: 2000,
      virtualPlayerY: 2000
    };
    // change the number to increase # of obstacles pushed into array
    for (var i = 0; i < matchingColor; i++) {
      currentObstacle = new Obstacle(this, playerColor);
      console.log(currentObstacle.color);
      this.obstacles.push(currentObstacle);
      // limiting the number of obstacles with the player color to 10.
    }
    for (var i = 0; i < numberOfObstacles; i++) {
      currentObstacle = new Obstacle(this);
      console.log(currentObstacle.color);
      this.obstacles.push(currentObstacle);
      // limiting the number of obstacles with the player color to 10.
    }
  }

  Game.prototype.drawGame = function() {
    this.player.drawPlayer();
  };

  Game.prototype.startGame = function() {
    return null;
  };

  // function sound(src) {
  //   this.sound = document.createElement("audio");
  //   this.sound.src = src;

  //   this.sound.setAttribute("preload", "auto");
  //   this.sound.setAttribute("controls", "none");
  //   this.sound.style.display = "none";
  //   document.body.appendChild(this.sound);
  //   this.play = function() {
  //     this.sound.play();
  //   };
  //   this.stop = function() {
  //     this.sound.pause();
  //   };
  // }

  // PLAYER MOVEMENT
  Game.prototype.movePlayer = function(clickedKey) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // HERE
    var xInnerBoundary =
      this.virtualCanvas.virtualPlayerX <= canvas.width / 2 ||
      this.virtualCanvas.virtualPlayerX >=
        this.virtualCanvas.width - canvas.width / 2;

    var yInnerBoundary =
      this.virtualCanvas.virtualPlayerY <= canvas.height / 2 ||
      this.virtualCanvas.virtualPlayerY >=
        this.virtualCanvas.height - canvas.height / 2;

    switch (clickedKey) {
      case 37: // console.log("left");
        console.log("xInnerBoundary: ", xInnerBoundary);
        console.log("this.virtualCanvas.canvasX: ", this.virtualCanvas.canvasX);
        console.log("this.player.x: ", this.player.x);
        console.log(
          "this.virtualCanvas.virtualPlayerX: ",
          this.virtualCanvas.virtualPlayerX
        );

        if (
          xInnerBoundary &&
          this.virtualCanvas.virtualPlayerX > this.player.r
        ) {
          this.player.x -= 20;
          this.virtualCanvas.virtualPlayerX -= 20;
        } else if (this.virtualCanvas.virtualPlayerX > this.player.r) {
          this.virtualCanvas.canvasX -= 20;
          this.virtualCanvas.virtualPlayerX -= 20;
        }
        break;
      case 38: // console.log("up");
        console.log("yInnerBoundary: ", yInnerBoundary);
        console.log("this.virtualCanvas.canvasY: ", this.virtualCanvas.canvasY);
        console.log("this.player.y: ", this.player.y);
        console.log(
          "this.virtualCanvas.virtualPlayerY: ",
          this.virtualCanvas.virtualPlayerY
        );

        if (
          yInnerBoundary === true &&
          this.virtualCanvas.virtualPlayerY > this.player.r
        ) {
          this.player.y -= 20;
          this.virtualCanvas.virtualPlayerY -= 20;
        } else if (this.virtualCanvas.virtualPlayerY > this.player.r) {
          this.virtualCanvas.canvasY -= 20;
          this.virtualCanvas.virtualPlayerY -= 20;
        }

        break;
      case 39: // console.log("right");
        console.log("xInnerBoundary: ", xInnerBoundary);
        console.log("this.virtualCanvas.canvasX: ", this.virtualCanvas.canvasX);
        console.log("this.player.x: ", this.player.x);
        console.log(
          "this.virtualCanvas.virtualPlayerX: ",
          this.virtualCanvas.virtualPlayerX
        );
        if (
          xInnerBoundary === true &&
          this.virtualCanvas.virtualPlayerX <
            this.virtualCanvas.width - this.player.r
        ) {
          this.player.x += 20;
          this.virtualCanvas.virtualPlayerX += 20;
        } else if (
          this.virtualCanvas.virtualPlayerX <
          this.virtualCanvas.width - this.player.r
        ) {
          this.virtualCanvas.canvasX += 20;
          this.virtualCanvas.virtualPlayerX += 20;
        }

        break;
      case 40: // console.log("down");
        console.log("yInnerBoundary: ", yInnerBoundary);
        console.log("this.virtualCanvas.canvasY: ", this.virtualCanvas.canvasY);
        console.log("this.player.y: ", this.player.y);
        console.log(
          "this.virtualCanvas.virtualPlayerY: ",
          this.virtualCanvas.virtualPlayerY
        );
        if (
          yInnerBoundary &&
          this.virtualCanvas.virtualPlayerY <
            this.virtualCanvas.height - this.player.r
        ) {
          this.player.y += 20;
          this.virtualCanvas.virtualPlayerY += 20;
        } else if (
          this.virtualCanvas.virtualPlayerY <
          this.virtualCanvas.height - this.player.r
        ) {
          this.virtualCanvas.canvasY += 20;
          this.virtualCanvas.virtualPlayerY += 20;
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
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.font = "8px Arial";
    ctx.fillText("p1", this.x, this.y); //not working
  };

  var Obstacle = function(game, color) {
    //canvasWidth and canvasHeight  take virtualCanvas.width and virtualCanvas.height
    let randomX = Math.floor(Math.random() * game.virtualCanvas.width),
      randomY = Math.floor(Math.random() * game.virtualCanvas.height);
    console.log("WIDTH ", game.virtualCanvas.width);
    console.log("HEIGHT ", game.virtualCanvas.height);
    while (
      (randomX < game.virtualCanvas.width / 2 + 200 &&
        randomX > game.virtualCanvas.width / 2 - 200) ||
      randomX < 100 ||
      randomX > game.virtualCanvas.width - 100
    ) {
      randomX = Math.floor(Math.random() * game.virtualCanvas.width);
    }

    while (
      (randomY < game.virtualCanvas.height / 2 + 200 &&
        randomY > game.virtualCanvas.height / 2 - 200) ||
      randomY < 100 ||
      randomY > game.virtualCanvas.width - 100
    ) {
      randomY = Math.floor(Math.random() * game.virtualCanvas.height);
    }

    this.x = randomX;
    this.y = randomY;
    this.r = 30 + Math.floor(Math.random() * 50);
    let colors = [
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "indigo",
      "violet"
    ];
    // if color is not defined as a parameter (occurs when creating random
    //colors), splice out the PlayerColor (they are created seperately).
    if (!color) colors.splice(color, 1);
    const randomColor = color
      ? color
      : colors[Math.floor(Math.random() * colors.length)];
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

  //check collission between currentPlayer and obstacle.
  //Returns true if any of the obstacle hits player
  Obstacle.prototype.checkCollision = function() {
    return !(
      currentGame.virtualCanvas.virtualPlayerX + 20 < this.left() ||
      currentGame.virtualCanvas.virtualPlayerX - 20 > this.right() ||
      currentGame.virtualCanvas.virtualPlayerY + 20 > this.bottom() ||
      currentGame.virtualCanvas.virtualPlayerY - 20 < this.top()
    );
  };

  function startGame() {
    console.log("start-game works");
    document.getElementById("scoreDiv").style.display = "block";
    currentGame = new Game();
    currentPlayer = new Player();
    currentGame.player = currentPlayer;
    currentGame.player.drawPlayer();
    // successSound = new sound("/sound/success.wav");

    console.log("OBSTACLES ", currentGame.obstacles);
    console.log("OBSTACLES ", currentGame.obstacles.color === playerColor);
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
    console.log("match: ", matchingColor);

    //loop for all obstacles

    for (var i = 0; i < currentGame.obstacles.length; i++) {
      //CHECK COLLISSIONS

      // if collision is same color.  +1 point and splice obstacle.
      if (
        currentGame.obstacles[i].checkCollision() &&
        playerColor === currentGame.obstacles[i].color
      ) {
        currentGame.obstacles.splice(i, 1);
        score++;
        matchColorAudio.play();
        document.getElementById("score").innerHTML = score;
        // successSound.play();

        console.log("score:", score);
      }

      //
      if (currentGame.obstacles[i].checkCollision() === true) {
        console.log("collision detected");
        document.getElementById("loser").style.display = "block";

        setTimeout(function() {
          document.getElementById("loser").style.display = "block";
          currentGame.obstacles = [];
          backgroundMusic.pause();
          loseMusic.play();
        }, 5);
      }
      if (currentGame.obstacles[i].right > 950)
        console.log(currentGame.obstacles[i].right);

      //creates random movement for obstacles
      currentGame.obstacles[i].x += currentGame.obstacles[i].xMovement;
      //console.log("X ==== ", currentGame.obstacles[i].x);
      currentGame.obstacles[i].y += currentGame.obstacles[i].yMovement;
      //console.log("Y ==== ", currentGame.obstacles[i].y);
      //-------------y/width boundaries for obstacles
      if (
        currentGame.obstacles[i].bottom() > currentGame.virtualCanvas.height ||
        currentGame.obstacles[i].top() < 0
      ) {
        // debugger;
        currentGame.obstacles[i].yMovement *= -1;
      }
      //-------------x/width boundaries for obstacles
      if (
        currentGame.obstacles[i].right() > currentGame.virtualCanvas.width ||
        currentGame.obstacles[i].left() < 0
      ) {
        currentGame.obstacles[i].xMovement *= -1;
      }

      currentGame.obstacles[i].drawObstacle(currentGame.virtualCanvas);

      //level up
      if (score == matchingColor) {
        setTimeout(function() {
          document.getElementById("level-complete").style.display = "block";
          currentGame.obstacles = [];
          backgroundMusic.pause();
          levelCompleteMusic.play();
        }, 5);

        console.log("you beat the level");
      }
    }
  };
};
