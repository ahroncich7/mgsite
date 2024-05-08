import i18n from "../Assets/Languages.json" with {type: 'json'};

(() => {


    var selectedLanguage = "es";
    var languageTexts = {};
    const docReady = [];

    document.addEventListener("DOMContentLoaded", (event) => {
        docReady.forEach((fn) => {
            fn();
        })

        // Última en cargar
        setPageReady()
    });



    // CORREN AL CARGAR EL DOC
    const setLanguage = (newLang = "ES") => {
        selectedLanguage = newLang;
        languageTexts = i18n.texts[selectedLanguage];
    }
    docReady.push(setLanguage);

    const setLangSelect = () => {
        const languageSelect = document.getElementById("languageSelect");
        languageSelect.addEventListener("change", (event) => {
            const newLang = event.target.value;
            setLanguage(newLang);
            translateTexts();
        })
    }
    docReady.push(setLangSelect);

    const translateTexts = () => {
        // const i18n = document.querySelectorAll(".translatable");
        const i18n = document.querySelectorAll("[data-i18n]");
        i18n.forEach((element) => {
            try {
                const keyString = element.dataset.i18n;
                const string = languageTexts[keyString];
                element.textContent = string;
            } catch {
            }
        })
    }
    docReady.push(translateTexts);


    // SOLO CUANDO SON LLAMADAS

    const setPageReady = () => {
        const spinner = document.getElementById("spinnerCont");
        const bodyContent = document.getElementById("bodyContent");
        spinner.classList.add("d-none");
        bodyContent.classList.remove("d-none");
        bodyContent.classList.remove("minimized");
    }


})()