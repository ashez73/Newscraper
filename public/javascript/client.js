/* eslint-disable */

console.log('Hello');
const url = 'http://localhost:3000/data/';
const urlLink ='http://localhost:3000/link/';
const responseContainer = document.querySelector('ul');
let html_content = '';
let html_content2 = '';

fetch(('http://localhost:3000/data/'),
  {
    //body:JSON.stringify(data),
    headers: {
      Authorization: 'd136'
    }
  })
  .then(response => response.json())
  .then(addData)
  .then(listenersOn)
  .catch(err => requestError(err, 'data'));
/*
fetch(url,
  {
    headers: {
      Authorization: 'd136'
    }
  }).then(response => response.json())
  .then(addData)
  .catch(err => requestError(err, 'data'));
*/
function addData(data) {
  console.log('ok');
  //let htmlContent = '';
  let mydata = data;
  


  //if (mydata) {
  html_content = data.newsFeed.map(article=>`
  <li class = 'article-list' data-link= "${article.link}">${article.title}</li>`).join('');

  // } else {
  //html_content = 'Unfortunately, no image was returned for your search.';
  // }
  
  responseContainer.insertAdjacentHTML('beforeend', html_content);
  //console.log(data.newsFeed.length);
  let arrayLen = data.newsFeed.length;
  return arrayLen;

  //console.log(html_content2);

}
function requestError(err, part) {
  console.log(err);
  //responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
}

function listenersOn(arrayLen) {
  console.log(arrayLen);
  for (let l = 0; l < arrayLen; l++) {
    document.querySelectorAll("li")[l].addEventListener("click", function ohnoes() {
      controller.getText(this.dataset.link)
    });
  }
}
let controller = {
getText: function (myData) {
console.log(myData);
console.log(`${urlLink}?link=${myData}`);
fetch (`${urlLink}?link=${myData}`);
}
}