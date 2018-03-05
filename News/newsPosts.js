var postCount = 0
var url = 'https://lyl4c.github.io/INTERVENE-Public-Assets/News/Posts/'
var fileName = '-intervene'
console.log('import successful');

function loadNews() {
  xhttp.open('GET', url+(postCount+1)+fileName+'.html', true);
  xhttp.onreadystatechange = function() {
    if(xhttp.readyState == XMLHttpRequest.DONE) {
      if (xhttp.status) {
        statusType = Math.floor(xhttp.status/100);
        if(statusType == 2) {
          postCount++;
        } else if(statusType == 4) {
          console.log('Number of Posts = '+postCount);
          insertNews(postCount);
          return;
        }
      }
      loadNews();
    }
  }
  xhttp.send();
}

//loadNews();

function insertNews(postCount) {
  //grabs text files from var url in loadNews()
  for (var i=(postCount-4);i<=(postCount);i++) {
    insertDiv('#infobox #news',1,setDivAtt({'div':'iframe','class':'newsPost','style':'border:none;','scrolling':'no','height':'0','src':url+i+'-intervene.html'}));
  }
  fixNews();
}

function fixNews() {
  //sets all iframes under #news to their individual content heights.
  var iFrame = document.querySelectorAll('.newsPost');
  console.log(iFrame);
  for(var i=0;i<iFrame.length;i++) {
    if (!RegExp('Page not found').test(iFrame[i].contentDocument.title)) {
      console.log(i+' = '+iFrame[i].contentWindow.document.body.scrollHeight);
      iFrame[i].height = iFrame[i].contentWindow.document.body.scrollHeight;
    }
  }
}