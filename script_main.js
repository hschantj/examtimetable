fetch('web_header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data

    })
    .catch(error => console.error('Error Loading Content', error))


function loadContent(page) {
    fetch(page)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data
            loadScript(page)
        })
        .catch(error => console.error('Error Loading Content', error))
}

function loadScript(url) {
    let path = `script_${url.split('.')[0].split('_')[1]}.js`
    if (path) {
        const script = document.createElement('script')
        script.src = path
        document.body.appendChild(script)
    }
}