let quizApp =document.querySelector(".quiz-app");
let count = document.querySelector(".count span");
let bulletsContainer = document.querySelector(".footer .bullets");
let quizArea = document.querySelector(".quiz-area");
let questionArea = document.querySelector(".quiz-area h2");
let answersArea = document.querySelector(".answers-area");
let submit = document.querySelector("button");
let footer = document.querySelector(".footer");
let countDownElement = document.querySelector(".count-down ");

let setIntervalCount ; 
let rightAnswersCount=0;
let questionsCount;

function getQuestions() {
    let myrequest =new XMLHttpRequest();
    myrequest.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            let questions = JSON.parse(this.responseText);
            //  console.log(questions[0][`answer_${currentIndex}`]);
            questionsCount = questions.length ; 
            bulletsCount(questionsCount);
            displayQuestion(questions[currentIndex],questionsCount);

            // timer
            // countDown(10,questionsCount);

            // display next question

            submit.onclick = function(){
                let rightAnswer = questions[currentIndex].right_answer;
               
                answersArea.innerHTML=""
                bulletsContainer.innerHTML=""
                currentIndex++;

                displayQuestion(questions[currentIndex],questionsCount);
                
                bulletsCount(questionsCount);

                checkAnswer(rightAnswer,questionsCount);
                
                // stop timer
                clearInterval(setIntervalCount);

                //start new timer
                countDown(10,questionsCount);
                
        }
    }   
     }
    myrequest.open("GET" , "questions.json" , true);
    myrequest.send();
};
getQuestions();

//set count of questions + bullets
let currentIndex = 0 ;

function bulletsCount(num){
    count.innerHTML = num;
    for(let i = 0 ;i<num; i++){
        let bulletSpan = document.createElement("span");
        bulletsContainer.appendChild(bulletSpan);
    
        let bulletsSpans = document.querySelectorAll(".bullets span");
        bulletsSpans.forEach( function(span,index){
            if(index==currentIndex){
                span.className="active"
        }
    })
}
};
function displayQuestion(obj,num){
    if(currentIndex<num){
        questionArea.innerHTML = obj.title;
        for(let i = 1 ; i<=4; i++){
            let lableText = obj[`answer_${i}`]; 
            answersArea.innerHTML += `<div class="answer">
            <label for="answer${i}" name="label">${lableText}</label>
            <input type="radio" name="question" id="answer${i}" data-answer="${lableText}">
            </div>`
        }
    }else{
        questionArea.remove();
        answersArea.remove();
        submit.remove();
        footer.remove();
        let maindiv = document.createElement("div");
        maindiv.className = "popup";
        let txt = document.createTextNode("quiz end");
        maindiv.appendChild(txt);
        quizArea.appendChild(maindiv);
        let result  = document.createElement("div");
        result.className="result";
        let resultTxt =document.createTextNode(`your result is ${rightAnswersCount}/${questionsCount}`)
        result.appendChild(resultTxt)
        quizArea.appendChild(result);
    }
    
};
//check answer

function checkAnswer(ranswer, count){
    let answers = document.getElementsByName("question");
    let choosenAnswer;
    if(currentIndex < count){
        for(let k = 0 ; k < answers.length; k++){
            if(answers[k].checked == true){

                choosenAnswer = answers[k].dataset.answer;
            };
        };
        console.log(choosenAnswer);

        if(choosenAnswer==ranswer){
            rightAnswersCount++
        }
        console.log(rightAnswersCount);
    };
    }
// count down
function countDown(duration,count){
    if(currentIndex<count){
        let minutes , seconds ;
        setIntervalCount= setInterval(() => {
            minutes= parseInt(duration/60);
            seconds= parseInt(duration%60);
            countDownElement.innerHTML = `${minutes}:${seconds}`
            duration--;
            if(duration<0){
                clearInterval(setIntervalCount);
                submit.click();
            }
        }, 1000);
    }
};

// results
function showResults(){

}