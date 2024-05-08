import i18n from "../Assets/Languages.json" with {type: 'json'};

(() => {


    var selectedLanguage = "es";
    var languageTexts = {};
    const docReady = [];

    document.addEventListener("DOMContentLoaded", (event) => {
        docReady.forEach((fn) => {
            fn();
        })
        setPageReady()
    });


    // AUTOEJECUTABLES CUANDO CARGA EL DOC    
    const setLanguage = (newLang = "es") => {
        selectedLanguage = newLang;
        languageTexts = i18n.texts[selectedLanguage];
    }
    docReady.push(setLanguage);

    const translateTexts = () => {
        const i18n = document.querySelectorAll(".translatable");
        i18n.forEach((element) => {
            const keyString = element.dataset.i18n;
            const string = languageTexts[keyString];
            element.textContent = string;
        })
    }
    docReady.push(translateTexts);


    // SE LLAMAN DESDE DENTRO

    const setPageReady = () => {

        setTimeout(() => {

            const spinner = document.getElementById("spinnerCont");
            const bodyContent = document.getElementById("bodyContent");
            spinner.classList.add("d-none");
            bodyContent.classList.remove("d-none");
            bodyContent.classList.remove("minimized");
        }, 2000)
    }


})()