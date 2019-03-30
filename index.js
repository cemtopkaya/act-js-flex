// Import stylesheets
import './css-flex-wrap.css';
import './css-index.css';
import './css-animation.css';
import './style.css';
import $ from 'jquery';

function animateSpan(section, cssProp, value) {
  let regexp = new RegExp(cssProp + ":(.*?;)"),
    spans = section.querySelectorAll("pre span"),
    span = Array.from(spans)
      .find(span => span.innerText.indexOf(cssProp) > -1),
    newWrap = span.innerText.replace(regexp, cssProp + ':' + value + ';'),
    newCssValue = "newCssValue"

  span.innerHTML = newWrap
  if (span.classList.contains(newCssValue)) {
    span.classList.toggle(newCssValue);
  }

  setTimeout(() => span.classList.add(newCssValue), 1)
}

function section_radioChanged(sectionId = "section#flexWrap", cssProp) {
  const section = document.querySelector(sectionId),
    divContainer = section.querySelector("div"),
    radios = section.querySelectorAll("input[type='radio']"),
    pre = section.querySelector("pre"),
    cssProp = cssProp || radios[0].name,
    onChange = (evt) => {
      divContainer.style[cssProp] = evt.target.value
      animateSpan(section, cssProp, evt.target.value)
    }

  console.log(radios)
  radios.forEach(r => {
    r.addEventListener('change', onChange)
  })
}

function section_rangeInput(sectionId = "section#flexGrowWrap") {
  let section = document.querySelector(sectionId)

  if (section) {
    let
      flexGrowSlider = section.querySelector("input[type='range']"),
      divContainer = section.querySelector("div"),
      divs = divContainer.querySelectorAll("div");

    if (flexGrowSlider) {

      let onInput = function () {
        const newWidth = flexGrowSlider.value / 10 + "%";
        divContainer.style.width = newWidth;
        animateSpan(section, "width", newWidth);

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


(function () {
  section_rangeInput("section#flexGrowWrap")
  section_radioChanged("section#flexWrap", "flex-wrap");
  section_radioChanged("section#flexGrowWrap", "flex-wrap");
  section_radioChanged("section#justifyContent");
})();