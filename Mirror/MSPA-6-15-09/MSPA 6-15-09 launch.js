//Script made by Lylac_SYS
//https://github.com/Lyl4c/INTERVENE-Public-Assets
//https://web.archive.org/web/20090619195506/http://www.mspaintadventures.com:80/?s=6&p=002154
var offSite = 'https://lyl4c.github.io/INTERVENE-Public-Assets/'

function newDiv(x) {
    return document.createElement(x);
}

function getByClass(x, y = 0) {
    return document.querySelectorAll(x)[y];
}

function setDivAtt(x) {
    let temp = new newDiv(x.div);
    delete x.div;
    for (let i in x) {
        temp.setAttribute(i, x[i]);
    }
    return temp;
}
//x = target div | y = child target | z = new Div
function insertDiv(x, y, z) {
    return getByClass(x).insertBefore(z, getByClass(x).childNodes[y]);
}

function removeDiv(x, y) {
    return getByClass(x).removeChild(getByClass(x).childNodes[y]);
}
//x.xc = target old div.child | y.yc = new div.child
function cloneDiv(x, xc, y, yc) {
    return getByClass(y).insertBefore(
        getByClass(x).childNodes[xc].cloneNode(true),
        getByClass(y).childNodes[yc]
    );
}
/*
//unused function
//sets target div type to new dive type. cannot set target div to its current div type
function setDivType(x,y,z){
  let temp = new newDiv(z);
  let target = getByClass(x).childNodes[y].attributes;
  for (let i=0;i<=target.length-1;i++) {
    temp.setAttribute(target[i].name,target[i].value);
  }
  insertDiv(x,y,temp);
  cloneDiv(x+' '+getByClass(x).childNodes[y+1].localName,0,x+' '+getByClass(x).firstElementChild.localName,0);
  removeDiv(x,y+1);
}
*/
//insert mspa banner above #slide
insertDiv('#main #container', 0, setDivAtt({
    'div': 'a',
    'href': 'http://www.mspaintadventures.com'
}));
insertDiv('#container a', 0, setDivAtt({
    'div': 'img',
    'height': 'initial',
    'width': 'initial',
    'src': offSite + 'Mirror/MSPA-6-15-09/images/mspa-logo.gif'
}));
/*
//move comment box to #slide
cloneDiv('#container #info',1,'#container #slide',5);
removeDiv('#container #info',1);

//replace comment spoiler button with image button
removeDiv('#commentbox div div',0);
insertDiv('#commentbox div div',0,setDivAtt({'div':'input','type':'image','src':offSite+'Mirror/MSPA-6-15-09/images/comment.gif','value':'""','data-close':'""','data-open':'""'}));
insertDiv('#slide #foot',0,setDivAtt({'div':'br'}));

//move footer umcontainer above #info
cloneDiv('#main footer', 1, '#main #container', 3);
removeDiv('#main footer', 1);

//move latestpages above #infobox 
insertDiv('#container #info', 0, setDivAtt({
    'div': 'span',
    'id': 'latestpages'
}));
cloneDiv('#infobox #latestpages .spoiler', 1, '#info #latestpages', 0);
removeDiv('#info #infobox tr', 2);
*/

//trim string length in #latestpages
for (let i = 0; i < document.querySelectorAll('#latestpages div > span').length; i++) {
    if (getByClass('#latestpages a > span', i).innerHTML.length > 25) {
        getByClass('#latestpages a > span', i).innerHTML = getByClass('#latestpages a > span', i).innerHTML.slice(0, 25) + '...';
    }
}

//delete adventure info spoiler boxes, move adventure info #adventureinfo
insertDiv('#info #infobox', 0, setDivAtt({
    'div': 'div',
    'id': 'adventureinfo'
}));
cloneDiv('#infobox .spoiler div:last-of-type', 0, '#infobox #adventureinfo', 0);
removeDiv('#info #infobox', 1);

//add news image for #adventureNews
//insertDiv('#info #infobox',1,setDivAtt({'div':'img','height':'initial','width':'initial','src':offSite+'Mirror/MSPA-6-15-09/images/newsimg.gif'}));

//fake copyright image. its here to mimic the real copyright image used in ye olde mspaintadventures times
insertDiv('#main footer', 0, setDivAtt({
    'div': 'img',
    'src': offSite + 'Mirror/MSPA-6-15-09/images/notcopyright.gif'
}));
/*
//news setup
MSPFA.import('/js/?s=24896',function(){
    Lylac.setupNews('#info #infobox',2);
    Lylac.loadNews(offSite+'News/Posts/','-intervene',7);
});
*/