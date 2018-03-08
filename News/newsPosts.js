var Lylac = {
  //news setup
  setupNews: function(selector,selectorChild) {
    let temp = new document.createElement('div');
    temp.id = '#adventureNews';
    console.log(temp);
    document.querySelectorAll(selector).insertBefore(temp,document.querySelectorAll(selector).childeNodes[selectorChild]);
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
      //grabs text files from url param
      
      //insertDiv('#infobox #adventureNews',i,setDivAtt({'div':'iframe','class':'newsPost','style':'border:none;','scrolling':'no','height':'0'}));
      let temp =  new document.createElement('iframe');
      temp.class = 'newsPost';
      temp.style = 'border:none;';
      temp.scrolling = 'no';
      temp.height = '0';
      console.log(temp);
      
      let iframe = document.querySelectorAll('#adventureNews').insertBefore(temp,document.querySelectorAll('#adventureNews').childeNodes[0]);
      console.log(iframe);
      
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