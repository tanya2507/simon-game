var gamePattern = [];
var buttonColors = ["red","blue","green","yellow"];
var userClickedPattern = [];

var started = false; //keep tracking if game started or not
var level = 0;

$(document).keypress(function(){ //keypress will start the game
    if(!started){
        $("#level-title").text("Level "+level);    
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id"); //stores the id of the clicked button
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1); //passing index of last input of user pattern
});


function checkAnswer(currentLevel){
    //to check most recent answer is same as game pattern
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        //if right then next level continue
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        var audio = new Audio('./sounds/wrong.mp3'); //audio that answer is wrong
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over"); //removing class after a delay
        },200);
        $("#level-title").text("Game Over,Press Any Key to Restart");
        startOver();
    }
}

function nextSequence(){
    //empty the array  before new user response
    userClickedPattern = [];
    level++;//everytime nextSequence is called level++
    $("#level-title").text("Level "+level);    //updating h1 with new values of level
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

$("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //animation of next box to be remembered
playSound(randomChosenColor);

}


function playSound(name){
    var audio = new Audio('./sounds/'+ name+'.mp3'); //audio
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
    $("#"+currentColor).removeClass("pressed"); //removing class after a delay
},100);
}

function startOver(){
    level = 0;
    gamePattern= [];
    started = false;
}