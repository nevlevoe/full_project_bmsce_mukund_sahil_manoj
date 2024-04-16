// Define the game logic and variables
let r1 = [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
];
let r2 = [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
];
var num_col_hex = [
    "red",
    "green",
    "blue",
    "yellow",
    "orange",
    'pink',
    "cyan",
    "purple",
    "aliceblue",
    "gray",
    "white"
]
function getpower(ele,b){
    if(ele!==''){
        let p=0
        while(2**(p+1)!==ele)
            p+=1;
        if(p>=9)
            document.getElementById(b).style.fontSize="25px";
        else
        document.getElementById(b).style.fontSize="35px";
        return p
    }
    else
        return 10;
}
function resetgame(){
    score=0;
    document.getElementById("score").innerHTML=0;
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            r1[i][j]='';
        }
    }
    update_panel();
    rangen(0);
    update_panel();
}
function returntogame(){
    location.reload();
}
function gotogamepage(){
    location.href="../gamepage.html"
}
let score=0
function startgame(){
    rangen(0);
    update_panel();
    getgame();
    document.getElementById("score").style.display="block"
    document.getElementById("startbut").style.display="none";
    document.getElementById("instructions").style.display="none";
    document.getElementById("gamepanel").style.display="none";
    document.getElementById("gameboard").style.display="flex";
    document.getElementById("but").style.display="block";
    document.getElementById("retbut").style.display="block";
    document.getElementById("title").style.marginBottom="20px"
}
function adder(l, rc, d) {
    let score = 0; // Initializing score
    // Function to merge tiles
    const mergeTiles = (line) => {
        for (let i = 0; i < line.length - 1; i++) {
            if (line[i] !== '' && line[i] === line[i + 1]) {
                line[i] *= 2;
                line[i + 1] = '';
                score += line[i]; // Incrementing score
            }
        }
        return line;
    };

    if (rc === 'r') {
        for (let i = 0; i < 4; i++) {
            let row = l[i].filter(tile => tile !== '');
            if (d === 1) row.reverse();
            row = mergeTiles(row);
            if (d === 1) row.reverse();
            for (let j = 0; j < 4; j++) {
                l[i][j] = row[j] || '';
            }
        }
    } else if (rc === 'c') {
        for (let i = 0; i < 4; i++) {
            let col = l.map(row => row[i]).filter(tile => tile !== '');
            if (d === 1) col.reverse();
            col = mergeTiles(col);
            if (d === 1) col.reverse();
            for (let j = 0; j < 4; j++) {
                l[j][i] = col[j] || '';
            }
        }
    }
    return score; // Returning the score
}

function mover(l, rc, d) {
    if (rc === 'r') {
        for (let i = 0; i < 4; i++) {
            let row = l[i].filter(tile => tile !== '');
            if (d === 1) row.reverse();
            while (row.length < 4) {
                row.push('');
            }
            if (d === 1) row.reverse();
            l[i] = row;
        }
    } else if (rc === 'c') {
        for (let i = 0; i < 4; i++) {
            let col = l.map(row => row[i]).filter(tile => tile !== '');
            if (d === 1) col.reverse();
            while (col.length < 4) {
                col.push('');
            }
            if (d === 1) col.reverse();
            for (let j = 0; j < 4; j++) {
                l[j][i] = col[j];
            }
        }
    }
}





function isOver() {
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++)
            r2[i][j]=r1[i][j];
    }
    adder(r2,'r',-1)
    mover(r2,'r',-1)
    adder(r2,'c',-1)
    mover(r2,'c',-1)
    adder(r2,'r',1)
    mover(r2,'r',1)
    adder(r2,'c',1)
    mover(r2,'c',1)
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++)
            if(r1[i][j]!==r2[i][j]||r1[i][j]==='')
                return 0;
    }
    return 1;
}

function isWon() {
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++)
            if(r1[i][j]===2048){
                return 1;
            }

    }
    return 0;
}

function rangen(d) {
    if (d === 0) {
        let count = 0;
        while (count < 2) {
            let row = Math.floor(Math.random() * 4);
            let col = Math.floor(Math.random() * 4);
            if (r1[row][col] === '') {
                r1[row][col] = 2;
                count++;
            }
        }
    } else {
        let emptyCells = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (r1[i][j] === '') {
                    emptyCells.push([i, j]);
                }
            }
        }
        if (emptyCells.length > 0) {
            let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            r1[randomCell[0]][randomCell[1]] = 2;
        }
    }
}

// Implement other necessary functions and variables

// Add event listeners for key presses to move tiles
function getgame(){
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            var s=adder(r1,'r',-1)
            mover(r1,'r',-1)
            rangen(1)
            update_panel()
        } else if (event.key === 'ArrowRight') {
            var s=adder(r1,'r',1)
            mover(r1,'r',1)
            rangen(1)
            update_panel()
        } else if (event.key === 'ArrowUp') {
            var s=adder(r1,'c',-1)
            mover(r1,'c',-1)
            rangen(1)
            update_panel()
        } else if (event.key === 'ArrowDown') {
            var s=adder(r1,'c',1)
            mover(r1,'c',1)
            rangen(1)
            update_panel()
        }
        else{
            return;
        }
        
        score+=s;
        document.getElementById("score").innerHTML=score;

    });
}
function displayMessage(message) {
    // Display the message on the webpage
    const messageElement = document.getElementById('game-message');
    messageElement.innerText = message;
    messageElement.style.display = 'block';
}



