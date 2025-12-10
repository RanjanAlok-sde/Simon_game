var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;


$(document).on("click", "#start", function () {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence(){
    userClickedPattern = [];

    level++;
    if(level > 20){
        $("h1").html(`Hurray!, You won the game. Press <button id="start"><b>Restart</b></button> to restart`);
        startOver();
    }
    else{
    $("#level-title").text("Level "+level);
    var randonNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randonNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    }
}

$(".btn").on("click",function(){
    if(level > 0){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        // console.log(userClickedPattern);
        playSound(userChosenColour);
        animatePress(userChosenColour);

        checkAnswer(userClickedPattern.length-1);
    }
});


function playSound(name){
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

// var originalStartContent = $("#id").html();
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        // console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function (){
                nextSequence();
            },1000);
        }
    }
    else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        
        $("h1").html(`Game Over, press <button id="start"><b>Restart</b></button>  to play again`);

        startOver();
    }
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}