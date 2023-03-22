// Get a reference to the search box
const searchBox = document.getElementById('search-box');

// Add an event listener to the search box
searchBox.addEventListener('input', search);

// Define the search function
function search() {
    // Get the search term from the search box
    const searchTerm = searchBox.value.trim().toLowerCase();

    // Do the search and display the results
    const results = searchSpreadsheet(searchTerm);
    displayResults(results);
}

// Define the searchSpreadsheet function
function searchSpreadsheet(searchTerm) {
    // Get a reference to the spreadsheet data
    const data = getData();

    // Filter the data based on the search term
    const filteredData = data.filter(row => row[0].toLowerCase().includes(searchTerm));

    // Map the filtered data to an array of objects
    const mappedData = filteredData.map(row => {
        const values = row[1].replace(/[\[\]']+/g, '').split(', ');
        const videos = values.filter(value => value.includes('youtube.com')).map(value => {
            const videoId = value.split('v=')[1];
            return {
                type: 'video',
                url: `https://www.youtube.com/embed/${videoId}`,
                title: `Video - ${row[0]}`,
                description: `Video result for search term "${searchTerm}"`
            }
        });
        const otherValues = values.filter(value => !value.includes('youtube.com')).map(value => {
            return {
                type: 'text',
                content: value
            }
        });
        const items = [...videos, ...otherValues];
        return {
            key: row[0],
            items: items
        }
    });

    // Return the mapped data
    return mappedData;
}

// Define the displayResults function
function displayResults(results) {
    // Get a reference to the results container
    const resultsContainer = document.getElementById('results');

    // Clear the results container
    resultsContainer.innerHTML = '';

    // If there are no results, display a message
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    // Loop through each result and display it
    results.forEach(result => {
        // Create a container for the result
        const resultContainer = document.createElement('div');
        resultContainer.classList.add('result');

        // Create a heading for the result
        const heading = document.createElement('h2');
        heading.textContent = result.key;
        resultContainer.appendChild(heading);

        // Create a container for the items
        const itemsContainer = document.createElement('div');
        itemsContainer.classList.add('items');
        resultContainer.appendChild(itemsContainer);

        // Loop through each item and display it
        result.items.forEach(item => {
            if (item.type === 'video') {
                // Create an iframe for the video
                const iframe = document.createElement('iframe');
                iframe.setAttribute('src', item.url);
                iframe.setAttribute('width', '560');
                iframe.setAttribute('height', '315');
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                iframe.setAttribute('allowfullscreen', '');
                itemsContainer.appendChild(iframe);
            } else if (item.type === 'text') {
                // Create a paragraph for the text
                const paragraph = document.createElement('p');
                paragraph.textContent = item.content;
                itemsContainer.appendChild(paragraph);
            }
        });
    });

    function getData(callback) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const allText = xhr.responseText;
            const lines = allText.split('\n');
            const data = {};
            for (let i = 0; i < lines.length; i++) {
              const values = lines[i].split(',');
              const key = values[0];
              const val = values[1].replace(/[\[\]]/g, '').split(', ');
              data[key] = val;
            }
            callback(data);
          }
        };
        xhr.open('GET', 'data.csv');
        xhr.send();
      }      

    // Attach event listener to the search button
    searchButton.addEventListener('click', search);

    // Attach event listener to the enter key
    searchBox.addEventListener('keydown', event => {
        if (event.keyCode === 13) {
            event.preventDefault();
            searchButton.click();
        }
    });
};
