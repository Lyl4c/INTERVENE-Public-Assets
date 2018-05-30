/*  News Post Script made by Lylac_SYS                    #
 #  Assistance provided by: sickhippie, Miroware          #
 #  This can load News Posts from an external source.     #
 #  See https://mspfa.com/?s=24896&p=2 for the tutorial.  */

var NewsPosts = {
  //Initial setup
  //STRING selector = target div | The parent div of where you want to put your posts.
  //NUMBER selectorChild = child div of target div | Where you actually want to place your posts.
  setupNews: function (selector, selectorChild = 0) {
    let temp = document.createElement('div');
    temp.id = 'adventureNews';
    document.querySelector(selector).insertBefore(temp, document.querySelector(selector).childNodes[selectorChild]);
  },
  /*
  News Post Crawler; Returns # of posts found in dir param
  STRING dir = web address | external source of your News Posts.
  STRING fileName = name of the file | example: -intervene
  The file MUST be an HTML file.
  NUMBER latestPostID = How many news post there are. | This is used to find your latest posts

  How to NOT use the fileName param properly: 71-intervene.html <-- Don't do this.
  The above will turn into this: https://www.google.com/7171-intervene.html.html
  */
  loadNews: function (dir, fileName, latestPostID) {
    if (arguments.length != 3) {
      popError();
      console.error('[News Posts]:ERROR: loadNews requires 3 Parameters total!');
      return;
    }
    if (typeof arguments[0]!='string' || typeof arguments[1]!='string') {
      popError();
      console.error('[News Posts]:ERROR: No String Parameter found in first or second Argument of loadNews!');
      return;
    }
    if (typeof arguments[2]!='number') {
      popError();
      console.error('[News Posts]:ERROR: No Number Parameter found in third Argument of loadNews!');
      return;
    }
    console.log('[News Posts]: Loading latest news posts...');
    console.time('[News Posts]: Finished loading the latest posts in');
    console.log('[News Posts]: LatestPostID is currently: '+latestPostID);
    for (let i = 1; i <= 5; i++) {
      let tempXHTTP = null;
      let responseXHTTP = null;

      tempXHTTP = new XMLHttpRequest();
      tempXHTTP.onreadystatechange = function () {
        if (tempXHTTP.readyState==4 && tempXHTTP.status==200) {
          responseXHTTP = tempXHTTP.responseText;
        } else if (tempXHTTP.readyState==4 && tempXHTTP.status==404) {
          console.warn('[News Posts]:WARNING: '+dir+(latestPostID-i+1)+fileName+'.html'+' was not added to #adventureNews');
        }
      }
      tempXHTTP.open('GET', dir+(latestPostID-i+1)+fileName+'.html', false);
      tempXHTTP.send(null);

      if (responseXHTTP != null) {
        let temp = MSPFA.parseBBCode(responseXHTTP, false);
        temp.innerHTML = temp.innerHTML.replace(/&nbsp;/gi,' ');
        temp.className = 'newsPost';

        document.querySelector('#adventureNews').appendChild(temp);
      }
    }
    console.timeEnd('[News Posts]: Finished loading the latest posts in');
  }
}

function popError() {
  MSPFA.dialog('[News Posts]:ERROR:',document.createTextNode('NewsPosts Script has encountered an error. Check the console for details.'),['Okay']);
}