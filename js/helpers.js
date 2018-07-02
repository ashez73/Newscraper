module.exports = {
  combineObj: function (...args) {
  /* combine arrays into JSON object */
    function Entry (title, link, objwrap) {
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
    return JSON.stringify(wrapper);
  }
};
