document.addEventListener("DOMContentLoaded", () => {
    // tabs
    const tabs = document.querySelectorAll(".tabheader__item"),
        tabcontent = document.querySelectorAll(".tabcontent");

    const hideContent = () => {
        tabs.forEach(el => {
            el.classList.remove("tabheader__item_active");
        });
        tabcontent.forEach(el => {
            el.classList.remove("tabcontent_active");
        });
    };

    const showContent = (i = 0) => {
        tabs[i].classList.add("tabheader__item_active");
        tabcontent[i].classList.add("tabcontent_active", "fade");
    };

    tabs.forEach((el, i) => {
        el.addEventListener("click", () => {
            hideContent();
            showContent(i);
        });
    });

    hideContent();
    showContent();

    // timer
    const timer = document.querySelector(".promotion__timer"),
        timerDays = timer.querySelector("#days"),
        timerHours = timer.querySelector("#hours"),
        timerMinutes = timer.querySelector("#minutes"),
        timerSeconds = timer.querySelector("#seconds");

    const endTime = "2022-09-09";

    const getDifferenceDates = (endTime) => {
        const t = Math.floor(Date.parse(endTime) - Date.parse(new Date)),
            days = Math.floor(t / (1000 * 60 * 60 * 24) % 30),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        }
    }

    const timerFunc = () => {
        let arrDifferenceDate = getDifferenceDates(endTime);
        timerDays.innerHTML = addZero(arrDifferenceDate.days);
        timerHours.innerHTML = addZero(arrDifferenceDate.hours);
        timerMinutes.innerHTML = addZero(arrDifferenceDate.minutes);
        timerSeconds.innerHTML = addZero(arrDifferenceDate.seconds);
    }

    const addZero = (num) => {

        if (num < 10 && num > 0) {
            return `0${num}`;
        } else if (num <= 0) {
            return 0;
        } else {
            return num;
        }
    }
    timerFunc();
    setInterval(timerFunc, 1000);

    // modal
    const modal = document.querySelector(".modal"),
        closeModalBtn = document.querySelectorAll("[data-closeModal]"),
        openModalBtn = document.querySelectorAll("[data-openModal]");

    const openModal = () => {
        modal.classList.toggle("show");
        document.body.style.overflow = "hidden";
    }

    const closeModal = () => {
        modal.classList.toggle("show");
        document.body.style.overflow = "";
    }

    openModalBtn.forEach(el => {
        el.addEventListener("click", openModal);
    });
    closeModalBtn.forEach(el => {
        el.addEventListener("click", closeModal);
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    document.addEventListener("keydown", (e) => {
        if (e.key == "Escape" && modal.classList.contains("show")) {
            closeModal();
        }
    });

    setTimeout(openModal, 10000);

    // acticle
    class Article {
        constructor(src, alt, subtitle, descr, price, parent) {
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.coureUSD = 32;
            this.parent = document.querySelector(parent);
        }

        changeToUAH() {
            this.price = this.price * this.coureUSD;
        }

        render() {
            this.changeToUAH();
            const div = document.createElement("div");
            div.classList.add("menu__item");
            div.innerHTML = `
                <img src="${this.src}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(div);
        }
    }

    const postingArticle = (src) => {
        fetch(src)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                data.menu.forEach(el => {
                    new Article(
                        el["img"],
                        el["altimg"],
                        el["title"],
                        el["descr"],
                        el["price"],
                        ".menu__field .container"
                    ).render();
                });
            });
    }
    postingArticle("db.json");

    // slider

    const slider = document.querySelector(".slider"),
        slides = slider.querySelectorAll(".offer__slide"),
        btnNext = slider.querySelector(".offer__slider-next"),
        btnPrev = slider.querySelector(".offer__slider-prev"),
        offerSliderCounter = slider.querySelector(".offer__slider-counter"),
        offerSliderCounterCurrent = offerSliderCounter.querySelector("#current"),
        offerSliderCounterTotal = offerSliderCounter.querySelector("#total");

    let countSlide = 0;

    const showSlides = () => {
        if (countSlide < 0) {
            countSlide = slides.length - 1;
        }

        if (countSlide > slides.length - 1) {
            countSlide = 0;
        }
        hideAllSlides();
        slides[countSlide].classList.add("active");
        showCountSlides();
    }

    const hideAllSlides = () => {
        slides.forEach(el => el.classList.remove("active"));
    }
    const nextSlide = () => {
        countSlide++;
        showSlides();
    }
    const prewSlide = () => {
        countSlide--;
        showSlides();
    }

    const showCountSlides = () => {
        offerSliderCounterCurrent.innerHTML = countSlide + 1;
        offerSliderCounterTotal.innerHTML = slides.length;
    }

    btnNext.addEventListener("click", nextSlide);
    btnPrev.addEventListener("click", prewSlide);

    showSlides();
});