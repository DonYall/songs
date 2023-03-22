function search() {
  var input = document.getElementById("search-box").value;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var result = xhr.responseText;
      var lines = result.split('\n');
      var output = '';
      for (var i = 0; i < lines.length; i++) {
        var cols = lines[i].split(',');
        if (cols[0] === input) {
          var values = cols[1].replace(/[\[\]']+/g, '').split(', ');
          output += '<ul>';
          for (var j = 0; j < values.length; j++) {
            if (values[j].includes("youtube.com")) {
              var videoId = values[j].split('v=')[1];
              output += '<li><iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></li>';
            } else {
              output += '<li>' + values[j] + '</li>';
            }
          }
          output += '</ul>';
        }
      }
      document.getElementById('results').innerHTML = output || '<p>No results found.</p>';
    }
  };
  xhr.open('GET', 'data.csv');
  xhr.send();
}