// Function to update the game board display
function update_panel() {
    // Implement the updatePanel function logic to update the game board display
    document.getElementById("b1").innerHTML=r1[0][0];
    document.getElementById("b1").style.color=num_col_hex[getpower(r1[0][0],"b1")];
    document.getElementById("b1").style.borderColor=num_col_hex[getpower(r1[0][0],"b1")];
    document.getElementById("b2").innerHTML=r1[0][1];
    document.getElementById("b2").style.color=num_col_hex[getpower(r1[0][1],"b2")];
    document.getElementById("b2").style.borderColor=num_col_hex[getpower(r1[0][1],"b2")];
    document.getElementById("b3").innerHTML=r1[0][2];
    document.getElementById("b3").style.color=num_col_hex[getpower(r1[0][2],"b3")];
    document.getElementById("b3").style.borderColor=num_col_hex[getpower(r1[0][2],"b3")];
    document.getElementById("b4").innerHTML=r1[0][3];
    document.getElementById("b4").style.color=num_col_hex[getpower(r1[0][3],"b4")];
    document.getElementById("b4").style.borderColor=num_col_hex[getpower(r1[0][3],"b4")];
    document.getElementById("b5").innerHTML=r1[1][0];
    document.getElementById("b5").style.color=num_col_hex[getpower(r1[1][0],"b5")];
    document.getElementById("b5").style.borderColor=num_col_hex[getpower(r1[1][0],"b5")];
    document.getElementById("b6").innerHTML=r1[1][1];
    document.getElementById("b6").style.color=num_col_hex[getpower(r1[1][1],"b6")];
    document.getElementById("b6").style.borderColor=num_col_hex[getpower(r1[1][1],"b6")];
    document.getElementById("b7").innerHTML=r1[1][2];
    document.getElementById("b7").style.color=num_col_hex[getpower(r1[1][2],"b7")];
    document.getElementById("b7").style.borderColor=num_col_hex[getpower(r1[1][2],"b7")];
    document.getElementById("b8").innerHTML=r1[1][3];
    document.getElementById("b8").style.color=num_col_hex[getpower(r1[1][3],"b8")];
    document.getElementById("b8").style.borderColor=num_col_hex[getpower(r1[1][3],"b8")];
    document.getElementById("b9").innerHTML=r1[2][0];
    document.getElementById("b9").style.color=num_col_hex[getpower(r1[2][0],"b9")];
    document.getElementById("b9").style.borderColor=num_col_hex[getpower(r1[2][0],"b9")];
    document.getElementById("b10").innerHTML=r1[2][1];
    document.getElementById("b10").style.color=num_col_hex[getpower(r1[2][1],"b10")];
    document.getElementById("b10").style.borderColor=num_col_hex[getpower(r1[2][1],"b10")];

    document.getElementById("b11").innerHTML=r1[2][2];
    document.getElementById("b11").style.color=num_col_hex[getpower(r1[2][2],"b11")];
    document.getElementById("b11").style.borderColor=num_col_hex[getpower(r1[2][2],"b11")];

    document.getElementById("b12").innerHTML=r1[2][3];
    document.getElementById("b12").style.color=num_col_hex[getpower(r1[2][3],"b12")];
    document.getElementById("b12").style.borderColor=num_col_hex[getpower(r1[2][3],"b12")];

    document.getElementById("b13").innerHTML=r1[3][0];
    document.getElementById("b13").style.color=num_col_hex[getpower(r1[3][0],"b13")];
    document.getElementById("b13").style.borderColor=num_col_hex[getpower(r1[3][0],"b13")];

    document.getElementById("b14").innerHTML=r1[3][1];
    document.getElementById("b14").style.color=num_col_hex[getpower(r1[3][1],"b14")];
    document.getElementById("b14").style.borderColor=num_col_hex[getpower(r1[3][1],"b14")];

    document.getElementById("b15").innerHTML=r1[3][2];
    document.getElementById("b15").style.color=num_col_hex[getpower(r1[3][2],"b15")];
    document.getElementById("b15").style.borderColor=num_col_hex[getpower(r1[3][2],"b15")];

    document.getElementById("b16").innerHTML=r1[3][3];
    document.getElementById("b16").style.color=num_col_hex[getpower(r1[3][3],"b16")];
    document.getElementById("b16").style.borderColor=num_col_hex[getpower(r1[3][3],"b16")];
    if (isWon()) {
        displayMessage("You Won!!!");
    } else if (isOver()) {
        displayMessage("Game Over!!!");
    }
    
}

// Initialize the game board and display

update_panel();