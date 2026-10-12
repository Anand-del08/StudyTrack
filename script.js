let timeLeft=25*60;
let timerInterval=null;
function getToday(){
    return new Date().toLocaleDateString("en-CA");
}
let savedDate=localStorage.getItem("studyDate");
let studySeconds=Number(localStorage.getItem("studySeconds"))||0;
let studyGoalMinutes=Number(localStorage.getItem("studyGoalMinutes")) || 60;
if(savedDate!==getToday()){
    studySeconds=0;
    localStorage.setItem("studySeconds",0);
    localStorage.setItem("studyDate",getToday());
}
function updateStudyTime(){
    let minutesStudied=Math.floor(studySeconds/60);
    document.getElementById("studyTime").textContent=minutesStudied+" min";
    document.getElementById("studyGoal").textContent=minutesStudied+"/"+studyGoalMinutes+" min studied";
    let progress=(minutesStudied/studyGoalMinutes)*100;
    if(progress>100){
        progress=100;
    }
    document.getElementById("studyProgress").style.width=progress+"%";
    document.getElementById("studyPercentage").textContent=Math.floor(progress)+"% complete";
    if(minutesStudied >= studyGoalMinutes){
    document.getElementById("studyGoalMessage").textContent="Daily study goal completed!"
    }else{
    document.getElementById("studyGoalMessage").textContent="Keep going! You can reach your goal!";
    }
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
            localStorage.setItem("studyHistory_" + getToday(), studySeconds);
            localStorage.setItem("studyDate",getToday());
            updateStudyTime();
            updateTimer();
            displayStudyHistory();
            displayWeeklySummary();
        }else{
            clearInterval(timerInterval);
            timerInterval=null;
            document.getElementById("timerMessage").textContent="🎉Study session completed! Great job!";

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

let subjects=JSON.parse(localStorage.getItem("subjects")) || [];
const subjectForm=document.getElementById("subjectForm");
const subjectInput=document.getElementById("subjectInput");
const subjectList=document.getElementById("subjectList");
const subjectCount=document.getElementById("subjectCount");
function displaySubject(){
    subjectList.innerHTML="";
    subjects.forEach(function(subject, index){
        const li=document.createElement("li");
        li.textContent=subject;
        const deleteButton=document.createElement("button");
        deleteButton.textContent="Delete";
        deleteButton.onclick=function(){
            subjects.splice(index, 1);
            localStorage.setItem(
                "subjects",
                JSON.stringify(subjects)
            );
            displaySubject();
        };
        li.appendChild(deleteButton);
        subjectList.appendChild(li);
    });
    subjectCount.textContent=subjects.length;
    document.getElementById("subjectMessage").textContent=subjects.length+(subjects.length === 1 ? " subject added":" subjects added");
    let subjectPercentage=(subjects.length/10)*100;
    if(subjectPercentage>100){
        subjectPercentage=100;
    }
    document.getElementById("subjectProgressBar").style.width=subjectPercentage+"%";
}
subjectForm.addEventListener("submit",function(event){
    event.preventDefault();
    const subjectName=subjectInput.value.trim();
    if (subjectName===""){
        return;
    }
    if
    (subjects.includes(subjectName)){
        alert("This subject already exists!");
        return;
    }
    subjects.push(subjectName);
    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );
    subjectInput.value="";
    displaySubject();
})
displaySubject();

