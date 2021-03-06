let boardModel = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
]

let currentPlayer = 'Red'
let numberOfDiscsPlayed = 0

function displayMessage(message) {
    let messageDiv = document.querySelector('#message')
    if (messageDiv !== null) {
        messageDiv.textContent = message
    }
}

function displayCurrentPlayer(currPlayer) {
    displayMessage('Current player is: ' + currPlayer)
}

function displayWhoWon(winner) {
    let header = document.querySelector('header')
    let messageDiv = document.querySelector('#message')
    let gameDecision = document.querySelector('#game-decision')
    if (winner === 1) {
        header.removeChild(messageDiv)
        gameDecision.style.color = 'red'
        gameDecision.style.fontWeight = 'bold'
        gameDecision.textContent = 'Winner is Red!'
    } else {
        header.removeChild(messageDiv)
        gameDecision.style.color = 'black'
        gameDecision.style.fontWeight = 'bold'
        gameDecision.textContent = 'Winner is Black!'
    }
    //erase contents of the board 
}

function displayTieMessage() {
    let header = document.querySelector('header')
    let gameDecision = document.querySelector('#game-decision')
    let messageDiv = document.querySelector('#message')
    header.removeChild(messageDiv)
    gameDecision.style.fontWeight = 'bold'
    gameDecision.textContent = 'Tie Game!'
}

function dropDiscIntoColumn(column) {
    // if the column is not full...
    if (gameIsATie() === true) {
        displayTieMessage()
    } else {
        if (columnIsFull(column) === true) {
            return
        } else {
            if (currentPlayer === 'Red') {
                let redPiece = document.querySelector('#red-piece')
                let piecePickedUp = redPiece.cloneNode()
                column.appendChild(piecePickedUp)
                currentPlayer = 'Black'
                let col = parseInt(column.dataset.col)
                let row = 6 - column.childElementCount
                boardModel[row].splice(col, 1, 1)
            } else {
                let blackPiece = document.querySelector('#black-piece')
                let piecePickedUp = blackPiece.cloneNode()
                column.appendChild(piecePickedUp)
                currentPlayer = 'Red'
                let col = parseInt(column.dataset.col)
                let row = 6 - column.childElementCount
                boardModel[row].splice(col, 1, 2)
            }
            numberOfDiscsPlayed++
        }
    }
}

function columnClickHandler(event) {
    const columnThatWasClicked = event.currentTarget
    dropDiscIntoColumn(columnThatWasClicked)
    const winner = determineGameWinner(boardModel)
    if (winner !== null) {
        displayWhoWon(winner)
    } else if (gameIsATie(boardModel)) {
        displayTieMessage()
    }
    displayCurrentPlayer(currentPlayer)
}

function determineGameWinner(board) {
    const horz = winnerHorizontal(board)
    const vert = winnerVertical(board)
    const dnrt = winnerDiagonalDownRight(board)
    const uprt = winnerDiagonalUpRight(board)
    if (horz !== null) {
        return horz
    }
    if (vert !== null) {
        return vert
    }
    if (dnrt !== null) {
        return dnrt
    }
    if (uprt !== null) {
        return uprt
    }
    return null
}

function createColumnEventListeners() {
    document.querySelector('#col0').addEventListener('click', columnClickHandler)
    document.querySelector('#col1').addEventListener('click', columnClickHandler)
    document.querySelector('#col2').addEventListener('click', columnClickHandler)
    document.querySelector('#col3').addEventListener('click', columnClickHandler)
    document.querySelector('#col4').addEventListener('click', columnClickHandler)
    document.querySelector('#col5').addEventListener('click', columnClickHandler)
    document.querySelector('#col6').addEventListener('click', columnClickHandler)
}

function initializeGame() {
    createColumnEventListeners()
    displayCurrentPlayer(currentPlayer)
}

initializeGame()

function gameIsATie(board) {
    if (numberOfDiscsPlayed === 42) {
        return true
    }
    return false
}

function columnIsFull(column) {
    let childrenCount = column.childElementCount
    if (childrenCount === 6) {
        return true
    }
    return false
}

function winnerHorizontal(board) {
    for (let row = 0; row <= 5; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if ((board[row][col] === board[row][col + 1]) &&
                (board[row][col] === board[row][col + 2]) &&
                (board[row][col] === board[row][col + 3]) &&
                (board[row][col] !== null)) {
                console.log('horizontal win')
                return board[row][col]
            }
        }
    }
    return null
}

function winnerVertical(board) {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if ((board[row][col] === board[row + 1][col]) &&
                (board[row][col] === board[row + 2][col]) &&
                (board[row][col] === board[row + 3][col]) &&
                (board[row][col] !== null)) {
                console.log('vertical win')
                return board[row][col]
            }
        }
    }
    return null
}

function winnerDiagonalDownRight(board) {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if ((board[row][col] === board[row + 1][col + 1]) &&
                (board[row][col] === board[row + 2][col + 2]) &&
                (board[row][col] === board[row + 3][col + 3]) &&
                (board[row][col] !== null)) {
                console.log('diagonal up right win')
                return board[row][col]
            }
        }
    } return null
}

