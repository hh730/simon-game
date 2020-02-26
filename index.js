var gamepattern=[];
var userclickedpattern=[];
var buttoncolors=["red", "blue", "green", "yellow"];
var started=false;
var level=0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextsequence();
    started=true;
  }
});

$(".btn").click(function(){
  var userchosencolor=$(this).attr("id");
  userclickedpattern.push(userchosencolor);
console.log(userclickedpattern);
playsound(userchosencolor);
animatepress(userchosencolor);
checkans(userclickedpattern.length-1);
});

function checkans(currentlevel){
  if(userclickedpattern[currentlevel]===gamepattern[currentlevel]){
   console.log("success");
    if(userclickedpattern.length===gamepattern.length){
      setTimeout(function(){
        nextsequence();
      },1000);
    }
  }
  else{
    console.log("wrong");
    var aud=new Audio("sounds/wrong.mp3");
    aud.play();
    $("body").addClass("game-over");
    setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  $("h1").text("Game Over, Press Any Key to Restart");
  startover();
  }
}

function nextsequence(){
  userclickedpattern=[];
  level++;
  $("#level-title").text("Level "+level);
  var randomnumber=Math.floor(Math.random()*4);
  var randomchosencolor=buttoncolors[randomnumber];
  gamepattern.push(randomchosencolor);
  $("#"+randomchosencolor).fadeOut(250).fadeIn(250);
playsound(randomchosencolor);
}

function playsound(chosencolor){
  var audio=new Audio("sounds/"+chosencolor+".mp3");
  audio.play();
}

function animatepress(currentcolor){
  $("#"+currentcolor).addClass("pressed");
  setTimeout(function(){
  $("#"+currentcolor).removeClass("pressed");
  },100);
}

function startover(){
  level=0;
  gamepattern=[];
  started=false;
}
