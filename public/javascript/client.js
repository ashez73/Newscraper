/* eslint-disable */

console.log('Hello');
const url = 'http://localhost:3000/data/';
const urlLink = 'http://localhost:3000/link/';
const responseContainer = document.querySelector('ul');
let html_content = '';
let html_content2 = '';

fetch(('http://localhost:3000/data/'), {
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
  //console.log(data);
  //let htmlContent = '';
  let mydata = data;



  //if (mydata) {
  html_content = data.newsFeed.map(article => `
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
  //console.log(arrayLen);
  for (let l = 0; l < arrayLen; l++) {
    document.querySelectorAll(".article-list")[l].addEventListener("click", function ohnoes() {
      controller.caller = l;
      let elem = this.querySelector('.article-content');
      if (elem) {
        if (window.getComputedStyle(elem, null).getPropertyValue("display") === 'none') {
          view.hide();
          elem.style.display = "inline-block";
        } else {
         view.hide();
        }
        console.log('ma');
      } else {
        //hide current article if any
        view.hide();
        controller.getArticle(this.dataset.link);
      }
    });
  }
}




let model = {
  article_content: '',
  articleSelector: ''
}

let view = {
  triggerLink: '',
  renderArticle: function () {
    triggerLink = controller.callerContainer;
    triggerLink.insertAdjacentHTML('beforeend', model.article_content);
  },
  adjustTriggerColors: function () {
    triggerLink.style.backgroundColor = "#56c8d8";
    triggerLink.style.color = "white";

  },
  //hide rather than remove for caching
  hideArticle: function () {
    if (typeof triggerLink !== 'undefined') {
      triggerLink.querySelector('.article-content').style.display = "none";
    }
  },
  hide: function () {
    for (article of document.querySelectorAll("ul.article-content")) {
      console.log(article);
      article.style.display = "none";
    }
  }
}


let controller = {
  caller: 0,
  callerContainer: '',
  getArticle: function (myData) {
    fetch(`${urlLink}?link=${myData}`)
      .then(response => response.json())
      //.then(view.hideArticle)
      .then(this.addArticle)
      .then(view.renderArticle)
      .then(view.adjustTriggerColors);
  },
  addArticle: data => {
    model.article_content = data.articleEntry.map(articles => `
    <p class = "article-part">${articles.article}</p>`).join('');
    model.article_content = "<ul class ='article-content'>" + model.article_content + "</ul>";
    controller.callerContainer = document.querySelectorAll(".article-list")[controller.caller];
    //console.log ("caller: "+ controller.caller + "cont: " + model.article_content);
  }
}