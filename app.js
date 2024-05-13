const board = document.getElementById('board');
const squares = document.getElementsByClassName('square');
const players = ['X', 'O'];
let currentPlayer = players[0];
const endMessage = document.createElement('h2');
endMessage.textContent = `Your turn!`;
endMessage.style.marginTop = '30px';
endMessage.style.textAlign='center';
board.after(endMessage);

const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let turnCount = 0; // Add turn count

for(let i = 0; i < squares.length; i++){
    squares[i].addEventListener('click', () => {
        if(squares[i].textContent !== ''){
            return;
        }
        squares[i].textContent = players[0]; // Player's turn
        turnCount++;
        if(checkWin(players[0])) {
            endMessage.textContent = `Game over! You win!`;
            return;
        }
        if(turnCount === 9) {
            endMessage.textContent = `Game is tied!`;
            return;
        }
        setTimeout(computerTurn, 500); // Computer's turn
    });
}

function computerTurn() {
    let randomSquare;
    do {
        randomSquare = Math.floor(Math.random() * 9);
    } while (squares[randomSquare].textContent !== '');
    squares[randomSquare].textContent = players[1];
    turnCount++;
    if(checkWin(players[1])) {
        endMessage.textContent = `Game over! Computer wins!`;
        return;
    }
    if(turnCount === 9) {
        endMessage.textContent = `Game is tied!`;
        return;
    }
}

function checkWin(currentPlayer) {
    for(let i = 0; i < winning_combinations.length; i++){
        const [a, b, c] = winning_combinations[i];
        if(squares[a].textContent === currentPlayer && squares[b].textContent === currentPlayer && squares[c].textContent === currentPlayer){
            return true;
        }
    }
    return false;
}

function restartButton() {
    for(let i = 0; i < squares.length; i++) {
        squares[i].textContent = "";
    }
    endMessage.textContent = `Your turn!`;
    currentPlayer = players[0];
    turnCount = 0;
}
