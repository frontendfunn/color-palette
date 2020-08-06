function run() {
  // for the initial run
  const colorInputOne = document.getElementById("color1");
  const colorInputTwo = document.getElementById("color2");
  const paletteCount = document.getElementById("palette-count-input");
  generatePalette(colorInputOne.value, colorInputTwo.value, paletteCount.value);

  //   adding listners for the input elements
  [colorInputOne, colorInputTwo, paletteCount].forEach((colorInput) => {
    colorInput.addEventListener("input", function () {
      generatePalette(
        colorInputOne.value,
        colorInputTwo.value,
        paletteCount.value
      );
    });
  });
}

function generatePalette(color1, color2, paletteCount) {
  const paletteContainer = document.getElementById("palette");
  //     remove all child nodes and append new nodes
  paletteContainer.innerHTML = "";
  const colorsPalette = chroma
    .scale([color1, color2])
    .mode("lch")
    .colors(paletteCount);
  colorsPalette.forEach((palette) => {
    const paletteItem = document.createElement("div");

    const paletteColorValue = document.createElement("span");
    paletteColorValue.classList.add("palette-color-value");
    console.log(chroma.contrast(palette, chroma(palette).darken(3)));

    paletteColorValue.style.setProperty(
      "--name-color",
      chroma.contrast(palette, chroma(palette).darken(3)) > 2
        ? chroma(palette).darken(3)
        : chroma(palette).luminance(3)
    );
    paletteColorValue.appendChild(document.createTextNode(palette));
    paletteItem.appendChild(paletteColorValue);

    paletteItem.classList.add("palette-item");
    paletteItem.style.setProperty("--palette-color", palette);
    paletteContainer.appendChild(paletteItem);
  });
}
window.addEventListener("load", (event) => {
  run();
});
