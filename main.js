const url = 'https://73.162.165.166:3000/';
fetch(url, {method: 'GET'})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  document.getElementById("demo").innerHTML = JSON.stringify(data['chart']['result']);
})
.catch(error => {
  console.error('There was a problem with your fetch operation:', error);
});
