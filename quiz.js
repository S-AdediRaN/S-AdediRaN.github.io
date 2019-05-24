const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

let questions = [
    {
        question : "Graphics defined by SVG is in which format?",
        imgSrc : "img/html.png",
        choiceA : "HTML",
        choiceB : "XML",
        choiceC : "CSS",
        correct : "C"
    },{
        question : "Who is making the Web standards?",
        imgSrc : "img/css.png",
        choiceA : "Microsoft",
        choiceB : "Mozilla",
        choiceC : "TheWWWC",
        correct : "C"
    },{
        question : "What is the correct HTML element for inserting a line break?",
        imgSrc : "img/js.png",
        choiceA : "br",
        choiceB : "break",
        choiceC : "lb",
        correct : "A"
    },{
        question : "Select the option to make a list that lists the items with bullets?",
        imgSrc : "img/js.png",
        choiceA : "ol",
        choiceB : "ul",
        choiceC : "list",
        correct : "C"
    },{
        question : "Select the property that is used to create spacing between HTML elements?",
        imgSrc : "img/js.png",
        choiceA : "border",
        choiceB : "spacing",
        choiceC : "margin",
        correct : "C"
    },{
        question :"Select the appropriate HTML tag used for the largest heading?",
        imgSrc : "img/js.png",
        choiceA : "Heading",
        choiceB : "Head",
        choiceC : "H1",
        correct : "C"
    },{
        question : "Select the correct HTML tag to make a text bold?",
        imgSrc : "img/js.png",
        choiceA : "bold",
        choiceB : "heavy",
        choiceC : "big",
        correct : "C"
    },{
        question : "What is the range of heading tags available using HTML?",
        imgSrc : "img/js.png",
        choiceA : "h1 to h4",
        choiceB : "h1 to h6",
        choiceC : "h1 to h12",
        correct : "C"
    },{
        question : "What's the best place to put CSS styles in the HTML file?",
        imgSrc : "img/js.png",
        choiceA : "footer section",
        choiceB : "body section",
        choiceC : "style section",
        correct : "C"
    },{
        question : "Which CSS property controls the text size?",
        imgSrc : "img/js.png",
        choiceA : "font-size",
        choiceB : "text-size",
        choiceC : "font-style",
        correct : "C"
    },{
        question : "Which property is used to change the font of an element?",
        imgSrc : "img/js.png",
        choiceA : "font-weight",
        choiceB : "font-family",
        choiceC : "font-style",
        correct : "C"
    },{
        question : "Choose the correct HTML element to define emphasized text",
        imgSrc : "img/js.png",
        choiceA : "i",
        choiceB : "italic",
        choiceC : "em",
        correct : "C"
    },{
        question : "The is doctype mandatory.",
        imgSrc : "img/js.png",
        choiceA : "True",
        choiceB : "Maybe",
        choiceC : "False",
        correct : "A"
    },{
        question : "JavaScript is the same as Java.",
        imgSrc : "img/js.png",
        choiceA : "False",
        choiceB : "True",
        choiceC : "Maybe",
        correct : "A"
    },{
        question : "Which event occurs when the user clicks on an HTML element?",
        imgSrc : "img/js.png",
        choiceA : "onchange",
        choiceB : "onmouse",
        choiceC : "onclick",
        correct : "C"
    },{
        question : "How do you declare a JavaScript variable?",
        imgSrc : "img/js.png",
        choiceA : "v carName",
        choiceB : "var Carname",
        choiceC : "var carName",
        correct : "C"
    },{
        question : "What will the following code return: Boolean(10 > 9)",
        imgSrc : "img/js.png",
        choiceA : "True",
        choiceB : "False",
        choiceC : "NaN",
        correct : "C"
    },{
        question : "Is JavaScript case-sensitive?",
        imgSrc : "img/js.png",
        choiceA : "Yes",
        choiceB : "No",
        choiceC : "Sometimes",
        correct : "A"
    },{
        question : "Which HTML element defines the title of a document?",
        imgSrc : "img/js.png",
        choiceA : "head",
        choiceB : "title",
        choiceC : "meta",
        correct : "B"
    },{
        question : "Who came up with the theory of relativity?",
        choiceA : "Sir Isaac Newton",
        choiceB : "Nicolaus Copernicus",
        choiceC : "Albert Einstein",
        correct : "C"
    },
];


const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; 
const gaugeWidth = 150; 
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    
}


function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}


function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            
            clearInterval(TIMER);
            scoreRender();
        }
    }
}



function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        score++;
        answerIsCorrect();
    }else{   
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        
        clearInterval(TIMER);
        scoreRender();
    }
}


function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}


function scoreRender(){
    scoreDiv.style.display = "block";
    

    const scorePerCent = Math.round(100 * score/questions.length);
    
   
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";

    if (score >= 15){
        document.getElementById("scorecard").innerHTML= " Congratulation!! Your Total was  " +score+ " Excellent";

    }else if(score >=10){
        document.getElementById("scorecard").innerHTML = "You got " + score+ " Right Average score you can do better <br>";

    }else if (score < 10 ){
        document.getElementById("scorecard").innerHTML = "Below Average please try again!";

    }else{
        document.getElementById("scorecard").innerHTML = "";
    }

}






