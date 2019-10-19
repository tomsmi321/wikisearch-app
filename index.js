let form = document.querySelector('.searchForm');
form.addEventListener('submit', handleSubmit);

async function handleSubmit (event) {
    // prevent page from reloading when the form is submitted
    event.preventDefault();
    // get the value of the input field 
    let input = document.querySelector('.searchForm-input').value;
    // remove any whitespace from the input
    let searchQuery = input.trim();
    try {
        await fetchResults(searchQuery);
    } catch (err) {
        console.log(err);
    }
}

async function fetchResults(searchQuery) {
        let endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
        let response = await fetch(endpoint);
        let responseJson = await response.json();
        let results = responseJson["query"]["search"];
        displayResults(results); 
}

function displayResults(results) {
    // store the searcResults HTML element in a variable
    let searchResults = document.querySelector('.searchResults') 
    // ensure the innerHTML of searchResults el is empty
    searchResults.innerHTML = '';
    // iterate over the results 
    results.forEach(result => {
        let endpoint = encodeURI(`https://en.wikipedia.org/wiki/${result["title"]}`);
      
        searchResults.insertAdjacentHTML('beforeend',
        `<div class="resultItem">
          <h3 class="resultItem-title">
            <a href="${endpoint}" target="_blank" rel="noopener">${result.title}</a>
          </h3>
          <span class="resultItem-snippet">${result.snippet}</span><br>
          <a href="${endpoint}" class="resultItem-link" target="_blank" rel="noopener">${endpoint}</a>
        </div>`
      );
    })
}


