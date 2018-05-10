window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    // interval();
    startGame();
  };

  function startGame() {
    // console.log("starting the game")
    createGameBoard();
    drawCar();
  }

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");


  
};
