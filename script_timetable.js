var CSVdata = []

async function fetchCSV(url) {
    const response = await fetch(url)
    const text = await response.text()
    return text
}

function fillTable(data) {
    const tableBody = document.querySelector('#exam-timetable tbody')
    const schedule = {}

    data.forEach(entry => {
        const key = `${entry.date}-${entry.time}`
        if (!schedule[key]) {
            schedule[key] = {
                date: entry.date,
                time: entry.time,
                J1: '',
                J2: '',
                J3: '',
                S1S: '',
                S1C: '',
                S2S: '',
                S2C: '',
                S3S: '',
                S3C: ''
            }
        }
        schedule[key][entry.grade] = `${entry.subject}<br>${entry.duration}'`
    });

    Object.values(schedule).forEach(row => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td style="white-space:nowrap">${convertDate(row.date)}</td>
            <td>${convertTime(row.time)}</td>
            <td class="class_tab">${row.J1}</td>
            <td class="class_tab">${row.J2}</td>
            <td class="class_tab">${row.J3}</td>
            <td class="class_tab">${row.S1S}</td>
            <td class="class_tab">${row.S1C}</td>
            <td class="class_tab">${row.S2S}</td>
            <td class="class_tab">${row.S2C}</td>
            <td class="class_tab">${row.S3S}</td>
            <td class="class_tab">${row.S3C}</td>
        `
        tableBody.appendChild(tr)
    })
}

function parseCSV(csv) {
    const rows = csv.trim().split('\n')
    const data = rows.slice(1).map(row => {
        const values = row.split(',')
        return {
            date: values[0],
            time: values[1],
            grade: values[2],
            subject: values[3],
            duration: values[4]
        }
    })
    return data
}

function convertDate(data) {
    var tempdate = data.trim().split('/')
    date = `${tempdate[0].padStart(2, '0')}-${tempdate[1].padStart(2, '0')}-${tempdate[2].padStart(4, '0')}`
    return date
}

function convertTime(data) {
    var temptime = data.trim().split(':')
    time = `${temptime[0].padStart(2, '0')}:${temptime[1].padStart(2, '0')}`
    return time
}

async function loadCSVandFillTable() {
    const csv = await fetchCSV('CSV_timetable.csv')
    const data = parseCSV(csv)
    fillTable(data)
}
document.getElementById('back-to-top').addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})

loadCSVandFillTable()