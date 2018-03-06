var postCount = 0
var url = 'https://lyl4c.github.io/INTERVENE-Public-Assets/News/Posts/'
var fileName = '-intervene'

//News Post Crawler; Returns # of posts found in url param
function loadNews(url, fileName, postCount) {
  xhttp.open('GET', url+(postCount+1)+fileName+'.html', true);
  xhttp.onreadystatechange = function() {
    if(xhttp.readyState == XMLHttpRequest.DONE) {
      if (xhttp.status) {
        statusType = Math.floor(xhttp.status/100);
        if(statusType == 2) {
          postCount++;
        } else if(statusType == 4) {
          console.log('Number of Posts = '+postCount);
          getNews(postCount);
          return;
        }
      }
      loadNews();
    }
  }
  xhttp.send();
}

//loadNews();

function getNews(postCount) {
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
  console.log('loaded news posts');
}