interface ShadowType {
  boxShadow: string;
  credits: string;
  extra: any;
}

async function getShadows(
  file: string,
  boxContainerSelector: string,
  boxClassName: string,
  indexClassName: string,
  creditClassName: string
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
    data.forEach((item: ShadowType, index: number) => {
      const indexSpan = document.createElement("span");
      indexSpan.className = indexClassName;
      indexSpan.innerText = index.toString();

      const creditPrara = document.createElement("p");
      creditPrara.className = creditClassName;
      creditPrara.innerText = item.credits;

      const box = document.createElement("div");
      box.className = boxClassName;
      box.style.boxShadow = item.boxShadow;
      if (item.extra) {
        console.log(index);
        for (const [key, value] of Object.entries(item.extra)) {
          (<any>box.style)[key]=value;
        }
      }

      box.append(indexSpan, creditPrara);
      console.log(box);
      document.querySelector(boxContainerSelector)!.append(box);
    });
  } catch (error) {
    console.log(error);
  }
}

window.onload = () => {
  getShadows("./shadows.json", ".box-container", "box", "index", "credits");
};
