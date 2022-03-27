"use strict";
async function getShadows(file, boxContainerSelector, boxClassName, indexClassName, creditClassName) {
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
                    box.style[key] = value;
                }
            }
            box.append(indexSpan, creditPrara);
            // console.log(box);
            document.querySelector(boxContainerSelector).append(box);
            box.addEventListener('click', () => {
                navigator.clipboard.writeText(box.getAttribute('style'));
                // const boxIndex=box.querySelector('.index')! as HTMLSpanElement;
                const indexSpanText = indexSpan.innerText;
                indexSpan.innerText = "Copied!";
                setTimeout(() => {
                    indexSpan.innerHTML = indexSpanText;
                    indexSpan.classList.remove('copied');
                }, 1000);
            });
        });
    }
    catch (error) {
        console.log(error);
    }
}
window.onload = () => {
    getShadows("./shadows.json", ".box-container", "box", "index", "credits");
};

//# sourceMappingURL=custom.js.map
