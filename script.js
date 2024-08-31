let dropdowns = document.querySelector(".dropdown select");
let btn = document.querySelector("button");
selectTag = document.querySelectorAll("select");
let fromLang = document.querySelector(".from-text");
let toLang = document.querySelector(".to-text");

// for(let select of dropdowns){
//         for(let lang in countries){
//             let newOption = document.createElement("option");
//             newOption.value = lang;
//             if(select.name === "from" && lang === "en-GB"){
//                 newOption.selected = "selected";
//             }else if(select.name === "to" && lang === "hi-IN"){
//                     newOption.selected = "selected";
//             }
//             select.append(newOption);
//         }

//     }
// select.addEventListener("change", (evt) => {
//             evt.target;
//         });
    
    


selectTag.forEach((tag, id) => {
    for (let lang in countries) {
        let selected = id == 0 ? lang == "en-GB" ? "selected" : "" : lang == "hi-IN" ? "selected" : "";
        let option = `<option ${selected} value="${lang}">${countries[lang]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});



fromLang.addEventListener("keyup", () => {
    if(!fromLang.value) {
        toLang.value = "";
    }
});
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    let text = fromLang.value;
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
// console.log(text,translateFrom,translateTo);
    if(!text) return;
    toLang.setAttribute("placeholder","Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
     console.log(data);
        toLang.value = data.responseData.translatedText;
        data.matches.forEach(data => {
            if(data.id === 0) {
                toLang.value = data.translation;
            }
        });
        toLang.setAttribute("placeholder", "Translation");
});
});
