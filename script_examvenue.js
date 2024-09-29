var headerRow = []
var originalData = []

function loadCSV() {
    fetch('CSV_examvenue.csv')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network Error: ' + response.statusText)
            }
            return response.text()
        })
        .then(data => {
            displayCSV(data)
        })
        .catch(error => {
            console.error('读取 CSV 文件时出错', error)
        })
}

function displayCSV(data) {
    const table = document.getElementById('csv-table')
    table.innerHTML = ''

    const rows = data.split('\n').filter(row => row.trim() !== '')
    originalData = rows.slice(1)
    headerRow = rows[0].split(',')

    const headerHTML = headerRow.map(header => `<th>${header.trim()}</th>`).join('')
    table.insertAdjacentHTML('beforeend', `<thead><tr>${headerHTML}</tr></thead>`)

    updateTable(originalData)
}

function updateTable(data) {
    const table = document.getElementById('csv-table')
    const bodyHTML = data.map(row => {
        const cells = row.split(',')
        return `<tr>${cells.map(cell => `<td>${cell.trim()}</td>`).join('')}</tr>`
    }).join('')
    table.insertAdjacentHTML('beforeend', `<tbody>${bodyHTML}</tbody>`)
}

document.getElementById('search-input').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase()
    const filteredData = originalData.filter(row => {
        const cells = row.split(',')
        // return cells.some(cell => cell.toLowerCase().includes(searchTerm))
        return (cells[0] && cells[0].toLowerCase().includes(searchTerm)) || (cells[3] && cells[3].toLowerCase().includes(searchTerm))
    })

    const table = document.getElementById('csv-table')
    table.innerHTML = ''

    const headerHTML = headerRow.map(header => `<th>${header.trim()}</th>`).join('')
    table.insertAdjacentHTML('beforeend', `<thead><tr>${headerHTML}</tr></thead>`)

    updateTable(filteredData)
});

document.getElementById('back-to-top').addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})
loadCSV()