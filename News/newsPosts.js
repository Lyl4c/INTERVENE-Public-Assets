//News Post Script made by Lylac_SYS
//Assistance provided by: sickhippie, Miroware
//This can load News Posts from an external source if set up correctly.
var xhttp = new XMLHttpRequest();
var Lylac = {
  //Initial setup
  //STRING selector = target div | The parent div of where you want to put your posts.
  //NUMBER selectorChild = child div of target div | Where you actually want to place your posts.
  setupNews: function(selector,selectorChild=0) {
    let temp = document.createElement('div');
    temp.id = 'adventureNews';
    document.querySelector(selector).insertBefore(temp,document.querySelector(selector).childNodes[selectorChild]);
  },
  
  //News Post Crawler; Returns # of posts found in url param
  //STRING url = web address | external source of your News Posts.
  //STRING fileName = name of the file | example: -intervene | <- use this instead of the full name: 71-intervene.html.
  //                                     The file MUST be an HTML file.
  //NUMBER postCount = starting number of the crawler code | can be used to skip post entries.
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
            //Recursion loop stops here.
          }
        }
        //recursion loop
        Lylac.loadNews(url,fileName,postCount);
      }
    }
    xhttp.send();
  },
  
  //parameters are provided by loadNews()
  getNews: function(url,fileName,postCount) {
    for (let i=5;i>=1;i--) {
      //News Setup
      let temp = document.createElement('iframe');
      temp.className = 'newsPost';
      temp.style = 'border:none;';
      temp.scrolling = 'no';
      temp.height = '0';
      
      let iframe = document.querySelector('#adventureNews').insertBefore(temp,document.querySelector('#adventureNews').childNodes[0]);
      
      //sets all iframes under #adventureNews to their individual content heights when loaded.
      iframe.onload = function() {
        if (!RegExp('Page not found').test(this.contentDocument.title)) {
          this.height = this.contentWindow.document.body.scrollHeight;
        }
      }
      //grabs text files from parameters
      iframe.src = url+(postCount-i+1)+fileName+'.html';
    }
  }
}