// var board;
// var playerO="o";
// var playerX="x";
// var currplayer=playerO;
// var gameOver=false;

// window.onload=function()
// {
//     setGame();
// }
// function setGame()
// {
//     board=[
//         [' ',' ',' '],
//         [' ',' ',' '],
//         [' ',' ',' ']
//     ]
//     for(let r=0;r<3;r++){
//         for(let c=0;c<3;c++)
//         {
//             //div tag
//             //div id 0-0,0-1,0-2.......
//             let tile=document.createElement("div");
//             tile.id = r.toString() + "-" + c.toString();

//             tile.classList.add("tile");//call tile css

//             if (r == 0 || r == 1) {     // calling horizontal and vertical lines css
//                 tile.classList.add("horizontal-lines");
//             }
//             if (c == 0 || c == 1) {
//                 tile.classList.add("vertical-lines");
//             }
//             document.getElementById("board").append(tile);

//         }
//     }

    
// }
var board;
var playerO = "O";
var playerX = "X";
var currPlayer = playerO;
var gameOver = false;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [
                [' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']
            ]

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
             //div tag
//             //div id 0-0,0-1,0-2.......
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");//call tile css
            if (r == 0 || r == 1) {
                tile.classList.add("horizontal-line");// calling horizontal and vertical lines css
            }
            if (c == 0 || c == 1) {
                tile.classList.add("vertical-line");
            }
            tile.innerText = "";
            tile.addEventListener("click", setTile);//makes tile clickable
            document.getElementById("board").appendChild(tile);
        }
    }
}

function setTile() {
    if (gameOver) {
        return;//make each tile unclickable
    }

    let coords = this.id.split("-");    //ex) "1-2" -> ["1", "2'"]
    let r = parseInt(coords[0]);//getting the cordinates of the tile we click 
    let c = parseInt(coords[1]);//coverting cord to int

    if (board[r][c] != ' ') { //already tile is already taken by x,o cant take that again
        return;
    }
    
    board[r][c] = currPlayer; //mark the board
    this.innerText = currPlayer; //mark the board on html

    //change players
    if (currPlayer == playerO) {
        currPlayer = playerX;
    }
    else {
        currPlayer = playerO;
    }

    //check winner
    checkWinner();
}


function checkWinner() {
    //horizontally, check 3 rows
    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {
            //if we found the winning row
            //apply the winner style to each of that row
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            return;//if this satisfies no need to check other conditions
        }
    }

    //vertically, check 3 columns
    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] ==  board[2][c] && board[0][c] != ' ') {
            //if we found the winning col
            //apply the winner style to that col
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(i.toString() + "-" + c.toString());                
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }

    //diagonally
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(i.toString() + "-" + i.toString());                
            tile.classList.add("winner");
        }
        gameOver = true;
        return;
    }

    //anti-diagonally
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        //0-2
        let tile = document.getElementById("0-2");                
        tile.classList.add("winner");

        //1-1
        tile = document.getElementById("1-1");                
        tile.classList.add("winner");

        //2-0
        tile = document.getElementById("2-0");                
        tile.classList.add("winner");
        gameOver = true;
        return;
    }
}