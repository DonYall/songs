function search() {
    const input = document.getElementById('search-box').value;
    getData(result => {
        const lines = result.split('\n');
        let videos = [];
        for (let i = 0; i < lines.length; i++) {
            const cols = lines[i].split(',');
            if (cols[0] === input) {
                const values = cols[1].replace(/""/g, '"').replace(/[\[\]']/g, '').split(', ');
                for (let j = 0; j < values.length; j++) {
                    if (values[j].includes('youtube.com')) {
                        const videoId = values[j].split('v=')[1];
                        videos.push(videoId);
                    }
                }
            }
        }

        if (videos.length > 0) {
            const videoIds = videos.join(',');
            const embedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoIds}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            document.getElementById('results').innerHTML = embedCode;
        } else {
            document.getElementById('results').innerHTML = '<p>No results found.</p>';
        }
    });
}
