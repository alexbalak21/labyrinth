const table = document.querySelector("table")

const H = 10
const L = 10
const GRID = create_grid(H, L)

const POSTION = { y: 0, x: 0 }
let MOVES = []
function create_grid(h, l) {
    const grid = new Array(h)
    for (let i = 0; i < h; i++) {
        grid[i] = new Array(l)
        grid[i].fill(false, 0, l - 1)
    }
    return grid
}

GRID[POSTION.y][POSTION.x] = true

const display_grid = create_table(10, 10)

display_grid[POSTION.y][POSTION.x].style.backgroundColor = "white"

function create_table(h, w) {
    const display_table = Array(h)
    for (let i = 0; i < h; i++) {
        const tr = document.createElement("tr")
        display_table[i] = new Array(w)
        for (let j = 0; j < w; j++) {
            const td = document.createElement("td")
            tr.appendChild(td)
            display_table[i][j] = td
        }
        table.appendChild(tr)
    }
    return display_table
}

function check_up(y, x) {
    if (y < 1) return false
    if (GRID[y - 1][x]) return false
    else return true
}

function check_down(y, x) {
    if (y >= H - 1) return false
    if (GRID[y + 1][x]) return false
    else return true
}

function check_left(y, x) {
    if (x < 1) return false
    if (GRID[y][x - 1]) return false
    else return true
}

function check_right(y, x) {
    if (x >= L - 1) return false
    if (GRID[y][x + 1]) return false
    else return true
}

function check_directions(y, x) {
    const directions = []
    if (check_up(y, x)) directions.push("u")
    if (check_down(y, x)) directions.push("d")
    if (check_left(y, x)) directions.push("l")
    if (check_right(y, x)) directions.push("r")
    console.log(POSTION, directions)
    return directions
}

function rand_from_arr(arr) {
    if (arr.length < 1) return ""
    i = Math.floor(Math.random() * arr.length)
    console.log("Choosen dirction", arr[i])
    return arr[i]
}

function move(y = POSTION.y, x = POSTION.x) {
    const dirs = check_directions(y, x)
    const d = rand_from_arr(dirs)
    switch (d) {
        case "u":
            remove_top(y, x)
            POSTION.y--
            GRID[POSTION.y][POSTION.x] = true

            display_grid[y][x].innerText = ""
            display_grid[y - 1][x].style.backgroundColor = "white"
            return true
            break
        case "d":
            remove_bottom(y, x)
            POSTION.y++
            GRID[POSTION.y][POSTION.x] = true

            display_grid[y][x].innerText = ""
            display_grid[y + 1][x].style.backgroundColor = "white"
            return true
            break
        case "l":
            remove_left(y, x)
            POSTION.x--
            GRID[POSTION.y][POSTION.x] = true

            display_grid[y][x].innerText = ""
            display_grid[y][x - 1].style.backgroundColor = "white"
            return true
            break
        case "r":
            remove_right(y, x)
            POSTION.x++
            GRID[POSTION.y][POSTION.x] = true

            display_grid[y][x].innerText = ""
            display_grid[y][x + 1].style.backgroundColor = "white"
            return true
            break
        default:
            return false
    }
}

function remove_top(y, x) {
    display_grid[y - 1][x].style.borderBottom = "none"
}

function remove_bottom(y, x) {
    display_grid[y][x].style.borderBottom = "none"
}

function remove_left(y, x) {
    display_grid[y][x - 1].style.borderRight = "none"
}

function remove_right(y, x) {
    display_grid[y][x].style.borderRight = "none"
}

let moved = false
let m = 0
do {
    if (move()) {
        console.log("LOGING POSTION", POSTION)
        MOVES.push({ y: POSTION.y, x: POSTION.x })
        m++
        console.log(MOVES)
        console.log("Move ", m)
        console.log("POSTION", POSTION)
    } else {
        m--
        console.log("BACKTRACK TO MOVE ", m)
        POSTION.y = MOVES[m].y
        POSTION.x = MOVES[m].x
    }
} while (m > 0)
