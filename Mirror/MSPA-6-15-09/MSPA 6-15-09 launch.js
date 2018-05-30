//Script made by Lylac_SYS
//https://github.com/Lyl4c/INTERVENE-Public-Assets
//https://web.archive.org/web/20090619195506/http://www.mspaintadventures.com:80/?s=6&p=002154
let offSite = 'https://lyl4c.github.io/INTERVENE-Public-Assets/'

//shorthand for createElement.
//@x = STRING
function newDiv(x) {
  return document.createElement(x);
}
//shorthand for selecting element tags.
//cannot return a list of all elements.
//@x = STRING
//@y = INT
function getTargetDiv(x,y='0') {
  return document.querySelectorAll(x)[y];
}
//returns new object or modified object
//@y = ARRAY OR OBJECT
//@x = ARRAY
//EX: setDivAtt({'div':'img','empty':'','var':var});
//EX: setDivAtt({'empty':'','var':var},getTargetDiv('exampleElementTag'));
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
//Select an object to return it as an object without attributes
//@x = STRING
//@y = INT
function stripDivAtt(x,y='0') {
  let temp = getTargetDiv(x).childNodes[y];
  while (temp.attributes.length > 0) {
    temp.removeAttribute(temp.attributes[0].name);
  }
}
//Inserts a selected element or a newly created one.
//@x = STRING | Target Element
//@y = INT    | Child Target
//@z = OBJECT
function insertDiv(x,y,z){
    return getTargetDiv(x).insertBefore(z,getTargetDiv(x).childNodes[y]);
}
//Removes the selected element.
//@x = STRING | Target Element
//@y = INT    | Child Target
function removeDiv(x,y){
    return getTargetDiv(x).removeChild(getTargetDiv(x).childNodes[y]);
}
//Clones selected element to somewhere else.
//@x  = STRING | Target element to clone
//@xc = INT
//@y  = STRING | Target element to place clone
//@yc = INT
function cloneDiv(x,xc,y,yc){
  return getTargetDiv(y).insertBefore(getTargetDiv(x).childNodes[xc],getTargetDiv(y).childNodes[yc]);
}
/*//Unused Function
//Takes a string and removes all whitespace,return lines, and line feeds from in between element tags.
//@x = STRING | Target Element
//@y = INT    | Child Target
function compressDiv(x,y){
  let temp = getTargetDiv(x).childNodes[y].outerHTML;
  temp = temp.replace(/(?:[\r\n]\s+)/g,'');
}
*/
//returns an array made of Integers from 0 to @x
//@x = INT
function constructElementArray(x) {
  let temp = [];
  temp.push(undefined);
  for (let i=1;i<=x;i++) {
    temp.push(i);
  }
  return temp;
}
//deletes a range of elements specified by @y and @zIndex
//@x = Array
//@y = INT
//@z = INT | Optional
function deleteArrayElements(x,y,z) {
  if (z==null) {
    delete x[y];
  } else {
    for (let i=y;i<=z;i++) {
      delete x[i];
    }
  }
}

let mspa_06_15_09 = constructElementArray(MSPFA.story.p.length);
//deleteArrayElements(mspa_06_15_09,10,20);

let Lylac = [];
Lylac.x = offSite+'News/Posts/';
Lylac.y = '-intervene';
Lylac.z = 5;

MSPFA.slide = [];
MSPFA.slide.push(function(p) {
  switch(p) {
    case (mspa_06_15_09[p]==p?p:-1):
      //insert mspa banner above #slide
      insertDiv(
        '#main #container',0,
        setDivAtt({
          'div':'a',
          'href':'http://www.mspaintadventures.com'
        })
      );
      insertDiv(
        '#container a',0,
        setDivAtt({
          'div':'img',
          'height':'initial',
          'width':'initial',
          'src':offSite+'Mirror/MSPA-6-15-09/images/mspa-logo.gif'
        })
      );

      //move comment box to #slide
      insertDiv(
        '#container #slide',5,
        getTargetDiv('#container #info').childNodes[1]
      );

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
      insertDiv(
        '#main #container',4,
        getTargetDiv('#main footer').childNodes[1]
      );

      //move latestpages above #infobox 
      insertDiv(
        '#container #info',0,
        setDivAtt({
          'div':'span',
          'id':'latestpages'
        })
      );
      cloneDiv(
        '#infobox #latestpages .spoiler',1,
        '#info #latestpages',0
      );
      removeDiv('#info #infobox tr',2);

      //trim string length in #latestpages
      for (let i=0;i<document.querySelectorAll('#latestpages div > span').length;i++) {
        if (getTargetDiv('#latestpages a > span',i).innerHTML.length > 25) {
          getTargetDiv('#latestpages a > span',i).innerHTML = getTargetDiv('#latestpages a > span',i).innerHTML.slice(0,25)+'...';
        }
      }

      //delete adventure info spoiler boxes, move adventure info #adventureinfo
      insertDiv(
        '#info #infobox',0,
        setDivAtt({
          'div':'div',
          'id':'adventureinfo'
        })
      );
      insertDiv(
        '#infobox #adventureinfo',0,
        getTargetDiv('#infobox .spoiler div:last-of-type').childNodes[0]
      );
      removeDiv('#info #infobox',1);

      //insertDiv('#info #infobox',1,setDivAtt({'div':'div','id':'news'}));
      insertDiv(
        '#info #infobox',1,
        setDivAtt({
          'div':'img',
          'height':'initial',
          'width':'initial',
          'src':offSite+'Mirror/MSPA-6-15-09/images/newsimg.gif'
        })
      );

      //fake copyright image. its here to mimic the real copyright image used in ye olde mspaintadventures times
      insertDiv(
        '#main footer',0,
        setDivAtt({
          'div':'img',
          'src':offSite+'Mirror/MSPA-6-15-09/images/notcopyright.gif'
        })
      );
      
      Lylac.v = '#info #infobox';
      Lylac.w = 2;
      break;
  }
  
  //news setup
  MSPFA.import('/js/?s=24896',function() {
    NewsPosts.setupNews(Lylac.v,Lylac.w);
    NewsPosts.loadNews(Lylac.x,Lylac.y,Lylac.z);
  });
});
