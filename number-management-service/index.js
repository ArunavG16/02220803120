// The required Node.js modules are imported, including http, url, and axios.
const http = require('http');
const url = require('url');
const axios = require('axios');

// The server is set to listen on port 8008.
const port = 8008; 

// When a request is received, the server's request handler function is executed.
const server = http.createServer(async (req, res) => {
  // The handler parses the query parameters using the url.parse method and extracts the "url" parameter(s).
  const queryData = url.parse(req.url, true).query;
  const requestedUrls = Array.isArray(queryData.url) ? queryData.url : [queryData.url];
  // If there are no "url" parameters provided, it returns a 400 error response with a message asking for valid "url" parameters.
  if (requestedUrls.length === 0) {
    res.statusCode = 400;
    return res.end('Please provide at least one valid "url" query parameter.');
  }

  try {
    // If there are "url" parameters provided, the server makes parallel HTTP GET requests to each URL using axios.get.
    const responses = await Promise.all(requestedUrls.map(url => axios.get(url)));
    const uniqueNumbers = new Set();
    // The responses from each URL are processed to extract the numbers. The numbers are added to a Set, which ensures uniqueness.
    responses.forEach(response => {
      const numbers = response.data.numbers;
      numbers.forEach(num => uniqueNumbers.add(num));
    });
    // After processing all the responses, the unique numbers are converted back to an array 
    // and sorted in ascending order using the Array.from(uniqueNumbers).sort() method.
    const sortedNumbers = Array.from(uniqueNumbers).sort((a, b) => a - b);
    const response = {
      "numbers": sortedNumbers
    };
    // The server constructs a JSON response containing the sorted numbers and sends it back to the client.
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
  } 
  // If there's an error during the HTTP requests or processing, the server catches the error, logs it, and returns an error response with an appropriate status code.
    catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response Status:', error.response.status);
    }
    res.statusCode = error.response ? error.response.status : 500;
    res.end('Error fetching data from the specified URL(s).');
  }
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
