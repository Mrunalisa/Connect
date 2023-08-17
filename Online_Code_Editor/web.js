function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  
  document.getElementById("defaultOpen").click();

  const html_code = document.querySelector('#html-code');
  const css_code = document.querySelector('#css-code');
  const js_code = document.querySelector('#js-code');
  const output = document.querySelector('#output');
  
  function run() {

    localStorage.setItem('html_code', html_code.value);
    localStorage.setItem('css_code', css_code.value);
    localStorage.setItem('js_code', js_code.value);
  
    output.contentDocument.body.innerHTML = `<style>${localStorage.css_code}</style>` + localStorage.html_code;
    output.contentWindow.eval(localStorage.js_code);
  }
  
  html_code.onkeyup = () => run();
  css_code.onkeyup = () => run();
  js_code.onkeyup = () => run();
  
  html_code.value = localStorage.html_code;
  css_code.value = localStorage.css_code;
  js_code.value = localStorage.js_code;
