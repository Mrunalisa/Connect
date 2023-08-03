celinput = document.getElementById("inp-cel");
fahinput = document.getElementById("inp-fah");
kelinput = document.getElementById("inp-kel");
reninput = document.getElementById("inp-ren");
clearbtn = document.getElementById("btn-clear");

celinput.addEventListener("input", function () {
  const c = parseFloat(celinput.value);
  let f = Math.round(c * (9 / 5) + 32);
  if (!Number.isInteger(f)) {
    f = f.toFixed(4);
  }
  fahinput.value = f;

  let k = Math.round(c + 273.15);
  if (!Number.isInteger(k)) {
    k = k.toFixed(4);
  }
  kelinput.value = k;

  let r = Math.round(c * (9 / 5) + 491.67);
  if (!Number.isInteger(r)) {
    r = r.toFixed(4);
  }
  reninput.value = r;
});

fahinput.addEventListener("input", function () {
  const f = parseFloat(fahinput.value);
  let c = (f - 32) * (5 / 9);
  if (!Number.isInteger(c)) {
    c = c.toFixed(4);
  }
  celinput.value = c;

  let k = (f - 32) * (5 / 9) + 273.15;
  if (!Number.isInteger(k)) {
    k = k.toFixed(4);
  }
  kelinput.value = k;

  let r = f + 459.67;
  if (!Number.isInteger(r)) {
    r = r.toFixed(4);
  }
  reninput.value = r;
});

kelinput.addEventListener("input", function () {
  const k = parseFloat(kelinput.value);
  let c = k - 273.15;
  if (!Number.isInteger(c)) {
    c = c.toFixed(4);
  }
  celinput.value = c;

  let f = (k - 273.15) * (9 / 5) + 32;
  if (!Number.isInteger(f)) {
    f = f.toFixed(4);
  }
  fahinput.value = f;

  let r = k * 1.8;
  if (!Number.isInteger(r)) {
    r = r.toFixed(4);
  }
  reninput.value = r;
});

reninput.addEventListener("input", function () {
  const r = parseFloat(reninput.value);
  let c = ((r - 491.67) * 5) / 9;
  if (!Number.isInteger(c)) {
    c = c.toFixed(4);
  }
  celinput.value = c;

  let k = (r * 5) / 9;
  if (!Number.isInteger(k)) {
    k = k.toFixed(4);
  }
  kelinput.value = k;

  let f = r - 459.67;
  if (!Number.isInteger(f)) {
    f = f.toFixed(4);
  }
  fahinput.value = f;
});

clearbtn.addEventListener("click", function () {
  celinput.value = "";
  fahinput.value = "";
  kelinput.value = "";
  reninput.value = "";
});
