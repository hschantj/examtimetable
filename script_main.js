fetch('web_header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data
    })
    .catch(error => console.error('Error laoding header', error))

fetch('web_examvenue.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('content').innerHTML = data
        const script = document.createElement('script');
        script.src = './script_examvenue.js';
        document.body.appendChild(script);
    })
    .catch(error => console.error('Error laoding content', error))
