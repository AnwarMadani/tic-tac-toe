let gameBoard = ["", "", "", "", "", "", "", "", "", ]
const restartBtn = document.getElementById('restart');
const winnerText = document.getElementById('winner');
restartBtn.addEventListener("click", cleanBoard);
let currentPlayer = 'X';
let running = true;
winnerText.textContent = `${currentPlayer}'s turn`;

const cells = document.querySelectorAll('.boardCell');

cells.forEach(cell => cell.addEventListener("click", (e) => cellClicked(e)));

function cellClicked(e){
    if(!running) return;
    // console.log(e.target.getAttribute('cellIndex'));
    let cellIndex = e.target.getAttribute('cellIndex');
    gameBoard[cellIndex] = currentPlayer;
    if(e.target.textContent !== '') return;
    e.target.textContent = currentPlayer;
    checkWinner();
    if(running) changePlayer();
}


const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function changePlayer(){
    currentPlayer = (currentPlayer == 'X'? 'O' : 'X');
    winnerText.textContent = `${currentPlayer}'s turn`;
}


function checkWinner(){
    for (let i = 0; i < winConditions.length; i++){
        let condition = winConditions[i];
        let cellA = gameBoard[condition[0]];
        let cellB = gameBoard[condition[1]];
        let cellC = gameBoard[condition[2]];

        if(cellA === '' || cellB === '' || cellC === '') continue;

        if(cellA === cellB && cellB === cellC){
            playerWon(currentPlayer);
            break;
        }
    }
}

function cleanBoard(){
    gameBoard = ["", "", "", "", "", "", "", "", "", ]
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
    winnerText.textContent = '';
    running = true;
}

function playerWon(player){
    winnerText.textContent = `${player} Won This Game!`;
    running = false;
}