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
                const values = cols[1].replace(/""/g, '"').replace(/[\[\]']/g, '').split(', ');

                let hasYouTubeLinks = false;
                for (let j = 0; j < values.length; j++) {
                    if (values[j].includes('youtube.com')) {
                        hasYouTubeLinks = true;
                        break;
                    }
                }

                output += '<ul>';
                for (let j = 0; j < values.length; j++) {
                    if (values[j].includes('youtube.com')) {
                        const videoId = values[j].split('v=')[1];
                        output += `<li><iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></li>`;
                    } else {
                        output += `<li>${hasYouTubeLinks ? '<a href="' + values[j] + '" target="_blank">' + values[j] + '</a>' : values[j]}</li>`;
                    }
                }
                output += '</ul>';
            }
        }
        document.getElementById('results').innerHTML = output || '<p>No results found.</p>';
    });
}
