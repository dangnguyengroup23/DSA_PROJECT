var numSelected = null;
var errors = 0;

var board = [];
var solution = [];

window.onload = function () {
    generateBoard();
    setGame();
};

function generateBoard() {
   
    let base = [
        "123456789",
        "456789123",
        "789123456",
        "231645897",
        "564897231",
        "897231645",
        "312564978",
        "645978312",
        "978312564"
    ];


    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    function shuffleBoard(board) {
        let newBoard = board.slice();
        let rows = [0, 1, 2], middle = [3, 4, 5], bottom = [6, 7, 8];
        shuffleArray(rows); shuffleArray(middle); shuffleArray(bottom);
        let newOrder = [...rows, ...middle, ...bottom];
        return newOrder.map(r => newBoard[r]);
    }

    solution = shuffleBoard(base);


    board = solution.map(row => row.split(""));
    for (let i = 0; i < 40; i++) {
        let r = Math.floor(Math.random() * 9);
        let c = Math.floor(Math.random() * 9);
        board[r][c] = "-";
    }


    board = board.map(row => row.join(""));
}

function setGame() {

    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r + "-" + c;
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) tile.classList.add("horizontal-line");
            if (c == 2 || c == 5) tile.classList.add("vertical-line");

            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (!numSelected || this.innerText !== "") return;

    let [r, c] = this.id.split("-").map(Number);

    if (solution[r][c] == numSelected.id) {
        this.innerText = numSelected.id;
    } else {
        errors++;
        document.getElementById("errors").innerText = errors;
    }
}
function showSolution() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.getElementById(`${r}-${c}`);
            tile.innerText = solution[r][c];
            tile.classList.add("revealed");
        }
    }
}

function hideSolution() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.getElementById(`${r}-${c}`);
            // Only clear non-start tiles
            if (!tile.classList.contains("tile-start")) {
                tile.innerText = board[r][c] === "-" ? "" : board[r][c];
            }
            tile.classList.remove("revealed");
        }
    }
}
