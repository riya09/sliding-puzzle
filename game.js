const gameBoard = document.querySelector('#gameBoard');
let blocks = document.querySelectorAll('.blocks');
let ids = [1, 2, 3, 4, 5, 6, 7, 8, 9];

shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i); //creates a random number between 0 and i
        let tmp = a[j]; //temporary variable for swapping two elements
        a[j] = a[i];
        a[i] = tmp;
    }
}
startGame = () => {
    shuffle(ids);
    assign(ids, blocks);
}
blocks.forEach(function (curr, index) {
    curr.addEventListener('click', function () {
        if (curr.id != 9) check(curr.id, index);
    })
})
check = (curr, index) => {
    let left = 0,
        right = 0,
        top = 0,
        bottom = 0;
    if (index - 1 >= 0) left = blocks[index - 1].id;
    if (index + 1 < 9) right = blocks[index + 1].id;
    if (index - 3 >= 0) top = blocks[index - 3].id;
    if (index + 3 < 9) bottom = blocks[index + 3].id;
    let edge = (index + 1) % 3;
    if (left == 9 && edge != 1) {
        swap(index, index - 1, ids);
    } else if (right == 9 && edge != 0) {
        swap(index, index + 1, ids);
    } else if (top == 9) {
        swap(index, index - 3, ids);
    } else if (bottom == 9) {
        swap(index, index + 3, ids);
    }
    assign(ids, blocks);
}
swap = (a, b, arr) => {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}
assign = (ids, blocks) => {
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].id = ids[i];
        blocks[i].innerHTML = ids[i];
        if (ids[i] == 9) { //for the nth block we set it to white color to indicate a blank space
            blocks[i].style.backgroundColor = 'white';
            blocks[i].innerHTML = "&nbsp";
        } else {
            blocks[i].style.backgroundColor = '#1b2936';
        }
    }
    checkwin(ids);
}
checkwin = (arr) => {
    let count = 0;
    for (let i = 1; i <= 9; i++) {
        if (arr[i - 1] == i) count++;
        else break;
    }
    if (count == 9) {
        alert('You won.Thanks for playing!');
    }
}
startGame();
