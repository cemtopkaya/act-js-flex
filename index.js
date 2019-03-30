// Import stylesheets
import './css-flex-wrap.css';
import './css-index.css';
import './css-animation.css';
import './style.css';
import $ from 'jquery';

function sectionSpanCssChanged(sectionId = "section#flexWrap", cssProp = "flex-wrap") {
  const section = document.querySelector(sectionId),
    divContainer = section.querySelector("div"),
    radios = section.querySelectorAll("input[type='radio']"),
    pre = section.querySelector("pre"),
    onChange = (evt) => {
      
console.log("span")
      divContainer.style[cssProp] = evt.target.value
      let regexp = new RegExp(cssProp + ":(.*?;)"),
        spans = section.querySelectorAll("pre span"),
        span = Array.from(spans)
          .find(span => span.innerText.indexOf(cssProp) > -1),
        newWrap = span.innerText.replace(regexp, cssProp + ':' + evt.target.value + ';'),
        newCssValue = "newCssValue"

      span.innerHTML = newWrap
      if (span.classList.contains(newCssValue)) {
        span.classList.toggle(newCssValue);
      }

      setTimeout(() => span.classList.add(newCssValue), 1)
    }
console.log(radios)
  radios.forEach(r => {
    r.addEventListener('change', onChange)
  })
}


function section_flexGrowWrap() {
  const sectionIdFlexGrowWrap = "#flexGrowWrap";
  let flexGrowSlider,
    sectionFlexGrow,
    flexGrow_wrap_RGs;

  sectionFlexGrow = document.querySelector(sectionIdFlexGrowWrap);
  if (sectionFlexGrow) {

    flexGrowSlider = sectionFlexGrow.querySelector("input[type='range']");
    flexGrow_wrap_RGs = sectionFlexGrow.querySelectorAll("input[type='radio']");

    if (flexGrow_wrap_RGs) {
      let fnWrapOnChange = function (evt) {
        let divContainer = document.querySelector(sectionIdFlexGrowWrap + ">div");
        divContainer.style["flex-wrap"] = evt.target.value;
        sectionSpanCssChanged("flexGrowWrap", "flex-wrap");
      };

      flexGrow_wrap_RGs.forEach(r => {
        r.addEventListener('change', fnWrapOnChange, false)
      })
    }

    if (flexGrowSlider) {

      let onInput = function () {
        var div = sectionFlexGrow.querySelector("div");
        div.style.width = flexGrowSlider.value / 10 + "%";
        sectionSpanCssChanged("flexGrowWrap", "width");

        var divs = document.querySelectorAll(sectionIdFlexGrowWrap + ">div>div");
        divs.forEach(div => {
          let span = div.getElementsByTagName("span")[0];
          span.innerHTML = "<br/>" + div.offsetWidth + "px"
        })
      };

      flexGrowSlider.addEventListener('input', onInput, false);
      flexGrowSlider.max = 1000;
      flexGrowSlider.value = 1000
      onInput();
    }
  }
}
// section_flexGrowWrap()

function section_flexWrap() {

  const section = document.querySelector("section#flexWrap"),
    flexWrap_radios = section.querySelectorAll("input[type='radio']"),
    fnWrapOnChange = function (evt) {
      let divContainer = section.querySelector("div");
      divContainer.style["flex-wrap"] = evt.target.value;
      sectionSpanCssChanged("section#flexGrowWrap", "flex-wrap");
    };

  flexWrap_radios.forEach(r => {
    r.addEventListener('change', fnWrapOnChange, false)
  })
}
//section_flexWrap()

sectionSpanCssChanged("section#flexWrap", "flex-wrap");
sectionSpanCssChanged("section#flexGrowWrap", "flex-wrap");