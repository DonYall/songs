function getData(callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const result = xhr.responseText;
            callback(result);
        }
    };
    xhr.open('GET', 'data.csv');
    xhr.send();
}

function search() {
    const input = document.getElementById('search-box').value;
    getData(result => {
        const lines = result.split('\n');
        let output = '';
        for (let i = 0; i < lines.length; i++) {
            const cols = lines[i].split(',');
            if (cols[0] === input) {
                const values = cols[1].split('|');
                output += '<ul>';
                for (let j = 0; j < values.length; j++) {
                    const videoLink = values[j].trim();
                    if (videoLink.includes('youtube.com')) {
                        const videoId = videoLink.split('v=')[1];
                        output += `<li><a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">${videoLink}</a></li>`;
                    } else {
                        output += `<li>${videoLink}</li>`;
                    }
                }
                output += '</ul>';
            }
        }
        document.getElementById('results').innerHTML = output || '<p>No results found.</p>';
    });
}
