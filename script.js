
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const messageDisplay = document.getElementById('message');
    const restartButton = document.getElementById('restartButton');
    const changePlayersButton = document.getElementById('changePlayersButton');
    const startGameButton = document.getElementById('startGameButton');
    const nameInputSection = document.getElementById('nameInput');
    const gameBoard = document.getElementById('gameBoard');
    const buttonGroup = document.querySelector('.button-group');

    const playerXInput = document.getElementById('playerX');
    const playerOInput = document.getElementById('playerO');

    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let playerXName = 'Player X';
    let playerOName = 'Player O';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellPlayed = (clickedCell, clickedCellIndex) => {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
        clickedCell.innerText = currentPlayer;
    };

    const handlePlayerChange = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        const playerName = currentPlayer === 'X' ? playerXName : playerOName;
        messageDisplay.innerText = `${playerName}'s turn (${currentPlayer})`;
    };

    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            const winnerName = currentPlayer === 'X' ? playerXName : playerOName;
            messageDisplay.innerText = `🎉 Congratulations, ${winnerName}! You won as ${currentPlayer}! 🎉`;
            messageDisplay.style.fontSize = '2em';  
            gameActive = false;
            return;
        }

        if (!gameState.includes('')) {
            messageDisplay.innerText = "It's a draw!";
            gameActive = false;
            return;
        }

        handlePlayerChange();
    };

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    };

    const handleRestartGame = () => {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        messageDisplay.innerText = `${playerXName}'s turn (X)`;
        messageDisplay.style.fontSize = '1.5em';  
        cells.forEach(cell => {
            cell.innerText = '';
            cell.classList.remove('x', 'o');
        });
    };

    const startGame = () => {
        playerXName = playerXInput.value || 'Player X';
        playerOName = playerOInput.value || 'Player O';

        nameInputSection.style.display = 'none';
        gameBoard.style.display = 'grid';
        messageDisplay.style.display = 'block';
        buttonGroup.style.display = 'flex';

        messageDisplay.innerText = `${playerXName}'s turn (X)`;
    };

    const changePlayers = () => {
        gameBoard.style.display = 'none';
        buttonGroup.style.display = 'none';
        messageDisplay.style.display = 'none';
        nameInputSection.style.display = 'flex';

        
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        cells.forEach(cell => {
            cell.innerText = '';
            cell.classList.remove('x', 'o'); });

        messageDisplay.style.fontSize = '1.5em';  
    };

    startGameButton.addEventListener('click', startGame);
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartGame);
    changePlayersButton.addEventListener('click', changePlayers);
});
