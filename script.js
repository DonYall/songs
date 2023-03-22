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
          output += cols[1] + '<br>';
        }
      }
      document.getElementById('results').innerHTML = output || 'No results found.';
    }
  };
  xhr.open('GET', 'data.csv');
  xhr.send();
}
