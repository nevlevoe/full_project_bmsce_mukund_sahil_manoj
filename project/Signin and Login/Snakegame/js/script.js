let inputDir={x:0,y:0};
let speed = 5;
let lastPaint=0;
let snakeArr=[
    {x:3,y:11}
]
let food={x:6,y:9}
let score=0
const bgscore=new Audio("background_score.mp3");
const foodeat=new Audio("engulf.mp3");
const gameend=new Audio("game_end.mp3")
scoredisp=document.getElementById("score")
board=document.getElementById("gameboard")
//origin is on the top left corner basically the fourth quadrant has x and y
//game functions
function main(ctime){
    //it has better fps and animation quality but it also has high fps
    Animeid=window.requestAnimationFrame(main)
    if((ctime-lastPaint)/1000<1/speed){
        return;
    }

    lastPaint=ctime;
    gameEngine();
}
function gotogamepage(){
    window.location.href="../gamepage.html";
}
function setspeed1(){
    speed=5;
}
function setspeed2(){
    speed=15;
}
function isCollide(snake){
    //bumping into self
    
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x===snake[0].x&&snake[i].y===snake[0].y)
            return true;
    }
    if(snake[0].x>=15||snake[0].x<=0||snake[0].y>=15||snake[0].y<=0)
        return true;
}
function resetgame(){
    Animeid=window.requestAnimationFrame(main)
    score=0
    scoredisp.innerHTML=0
    inputDir={x:0,y:0};
    snakeArr=[
        {x:3,y:11}
    ]
}
function returntogame(){
    location.reload()
}
function gameEngine(){
    
    //updating the snake array & food
    if(isCollide(snakeArr)){
        window.cancelAnimationFrame(Animeid)
        gameend.play()
        bgscore.pause()
        
    }
    //after eating food regenerate the food
    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
        foodeat.play();
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        let a=2;
        let b=13;
        score+=1;
        scoredisp.innerHTML=score
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    //moving the snake
    for (let i = snakeArr.length-2; i>=0; i--) {
        snakeArr[i+1]={...snakeArr[i]};
        //if we don't do this just the references change not the values
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;


    //render the snake onto screen
    //board=document.getElementById("gameboard");
    board.innerHTML=""
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0){
            snakeElement.classList.add("head");
        }
        else{
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    })
    //render the food onto screen
    foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add("food");
        foodElement.classList.add("blink");
        board.appendChild(foodElement);
    
}


function startgame(){
    document.getElementById("gameboard").style.display="grid";
    document.getElementById("gameboard").style.marginTop="20px";
    document.getElementById("starter").style.display="none";
    document.getElementById("instructions").style.display="none";
    document.getElementById("score").style.display="block";
    document.getElementById("but").style.display="block";
    document.getElementById("retbut").style.display="block";
    get_events()
}

//main logic
window.requestAnimationFrame(main)
//whenever a key is clicked arrow function is launched
function get_events(){
    window.addEventListener('keydown',e=>{
        bgscore.play()
        inputDir={x:0,y:1}//start the game
        switch (e.key) {
            case "ArrowUp":
                inputDir.x=0;
                inputDir.y=-1;
                break;
            case "ArrowDown":
                inputDir.x=0;
                inputDir.y=1;
                break;
            case "ArrowLeft":
                inputDir.x=-1;
                inputDir.y=0;
                break;
            case "ArrowRight":
                inputDir.x=1;
                inputDir.y=0;
                break;
        
            default:
                break;
        }
    })
}