let timeLeft=25*60;
let timerInterval=null;
let studySeconds=0;
function updateTimer(){
    let minutes=Math.floor(timeLeft/60);
    let seconds=timeLeft % 60;
    minutes=String(minutes).padStart(2,"0");
    seconds=String(seconds).padStart(2,"0");

    document.getElementById("timer").textContent=minutes+":"+seconds;
}
function startTimer(){
    if(timerInterval !==null){
        return;
    }
    timerInterval=setInterval(function(){
        if(timeLeft>0){
            timeLeft--;
            studySeconds++;
            updateTimer();
        }else{
            clearInterval(timerInterval);
            timerInterval=null;
            alert("Study session completed!");
        }
    },1000);
}
function pauseTimer(){
    clearInterval(timerInterval);
    timerInterval=null;
}
function resetTimer(){
    clearInterval(timerInterval);
    timerInterval=null;
    timeLeft=25*60;
    updateTimer();
}
updateTimer();