let tasks=JSON.parse(localStorage.getItem("tasks")) || [];
const taskForm=document.getElementById("taskForm");
const taskInput=document.getElementById("taskInput");
const taskList=document.getElementById("taskList");
const taskCount=document.getElementById("taskCount");
function displayTasks(){
    taskList.innerHTML="";
    tasks.forEach(function(task, index){
        const li=document.createElement("li");
        li.textContent=task.name;
        if(task.completed){
            li.style.textDecoration="line-through";
            li.style.opacity="0.6";
        }
        const completeButton=document.createElement("button");
        completeButton.textContent=task.completed ?"Completed":"Complete";
        completeButton.onclick=function(){
            task.completed=!task.completed;
            localStorage.setItem(
                "tasks",
                JSON.stringify(tasks)
            );
            displayTasks();
        }


        const deleteButton=document.createElement("button");
        deleteButton.textContent="Delete";
        deleteButton.onclick=function(){
            tasks.splice(index, 1);
            localStorage.setItem(
                "tasks",
                JSON.stringify(tasks)
            );
            displayTasks();
        };
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
    const completedTasks=tasks.filter(
        function(task){
            return task.completed;
        }
    ).length;
    taskCount.textContent=completedTasks;
    document.getElementById("taskProgress").textContent=completedTasks + " / "+tasks.length +" completed";
    let taskPercentage=0;
    if(tasks.length>0){
        taskPercentage=(completedTasks/tasks.length)*100;
    }
    document.getElementById("taskProgressBar").style.width=taskPercentage+"%";
}

taskForm.addEventListener("submit",function(event){
    event.preventDefault();
    const taskName=taskInput.value.trim();
    if (taskName===""){
        return;
    }
    const newTask={
        name:taskName,
        completed:false
    };
    if(tasks.some(function(task){
        return task.name.toLowerCase()===taskName.toLowerCase();

    })){
        alert("This task already exists!");
        return;
    }
    tasks.push(newTask);
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
    taskInput.value="";
    displayTasks();
})
displayTasks();

function clearCompletedTasks(){
    tasks=tasks.filter(function(task){
        return!task.completed;
    });
    localStorage.setItem(
        "tasks",JSON.stringify(tasks)
    );
    displayTasks();
}
function clearAllTasks(){
    tasks=[];
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
    displayTasks();
}
function clearAllSubjects(){
    subjects=[];
    localStorage.setItem("subjects",JSON.stringify(subjects)
    );
    displaySubject();
}
function displayTodayDate(){
    const today=new Date();
    document.getElementById("todayDate").textContent=
    today.toLocaleDateString("en-IN",{
        day:"numeric",
        month:"short",
        year:"numeric"
    });
}
displayTodayDate();

function toggleDarkMode(){
    document.body.classList.toggle("dark-mode");
    const  button=document.getElementById("darkModeButton");
    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("darkMode","enabled");
        button.textContent="☀️ Light Mode";
        }else{
            localStorage.setItem("darkMode","disabled");
            button.textContent="🌙 Dark Mode";
    }
}
if(localStorage.getItem("darkMode")==="enabled"){
    document.body.classList.add("dark-mode");
    document.getElementById("darkModeButton").textContent="☀️ Light Mode";
}

function saveStudyGoal(){
    const goalInput=document.getElementById("goalInput");
    const newGoal=Number(goalInput.value);
    if(newGoal<1 || newGoal >600){
        alert("Please enter a goal between 1 and 600 minutes.");
        return;
    }
    studyGoalMinutes=newGoal;
    localStorage.setItem("studyGoalMinutes",studyGoalMinutes);
    updateStudyTime();
    alert("Daily study goal saved!");

}
document.getElementById("goalInput").value=studyGoalMinutes;

function displayStudyHistory(){
    const historyList=document.getElementById("studyHistoryList");
    historyList.innerHTML="";
    const today=new Date();
    for(let i=0;i<7;i++){
        const date=new Date(today);
        date.setDate(today.getDate()-i);
        const dateKey=date.toLocaleDateString("en-CA");
        const savedSeconds=Number(localStorage.getItem("studyHistory_"+dateKey)) || 0;
        const minutes=Math.floor(savedSeconds/60);
        const li=document.createElement("li");
        li.textContent = date.toLocaleDateString("en-IN",{
            day:"numeric",
            month:"short"
        }) + " - " + minutes + " min";
        historyList.appendChild(li);
    }
}
displayStudyHistory();
                    
function displayWeeklySummary(){
    let totalSeconds=0;
    const today=new Date();
    for(let i=0;i<7;i++){
        const Date=new date(today);
        date.setDate(today.getDate()-i);
        const dateKey=date.toLocaleDateString("en-CA");
        const savedSeconds=Number(localStorage.getItem("studyHistory_"+dateKey)) || 0;
        totalSeconds +=savedSeconds;
    }
    const totalMinutes=Math.floor(totalSeconds/60);
    const averageMinutes=Math.floor(totalMinutes/7);
    document.getElementById("weeklyTotal").textContent=totalMinutes+" min total";
    document.getElementById("weeklyAverage").textContent=averageMinutes+" min average per day";
}
displayWeeklySummary();