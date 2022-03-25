async function getShadows(
  file,
  boxContainerSelector,
  boxClassName,
  indexClassName,
  creditClassName
) {
  try {
    console.log("Button Clicked");
    const res = await fetch(file);
    if (!res.ok) {
      throw Error(res.statusText);
    }
    console.log(res);
    const data = await res.json();
    console.log(data);
    data.forEach((item, index) => {
      const indexSpan = document.createElement("span");
      indexSpan.className = indexClassName;
      indexSpan.innerText = index;

      const creditPrara = document.createElement("p");
      creditPrara.className = creditClassName;
      creditPrara.innerText = item.credits;

      const box = document.createElement("div");
      box.className = boxClassName;
      box.style.boxShadow = item.boxShadow;
      if (item.extra) {
        console.log(index);
        box.style[`${Object.keys(item.extra)[0]}`] = `${
          Object.values(item.extra)[0]
        }`;
      }

      box.append(indexSpan, creditPrara);
      console.log(box);
      document.querySelector(boxContainerSelector).append(box);
    });
  } catch (error) {
    console.log(error);
  }
}

window.onload = () => {
  getShadows("./shadows.json", ".box-container", "box", "index", "credits");
};
