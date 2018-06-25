module.exports = {
  url: 'https://www.onet.pl',
  text: () => [...document.querySelectorAll('#mainPageBody > div.container-content-right.sideBar.sideBar2 > div:nth-child(1) > article > section:nth-child(1) > div.boxContent > ul >li')].map(elem => elem.innerText.replace(/\n|TYLKO W ONECIE|PILNE|\'/g, '').trim()),
  link: () => [...document.querySelectorAll('#mainPageBody > div.container-content-right.sideBar.sideBar2 > div:nth-child(1) > article > section:nth-child(1) > div.boxContent > ul >li')].map(elem => elem.innerHTML.replace(/"|'|class=*|/g, '')),
  article: () => [...document.querySelectorAll('#detail > .hyphenate')].map(elem => elem.innerText)
};
