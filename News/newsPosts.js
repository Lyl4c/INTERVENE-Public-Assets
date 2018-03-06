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
var iFrame = document.querySelectorAll('.newsPost');

function getNews(postCount) {
  //grabs text files from var url in loadNews()
  for (let i=1;i<=5;i++) {
    //console.log(url+i+fileName+'.html');
    console.log('1st i = '+i);
    //console.log('postCount = '+(postCount-i+1));
    insertDiv('#infobox #news',1,setDivAtt({'div':'iframe','class':'newsPost','style':'border:none;','scrolling':'no','height':'0','src':url+(postCount-i+1)+fileName+'.html'}));
  }
  console.log(iFrame);
  /*
  //sets all iframes under #news to their individual content heights.
  window.addEventListener('load', function(e) {
    console.log('retrieving news');
    var iFrame = document.querySelectorAll('.newsPost');
    for(let i=0;i<iFrame.length;i++) {
      console.log(i+' = '+(!RegExp('Page not found').test(iFrame[i].contentDocument.title)));
      console.log(i+' = '+iFrame[i].contentWindow.document.body.scrollHeight);
      if (!RegExp('Page not found').test(iFrame[i].contentDocument.title)) {
        iFrame[i].height = iFrame[i].contentWindow.document.body.scrollHeight;
      }
    }
  });
  */
  console.log('loaded news posts');
}