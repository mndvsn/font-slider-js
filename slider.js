function ready(callback){
  if (document.readyState!='loading') callback();
  else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
  else document.attachEvent('onreadystatechange', function(){
    if (document.readyState=='complete') callback();
  });
};
function sliderInit(el) {
  var dl = el.querySelector('dl');
  var fields = JSON.parse(el.getAttribute('data-fields')), flen = fields.length;
  var valueSets = JSON.parse(el.getAttribute('data-values')), vlen = valueSets.length;
  for (var i=0; i<flen; i++) {
    // console.log(fields[i]);
    var dt = document.createElement('dt');
    dt.innerHTML = fields[i];
    dl.appendChild(dt);
    var dd = document.createElement('dd');
    dd.innerHTML = '-';
    dl.appendChild(dd);
  }
  el.fields = fields;
  el.valueSets = valueSets;

  var styles = JSON.parse(el.querySelector('.fs-textdisplay').getAttribute('data-styles'));
  console.log("styles", styles);
  el.styles = styles;

  var c = el.querySelector('.fs-control input');
  c.setAttribute('min', 0);
  c.setAttribute('max', vlen-1);
  c.setAttribute('value', 0);
  c.slider = el;
  c.addEventListener('input', sliderChanged);
  el.control = c;

  sliderSetData(el, el.getAttribute('data-initial'));
}
function sliderChanged(e) {
  var slider = e.target.slider;
  sliderSetData(slider, e.target.value);
}
function sliderSetData(el, i = 0) {
  if (el.control.getAttribute('value') != i) {
    el.control.setAttribute('value', i);
  }
  var dl = el.querySelector('dl');
  var ddList = dl.querySelectorAll('dd');
  for (var f=0; f < el.fields.length; f++) {
    var dd = ddList[f];
    dd.innerHTML = el.valueSets[i][f];
  }
  var td = el.querySelector('.fs-textdisplay');
  var newStyles = el.styles[i];
  for (var s in newStyles) {
    if (newStyles.hasOwnProperty(s)) {
      td.style[s] = newStyles[s].toString();
    }
  }
  // console.log(el.valueSets);
};
ready(function(){
  var sliders = document.querySelectorAll(".fs-module"), elen = sliders.length;
  for (var e=0; e<elen; e++) {
    sliderInit(sliders[e]);
  }
});
