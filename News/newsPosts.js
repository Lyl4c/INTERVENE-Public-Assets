var Lylac = {
  //news setup
  setupNews: function(selector,selectorChild) {
    let temp = document.createElement('div');
    temp.id = 'adventureNews';
    document.querySelector(selector).insertBefore(temp,document.querySelector(selector).childNodes[selectorChild]);
  },
  
  //News Post Crawler; Returns # of posts found in url param
  loadNews: function(url,fileName,postCount=0) {
    xhttp.open('GET', url+(postCount+1)+fileName+'.html', true);
    xhttp.onreadystatechange = function() {
      if(xhttp.readyState == XMLHttpRequest.DONE) {
        if (xhttp.status) {
          statusType = Math.floor(xhttp.status/100);
          if(statusType == 2) {
            postCount++;
          } else if (statusType == 4) {
            console.log('Number of Posts = '+postCount);
            Lylac.getNews(url,fileName,postCount);
            return;
          }
        }
        Lylac.loadNews(url,fileName,postCount);
      }
    }
    xhttp.send();
  },
  
  getNews: function(url,fileName,postCount) {
    for (let i=1;i<=5;i++) {
      let temp = document.createElement('iframe');
      temp.className = 'newsPost';
      temp.style = 'border:none;';
      temp.scrolling = 'no';
      temp.height = '0';
      
      let iframe = document.querySelector('#adventureNews').insertBefore(temp,document.querySelector('#adventureNews').childNodes[0]);
      
      //sets all iframes under #adventureNews to their individual content heights.
      iframe.onload = function() {
        if (!RegExp('Page not found').test(this.contentDocument.title)) {
          this.height = this.contentWindow.document.body.scrollHeight;
        }
      }
      //grabs text files from url param
      iframe.src = url+(postCount-i+1)+fileName+'.html';
    }
  }
}