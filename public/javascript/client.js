/* eslint-disable */

console.log('Hello');
const url = 'http://localhost:3000/data/';
const responseContainer = document.querySelector('ul');
let html_content ='';

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
  console.log ('ok');
  //let htmlContent = '';
  let mydata = data;
  console.log (data);
  console.log(data.newsFeed[0]);

  //for (let x =0; x < data.newsFeed.length; x++)


  //if (mydata) {
      htmlContent = data.newsFeed.map(article=>`
      <li class = 'article-list'>${article.title}</li>`
      ).join('');
      
 // } else {
     // htmlContent = 'Unfortunately, no image was returned for your search.';
 // }
responseContainer.insertAdjacentHTML('beforeend', htmlContent);
for (let entry(value, index) of data.newsFeed)
{

}

      }
      function requestError(err, part) {
        console.log(err);
        //responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
    }
   
    function listenersOn () {
    document.querySelectorAll("li")[0].addEventListener("click", function ohnoes(){
      console.log('ok');
    }); 
    }
    