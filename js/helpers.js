module.exports = {
  combineObj: function (...args) {
    /* combine arrays into JSON object */
    function Entry (title, link) {
      this.title = title;
      this.link = link;
    };
    let master = [];
    let wrapper = {};
    for (let x = 0; x < args[1].length; x++) {
      let entry = new Entry(args[0][x], args[1][x]);
      master.push(entry);
    }
    wrapper.newsFeed = master;
    return wrapper;
    // or return JSON.stringify(wrapper);
  },
  objectifyArticle: function (article) {
    let master = [];
    let wrapper = {};
    for (let x = 0; x < article.length; x++) {
      let entry = {
        article: article[x]
      };
      master.push(entry);
    }
    wrapper.articleEntry = master;
    return JSON.stringify(wrapper);
  },
  formatDate: function (result) {
    let month = result.time.getMonth() + 1;
    month = ('0' + month.toString()).slice(-2);
    let day = ('0' + result.time.getDate().toString()).slice(-2);
    let hour = ('0' + result.time.getHours().toString()).slice(-2);
    let minute = ('0' + result.time.getMinutes().toString()).slice(-2);
    let year = result.time.getFullYear();
    return `${day}.${month}.${year}  ${hour}:${minute}`;
  }
};
