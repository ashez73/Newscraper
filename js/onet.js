module.exports = {
  url: 'https://www.onet.pl',
  text: () => [...document.querySelectorAll('#mainPageBody > div.container-content-right.sideBar.sideBar2 > div:nth-child(1) > article > section:nth-child(1) > div.boxContent > ul >li')].map(elem => elem.innerText.replace(/\n|TYLKO W ONECIE|PILNE|NA ŻYWO|'/g, '').trim()),
  link: () => [...document.querySelectorAll('#mainPageBody > div.container-content-right.sideBar.sideBar2 > div:nth-child(1) > article > section:nth-child(1) > div.boxContent > ul >li')].map(elem => elem.innerHTML.replace(/"|'|class=*|/g, '')),
  article: () => [...document.querySelectorAll('#detail > .hyphenate')].map(elem => elem.innerText),
  trimMe: array => {
    let newArray = [];
    for (let entry of array) {
      let start = entry.indexOf('http');
      let end = entry.indexOf('data', -1);
      newArray.push(entry.slice(start, end).trim());
    }
    return newArray;
  },
  shortenMe: array => {
    let index = array.indexOf("''");
    if (index !== -1 && array[index].length < 4) { array.splice(index, 1); }
    if (array.length > 16) { array.length = 16; }
  }
};
