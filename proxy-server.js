const http = require('https');
const fs = require('fs');

const url = 'https://query1.finance.yahoo.com/v8/finance/chart/AAPL?interval=1d';
const headers = new Headers({
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
  'Accept-Encoding': 'none',
  'Accept-Language': 'en-US,en;q=0.8',
  'Connection': 'keep-alive'
});

var returnData;

fetch(url, {
  method: 'GET',
  headers: headers,
  mode: 'no-cors'
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.text(); 
})
.then(data => {
  //console.log(data['chart']['result']);
  returnData = data;
})
.catch(error => {
  console.error('There was a problem with your fetch operation:', error);
});

const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
};

const server = http.createServer(options, (req, res) => {
res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  console.log(`${req.method} ${req.url}`);

  //res.end(JSON.stringify(returnData));
  res.end(returnData);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});