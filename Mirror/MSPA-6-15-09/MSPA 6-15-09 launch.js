//Script made by Lylac_SYS
//https://github.com/Lyl4c/INTERVENE-Public-Assets
//https://web.archive.org/web/20090619195506/http://www.mspaintadventures.com:80/?s=6&p=002154
var offSite = 'https://lyl4c.github.io/INTERVENE-Public-Assets/'

function newDiv(x) {
    return document.createElement(x);
}
function getTargetDiv(x,y='0') {
    return document.querySelectorAll(x)[y];
}
//returns new object or modified object
//1ST param can be an array entry for a new element tag
//OR an object
//2ND param must be an array.
//EX: setDivAtt({'div':'img','empty':'','var':var});
function setDivAtt(y,x=null) {
    if (y.div != null) {
        x = new newDiv(y.div);
        delete y.div;
    }
    for (let i in y) {
        x.setAttribute(i,y[i]);
    }
    return x;
}
//Target an object to return it as an object without attributes
function stripDivAtt(x,y='0') {
  let temp = getTargetDiv(x).childNodes[y];
  while (temp.attributes.length > 0) {
    temp.removeAttribute(temp.attributes[0].name);
  }
}
//x = target div | y = child target | z = new Div
function insertDiv(x,y,z){
    return getTargetDiv(x).insertBefore(z,getTargetDiv(x).childNodes[y]);
}
function removeDiv(x,y){
    return getTargetDiv(x).removeChild(getTargetDiv(x).childNodes[y]);
}
//x.xc = target old div.child | y.yc = new div.child
function cloneDiv(x,xc,y,yc){
    return getTargetDiv(y).insertBefore(getTargetDiv(x).childNodes[xc],getTargetDiv(y).childNodes[yc]);
}
//insert string -> returns object | removes return lines, line feeds, and whitespaces inside the target
function compressDiv(x,y){
    let temp = getTargetDiv(x).childNodes[y].outerHTML;
    temp = temp.replace(/(?:[\r\n]\s+)/g,'');
}

//insert mspa banner above #slide
insertDiv('#main #container',0,setDivAtt({'div':'a','href':'http://www.mspaintadventures.com'}));
insertDiv('#container a',0,setDivAtt({
  'div':'img',
  'height':'initial',
  'width':'initial',
  'src':offSite+'Mirror/MSPA-6-15-09/images/mspa-logo.gif'
}));

//move comment box to #slide
insertDiv('#container #slide',5,getTargetDiv('#container #info').childNodes[1]);

//replace comment spoiler button with image button
stripDivAtt('#commentbox div div',0);
setDivAtt({
  'type':'image',
  'src':offSite+'Mirror/MSPA-6-15-09/images/comment.gif',
  'value':'',
  'data-close':'',
  'data-open':''},
  getTargetDiv('#commentbox div div').childNodes[0]
);

//move footer umcontainer above #info
insertDiv('#main #container',4,getTargetDiv('#main footer').childNodes[1]);

//move latestpages above #infobox 
insertDiv('#container #info',0,setDivAtt({
  'div':'span',
  'id':'latestpages'
}));
cloneDiv('#infobox #latestpages .spoiler',1,'#info #latestpages',0);
removeDiv('#info #infobox tr',2);

//trim string length in #latestpages
for (let i=0;i<document.querySelectorAll('#latestpages div > span').length;i++) {
    if (getTargetDiv('#latestpages a > span',i).innerHTML.length > 25) {
        getTargetDiv('#latestpages a > span',i).innerHTML = getTargetDiv('#latestpages a > span',i).innerHTML.slice(0,25)+'...';
    }
}

//delete adventure info spoiler boxes, move adventure info #adventureinfo
insertDiv('#info #infobox',0,setDivAtt({'div':'div','id':'adventureinfo'}));
insertDiv('#infobox #adventureinfo',0,getTargetDiv('#infobox .spoiler div:last-of-type').childNodes[0]);
removeDiv('#info #infobox',1);

//insertDiv('#info #infobox',1,setDivAtt({'div':'div','id':'news'}));
insertDiv('#info #infobox',1,setDivAtt({
  'div':'img',
  'height':'initial',
  'width':'initial',
  'src':offSite+'Mirror/MSPA-6-15-09/images/newsimg.gif'
}));

//fake copyright image. its here to mimic the real copyright image used in ye olde mspaintadventures times
insertDiv('#main footer',0,setDivAtt({
  'div':'img',
  'src':offSite+'Mirror/MSPA-6-15-09/images/notcopyright.gif'
}));
/*
//news setup
MSPFA.import('/js/?s=24896',function(){
    Lylac.setupNews('#info #infobox',2);
    Lylac.loadNews(offSite+'News/Posts/','-intervene',7);
});
*/