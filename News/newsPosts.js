window.Lylac = {
  //news setup
  //insertDiv('#info #infobox',1,setDivAtt({'div':'div','id':'news'}));
  setupNews: function(selector) {
    //document.querySelectorAll(selector).insertBefore(,document.querySelectorAll(selector).childeNodes[0]);
  }
  
  //News Post Crawler; Returns # of posts found in url param
  loadNews: function(url,fileName,postCount=0) {
    xhttp.open('GET', url+(postCount+1)+fileName+'.html', true);
    xhttp.onreadystatechange = function() {
      if(xhttp.readyState == XMLHttpRequest.DONE) {
        if (xhttp.status) {
          statusType = Math.floor(xhttp.status/100);
          if(statusType == 2) {
            postCount++;
          } else if(statusType == 4) {
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
      //grabs text files from url param
      
      let iframe = insertDiv('#infobox #news',i,setDivAtt({'div':'iframe','class':'newsPost','style':'border:none;','scrolling':'no','height':'0'}));
      
      //sets all iframes under #news to their individual content heights.
      iframe.onload = function() {
        if (!RegExp('Page not found').test(this.contentDocument.title)) {
          this.height = this.contentWindow.document.body.scrollHeight;
        }
      }
      iframe.src = url+(postCount-i+1)+fileName+'.html';
    }
  }
}