/* eslint-disable */

console.log('Hello!');
const url = 'http://localhost:3000/data/';
const urlLink = 'http://localhost:3000/link/';
const responseContainer = document.querySelector('ul');
let html_content = '';
let html_content2 = ''; 
/*
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

function addData(data) {
  //console.log(data);
  //let htmlContent = '';
  let mydata = data;



  //if (mydata) {
  html_content = data.newsFeed.map(article => `
  <li class = 'article-list standard' data-link= "${article.link}">${article.title}</li>`).join('');

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

function enableListenerBack(li) {
li.addEventListener("click", listenClick)
};

let listenClick = function (myEvent) {
  
  console.log (myEvent);
  let fie = document.querySelectorAll(".article-list")[myEvent];
  console.log(fie);
  let elem = fie.querySelector('.article-content');
  //controller.caller = this;
  //controller.caller.num = lis;
  //view.hide();
  //console.log(controller.caller.num);
  //hide any visible article -this is how they are cached
  if (elem) {
    if (getComputedStyle(elem, null).display === 'none') {
      view.hide();
      elem.style.display = "inline-block";
      view.paintActive(fie);
    } else {
      elem.style.display = "none";
      view.paintVisited(fie)
    }
    controller.switchState();
    //view.paintVisited(elem);
  } else {
    fie.insertAdjacentHTML('beforeend', '<div class ="loader"><div>');
    fie.removeEventListener("click", listenClick);

    controller.getArticle(fie.dataset.link,fie);
    view.hide();

    //model.activeArticle.style.display = "none";
  }
}


function listenersOn(arrayLen) {
  console.log(this);
  for (let lis = 0; lis < arrayLen; lis++) {
    document.querySelectorAll(".article-list")[lis].addEventListener("click", listenClick(lis),false);
  };
}



let model = {
  article_content: '',
  articleSelector: '',
  activeArticle: {}
}

let view = {
  triggerLink: '',
  renderArticle: function () {
    triggerLink = controller.callerContainer;
    triggerLink.insertAdjacentHTML('beforeend', model.article_content);
    //view.adjustTriggerColors();
    view.paintActive(triggerLink);
    controller.removePlaceholder(triggerLink);
  },
  adjustTriggerColors: function () {
    //triggerLink.style.backgroundColor = "#00aeba";
    //triggerLink.style.color = "white";
    triggerLink.classList.add('active');
    //triggerLink.classList.add('active');
  },
  //hide rather than remove for caching
  hideArticle: function () {
    if (typeof triggerLink !== 'undefined') {
      triggerLink.querySelector('.article-content').style.display = "none";
    }
  },
  hide: function () {
    for (article of document.querySelectorAll("ul.article-content")) {
      //console.log(article);
      article.style.display = "none";
      this.paintVisited(article.parentNode);

    }
  },
  paintActive: function (myNode) {
    console.log();
   // if (typeof myNode.classList !== 'undefined'){
    myNode.classList.add('active');
    myNode.classList.remove('standard');
    myNode.classList.remove('visited');
    //}
  },
  paintVisited: function (myNode) {
   // if (typeof myNode.classList !== 'undefined'){
    myNode.classList.add('visited');
    myNode.classList.remove('standard');
    myNode.classList.remove('active');
    //}
  }
}
let controller = {
  caller: {
    state:0,
    num: 0
  },
  switchState: function () {
    this.caller.state === 0 ? this.caller.state = 1 : this.caller.state = 0;
  },
  callerContainer: '',
  getArticle: function (myData,myParent) {
    fetch(`${urlLink}?link=${myData}`)
      .then(response => response.json())
      //.then(view.hideArticle)
      .then(this.addArticle)
      .then(view.renderArticle)
      .then (enableListenerBack(myParent));
      //.then (this.removePlaceholder(myParent));
  },

  removePlaceholder: function(myParent){
    console.log(myParent);
    myParent.removeChild(myParent.querySelector('.loader'));
  },
  addArticle: data => {
    model.article_content = data.articleEntry.map(articles => `
    <p class = "article-part">${articles.article}</p>`).join('');
    model.article_content = "<ul class ='article-content'>" + model.article_content + "</ul>";
    controller.callerContainer = document.querySelectorAll(".article-list")[controller.caller.num];
    controller.caller.state = 1;
    //console.log ("caller: "+ controller.caller + "cont: " + model.article_content);
    //return controller.callerContainer;
  }
}