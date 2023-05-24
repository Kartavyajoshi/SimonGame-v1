var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// $(document).keypress(function () {
//   if (started != true) {
//     $("#level-title").text("level :" + level);
//     nextData();
//     level++;
//     started = true;
//   }
// });

function nextData() {
  level++;
  userClickedPattern = [];
  $("#level-title").text("level : " + level);
  var r = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[r];
  gamePattern.push(randomColor);
  $("#" + randomColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomColor);
}

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function animatePress(randomColor) {
  $("#" + randomColor).addClass("pressed");
  setTimeout(function () {
    $("#" + randomColor).removeClass("pressed");
  }, 100);
}

function playSound(randomColor) {
  var audio = new Audio(randomColor + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  $("button").css("display","inline-block");
}
if(!started){
$("button").click(function() {
  $("button").css("display","none");
  started=true;
  nextData();
})
}

function checkAnswer(level) {
  if (gamePattern[level] === userClickedPattern[level]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextData();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over !");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 500);
    startOver();
  }
}

 