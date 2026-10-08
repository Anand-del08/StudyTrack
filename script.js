let timeLeft=25*60;
let timerInterval=null;
function getToday(){
    return new Date().toLocaleDateString("en-CA");
}
let savedDate=localStorage.getItem("studyDate");
let studySeconds=Number(localStorage.getItem("studySeconds"))||0;
if(savedDate!==getToday()){
    studySeconds=0;
    localStorage.setItem("studySeconds",0);
    localStorage.setItem("studyDate",getToday());
}
function updateStudyTime(){
    let minutesStudied=Math.floor(studySeconds/60);
    document.getElementById("studyTime").textContent=minutesStudied+" min";
}
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
            localStorage.setItem("studySeconds",studySeconds);
            localStorage.setItem("studyDate",getToday());
            updateStudyTime();
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
updateStudyTime();