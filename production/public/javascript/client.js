/* eslint-disable */
// TODO resolving errors
console.log('Hello!');
const urlLink = 'http://localhost:3000/link/';
const responseContainer = document.querySelector('ul');
const articleList = document.querySelectorAll(".article-list");
let htmlContent = '';

let model = {
  articleList: document.querySelectorAll(".article-list"),
  pending: false,
  current: false,
  toggleCurrent: function (caller) {
    if (this.current) {
      this.current === caller
        ? this.current = false
        : this.current = caller;
    } else {
      this.current = caller;
    }
  }
};
let view = {
  renderArticle: caller => {
    caller.insertAdjacentHTML('beforeend', htmlContent);
    view
      .adjustColors
      .check(caller);
    controller.removePlaceholder(caller);
    model.pending = false;
    model.current = caller;
  },
  adjustColors: {
    visited: caller => {
      caller
        .classList
        .add('visited');
      caller
        .classList
        .remove('active');
    },
    active: caller => {
      caller
        .classList
        .add('active');
      caller
        .classList
        .remove('visited');
    },
    activate: caller => {
      caller
        .classList
        .add('active');
      caller
        .classList
        .remove('standard');
    },
    check: function (caller) {
      if (caller.classList.contains('standard')) {
        this.activate(caller);
      } else if (caller.classList.contains('active')) {
        this.visited(caller);
      } else {
        this.active(caller);
      }
    }
  },
  toggleArticle: caller => {
    caller.style.display != "none"
      ? caller.style.display = "none"
      : caller.style.display = "block";
  },
  clearCurrent: caller => {
    if (model.current && model.current !== caller) {
      let articleDisplay = model
        .current
        .querySelector('.article-content');
      view.toggleArticle(articleDisplay);
      view
        .adjustColors
        .visited(model.current);
    }
  },
  composeText: function () {
    setTimeout(() => {
      this.displayLetters(
        'serverside node.js webscraper built with puppeteer',
        'h6',
        60
      );
    }, 3000);
    this.displayLetters('Scrape it!', 'h4', 160);
  },
  displayLetters: (text, elem, delay) => {
    let mySelector = document.getElementsByTagName(elem)[0];
    let splitText = text.split("");
    for (let letter = 0; letter < splitText.length; letter++) {
      setTimeout(() => {
        splitText[letter] !== " "
          ? mySelector.innerHTML += splitText[letter]
          : mySelector.innerHTML += "&nbsp;";
      }, delay * (letter + 1));
    };
    return;
  }
}
let controller = {
  init: function () {
    this.listenersOn();
    view.composeText();
  },
  listenersOn: () => {
    for (let article of articleList) {
      article.addEventListener("click", controller.listenClick);
    };
  },
  listenClick: function () {
    let innerElem = this.querySelector('.article-content');
    if (!model.pending) {
      if (innerElem) {
        if (model.current === false || model.current === this) {
          view.toggleArticle(innerElem);
          view
            .adjustColors
            .check(this);
          model.toggleCurrent(this);
        } else {
          view.clearCurrent(this);
          view.toggleArticle(innerElem);
          view
            .adjustColors
            .check(this);
          model.toggleCurrent(this);
        }
      } else {
        this.insertAdjacentHTML('beforeend', '<div class ="loader"><div>');
        model.pending = 'true';
        controller.getArticle(this);
        view.clearCurrent(this);
      }
    }
  },
  getArticle: function (caller) {
    fetch(`${urlLink}?link=${caller.dataset.link}`)
      .then(
        response => response.json()
      )
      .then(data => {
        this.addArticle(data);
        view.renderArticle(caller);
      })
  },
  addArticle: data => {
    htmlContent = data
      .articleEntry
      .map(articles => `
  <p class = 'article-part'>${articles.article}</p>`)
      .join('');
    htmlContent = `<ul class ='article-content'> ${htmlContent}</ul>`;
  },
  removePlaceholder: function (caller) {
    caller.removeChild(caller.querySelector('.loader'));
  }
};
controller.init();