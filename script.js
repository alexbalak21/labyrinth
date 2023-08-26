const table = document.querySelector("table")

const grid = new Array(10)
for (let i = 0; i < 9; i++) grid[i] = new Array(10)

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

const display_grid = create_table(10, 10)
