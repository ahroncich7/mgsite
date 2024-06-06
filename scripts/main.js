import i18n from "../Assets/Languages.json" with {type: 'json'};

(() => {
    var selectedLanguage = "es";
    var languageTexts = {};
    var heroTextArray = ["futuro", "otro", "buda"];
    var breakHeroAnimation = false;
    const docReady = [];

    document.addEventListener("DOMContentLoaded", (event) => {
        docReady.forEach((fn) => {
            fn();
        })
        //THE LAST ONE TO LOAD
        setPageReady()
    });



    //RUNS WHEN DOC IS READY


    const setLanguage = (newLang = "ES") => {
        selectedLanguage = newLang;
        languageTexts = i18n.texts[selectedLanguage];
    }
    docReady.push(setLanguage);






    const setReviewsFunc = () => {
        var multipleCardCarousel = document.querySelector(
            "#carouselReview"
        );
        if (window.matchMedia("(min-width: 768px)").matches) {
            var carousel = new bootstrap.Carousel(multipleCardCarousel, {
                interval: false,
            });
            var carouselWidth = $("#reviews .carousel-inner")[0].scrollWidth;
            var cardWidth = $("#reviews .carousel-item").width();
            var scrollPosition = 0;
            $("#carouselReview .carousel-control-next").on("click", function () {
                if (scrollPosition < carouselWidth - cardWidth) {
                    scrollPosition += cardWidth;
                    $("#carouselReview .carousel-inner").animate(
                        { scrollLeft: scrollPosition },
                        600
                    );
                }
            });
            $("#carouselReview .carousel-control-prev").on("click", function () {
                if (scrollPosition > 0) {
                    scrollPosition -= cardWidth;
                    $("#carouselReview .carousel-inner").animate(
                        { scrollLeft: scrollPosition },
                        600
                    );
                }
            });
        } else {
            $(multipleCardCarousel).addClass("slide");
        }
    }
    docReady.push(setReviewsFunc);


    const setLangSelect = () => {
        const languageSelectOptions = document.querySelectorAll("#languageSelect li");
        languageSelectOptions.forEach((option) => {
            option.addEventListener("click", (event) => {
                const newLang = event.target.dataset.value;
                setLanguage(newLang);
                translateTexts();
            })
        })
    }
    docReady.push(setLangSelect);


    //TRANSLATIONS
    const translateTexts = () => {

        // Traduce los textos en el dom
        const i18n = document.querySelectorAll("[data-i18n]");
        i18n.forEach((element) => {
            try {
                const keyString = element.dataset.i18n;
                const string = languageTexts[keyString];
                element.innerHTML = string;
            } catch {
            }
        })

        // Traduce variables globales
        heroTextArray = languageTexts.heroTexts;
        breakHeroAnimation = true;
    }
    docReady.push(translateTexts);


    //ANIMATIONS
    const applyAnimations = () => {
        const observer = new IntersectionObserver(entries => {
            // Loop over the entries
            entries.forEach(entry => {
                // Calculate the threshold (50%)
                const threshold = 0.25;

                // If the element is visible at least 50%
                if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
                    // Add the animation class
                    const animation = entry.target.dataset.animated;
                    entry.target.classList.remove('invisible');
                    entry.target.classList.add(animation);
                    console.log("enter");
                }
            });
        }, { threshold: 0.5 }); // Set the threshold to 50%

        document.querySelectorAll('[data-animated]').forEach(element => {
            element.classList.add("invisible");
            observer.observe(element);
        });
    };

    docReady.push(applyAnimations);


    const animatedHeroTitle = () => {
        var k = 0;
        var char = 0;
        var output = $('#hero-title');
        var back = false; // valida si se suma o se resta
        var index = 0;

        var app = {
            init: function (text, target) {
                target.html('');
                char = text.length;
                this.sayHello(text, target);
            },
            sayHello: function (text, target) {
                if (breakHeroAnimation) {
                    breakHeroAnimation = false;
                    text = heroTextArray[index]
                }
                target.text(text.slice(0, k));
                var that = this;

                if (!back) { //valida que sea false

                    if (k == text.length) {// valida si k es igual longitud del arreglo para ir hacia atras 
                        setTimeout(function () {
                            back = !back;
                        }, 1000)
                    }


                    k++;
                    setTimeout(function () {
                        that.sayHello(text, target);
                    }, 30);

                } else {
                    k--;
                    if (k == 0) { // valida que k sea igual a 0 para ir hacia adelante
                        back = !back;
                        index++
                        if (index == heroTextArray.length) { index = 0 } //Si no hay mas opciones reinicia las palabras
                        text = heroTextArray[index]
                    }
                    setTimeout(function () {
                        that.sayHello(text, target);
                    }, 30);
                }

                // var timer = setTimeout(function () {
                //     that.sayHello(text, target);
                // }, 50);
            }
        };
        app.init(heroTextArray[0], output);
    };

    docReady.push(animatedHeroTitle);


    //REUSABLES
    const setPageReady = () => {
        //SPINNER OFF
        setTimeout(() => {
            const spinner = document.getElementById("spinnerCont");
            const bodyContent = document.getElementById("bodyContent");
            spinner.classList.add("d-none");
            bodyContent.classList.remove("invisible");
            bodyContent.classList.remove("minimized");
        }, 1000)
    }


})()