function winnerDiagonalUpRight(board) {
    for (let row = 0; row < 3; row++) {
        for (let col = 3; col < board[row].length; col++) {
            if ((board[row][col] === board[row + 1][col - 1]) &&
                (board[row][col] === board[row + 2][col - 2]) &&
                (board[row][col] === board[row + 3][col - 3]) &&
                (board[row][col] !== null)) {
                console.log('diagonal down right win')
                return board[row][col]
            }
        }
    } return null
}

function testWinnerVertical() {
    console.assert((winnerVertical([
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
    ]) === null), "Winner Vertical fails on empty board")
    console.assert((winnerVertical([
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [1, null, null, null, null, null, null],
        [1, null, null, null, null, null, null],
        [1, null, null, null, null, null, null],
        [1, null, null, null, null, null, null]
    ]) === 1), "Winner Vertical fails on col 0 player 1 win")
    console.assert((winnerVertical([
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [2, null, null, null, null, null, null],
        [2, null, null, null, null, null, null],
        [2, null, null, null, null, null, null],
        [2, null, null, null, null, null, null]
    ]) === 2), "Winner Vertical fails on col 0 player 2 win")
    console.assert((winnerVertical([
        [null, null, 2, null, null, null, null],
        [null, null, 1, null, null, null, null],
        [2, null, 1, null, null, null, 1],
        [1, null, 1, null, null, null, 1],
        [2, null, 2, null, null, null, 1],
        [2, null, 2, null, null, null, 1]
    ]) === 1), "Winner Vertical fails on col 6 player 1 win")
}
testWinnerVertical()

function testWinnerDiagonalUpRight() {
    console.assert((winnerDiagonalUpRight([
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
    ]) === null), "Winner Diagonal Up Right fails on empty board")
    console.assert((winnerDiagonalUpRight([
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, 1, null, null, null],
        [null, null, 1, null, null, null, null],
        [null, 1, null, null, null, null, null],
        [1, null, null, null, null, null, null]
    ]) === 1), "Winner Diagonal Up Right fails on (row 5, col 0) to (row 2, col 3) player 1 win")
    console.assert((winnerDiagonalUpRight([
        [null, null, null, null, null, null, 2],
        [null, null, null, null, null, 2, null],
        [null, null, null, null, 2, null, null],
        [null, null, null, 2, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
    ]) === 2), "Winner Diagonal Up Right fails on (row 3, col 3) to (row 0, col 6) player 2 win")
    console.assert((winnerDiagonalUpRight([
        [1, 1, 1, 2, null, null, null],
        [null, null, null, 1, 2, 1, 1],
        [null, null, null, null, 1, null, null],
        [2, null, null, 1, null, 1, null],
        [null, null, 1, null, null, null, null],
        [null, null, null, null, null, null, null]
    ]) === 1), "Winner Diagonal Up Right fails on (row 4, col 2) to (row 1, col 5) player 1 win")
}
testWinnerDiagonalUpRight()

function testWinnerHorizontal() {
    console.assert((winnerHorizontal([
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
    ]) === null), "Winner Horizontal fails on empty board")
    console.assert((winnerHorizontal([
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [1, 1, 1, 1, null, null, null]
    ]) === 1), "Winner Horizontal fails on row 5 player 1 win")
    console.assert((winnerHorizontal([
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, 2, 2, 2, 2],
        [null, null, null, null, null, null, null]
    ]) === 2), "Winner Horizontal fails on row 4 player 2 win")
    console.assert((winnerHorizontal([
        [1, 1, 1, 2, null, null, null],
        [null, null, null, 1, 1, 1, 1],
        [null, null, null, null, null, null, null],
        [2, null, null, 2, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
    ]) === 1), "Winner Horizontal fails on row 1 player 1 win")
}
testWinnerHorizontal()

function testWinnerDiagonalDownRight() {
    console.assert((winnerDiagonalDownRight([
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
    ]) === null), "Winner Diagonal Down Right fails on empty board")
    console.assert((winnerDiagonalDownRight([
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, 1, null, null, null, null],
        [null, null, null, 1, null, null, null],
        [null, null, null, null, 1, null, null],
        [null, null, null, null, null, 1, null]
    ]) === 1), "Winner Diagonal Down Right fails on (row 2, col 2) to (row 5, col 5) player 1 win")
    console.assert((winnerDiagonalDownRight([
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, 2, null, null, null],
        [null, null, null, null, 2, null, null],
        [null, null, null, null, null, 2, null],
        [null, null, null, null, null, null, 2]
    ]) === 2), "Winner Diagonal Down Right fails on (row 2, col 3) to (row 5, col 6) player 2 win")
    console.assert((winnerDiagonalDownRight([
        [1, 1, 1, 2, null, null, null],
        [null, null, null, 1, 2, 1, 1],
        [null, null, null, null, 1, null, null],
        [2, null, null, 2, null, 1, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
    ]) === 1), "Winner Diagonal Down Right fails on (row 0, col 3) to (row 3, col 5) player 1 win")
}
testWinnerDiagonalDownRight()