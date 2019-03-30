// Import stylesheets
import './css-flex-wrap.css';
import './css-index.css';
import './style.css';
import $ from 'jquery';

function sectionFlexWrap() {
  const sectionIdFlexWrap = "#flexWrap",
    sectionFlexWrap = document.querySelector(sectionIdFlexWrap),
    flexGrow_wrap_RGs = sectionFlexWrap.querySelectorAll("input[type='radio']"),
    divContainer = sectionFlexWrap.querySelector("div"),
    fnWrapOnChange = (evt) => {
      console.log(evt.target.value)
      divContainer.style["flex-wrap"] = evt.target.value
      let innerHTML = sectionFlexWrap.querySelector("pre").innerHTML ;      
      const newWrap = innerHTML.replace(/flex-wrap:(.*?;)/,'flex-wrap:'+evt.target.value+';')
      sectionFlexWrap.querySelector("pre").innerHTML = newWrap
      $(sectionFlexWrap.querySelector("pre span:nth-child(2)")).effect("highlight", {}, 3000);
    };

  flexGrow_wrap_RGs.forEach(r => {
    r.addEventListener('change', fnWrapOnChange, false)
  })

}
function sectionFlexGrowWrap() {
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
      };

      flexGrow_wrap_RGs.forEach(r => {
        r.addEventListener('change', fnWrapOnChange, false)
      })
    }

    if (flexGrowSlider) {

      let onInput = function () {
        var div = sectionFlexGrow.querySelector("div");
        div.style.width = flexGrowSlider.value / 10 + "%";

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

sectionFlexGrowWrap();
sectionFlexWrap();