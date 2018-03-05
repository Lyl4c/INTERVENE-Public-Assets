function loadNews(url,postCount=0,fileName) {
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
  //grabs text files from var url in loadNews()
  for (var i=(postCount-4);i<=(postCount);i++) {
    insertDiv('#infobox #news',1,setDivAtt({'div':'iframe','class':'newsPost','style':'border:none;','scrolling':'no','height':'0','src':offSite+'News/Posts/test'+i+'.html'}));
  }
  
  //sets all iframes under #news to their individual content heights.
  window.addEventListener('load', function(e) {
    var iFrame = document.querySelectorAll('.newsPost');
    for(var i=0;i<iFrame.length;i++) {
      if (!(RegExp('Page not found').test(iFrame[i].contentDocument.title))) {
        iFrame[i].height = iFrame[i].contentWindow.document.body.scrollHeight;
      }
    }
  });
}