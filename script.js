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
}

subjectForm.addEventListener("submit",function(event){
    event.preventDefault();
    const subjectName=subjectInput.value.trim();
    if (subjectName===""){
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
    taskCount.textContent=tasks.filter(
        function(task){
            return task.completed;
        }
    ).length;
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