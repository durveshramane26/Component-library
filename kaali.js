function removeActiveClass() {
    let activeclass = document.querySelector(".active");

    if(activeclass != null) {
        activeclass.classList.remove("active");
    }
}

// Making navabar responsive STEP 1

const hamburgericon = document.querySelector(".hamburger-kaali");
const navlinks = document.querySelector(".navbar-ul-kaali");
const links = document.querySelectorAll(".component-link-item-mobile");
const sidebarlinks = document.querySelectorAll(".sidebar-list-items");
sidebarlinks.forEach((link) => {
    link.addEventListener("click", () => {
        removeActiveClass();
    });
});
if (hamburgericon != null ) {
    hamburgericon.addEventListener("click", () => {
        navlinks.classList.toggle("open");
        links.forEach((link) => {
            link.classList.add("fade");
        });

        //hamburger Animation
        hamburgericon.classList.toggle("toggle");
    });
}


//Carousel
const track = document.querySelector(".carousel-track");

const slides = Array.from(track?.children || []);
console.log({slides});

const nextButton = document.querySelector(".carousel-button-right");
const prevButton = document.querySelector(".carousel-button-left");

const dotsNav = document.querySelector(".carousel-nav");
const dots = Array.from(dotsNav?.children || []);

const slideSize = slides[0]?.getBoundingClientRect();

const slideWidth = slideSize?.width;

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + "px";
};
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    const amountToMove = targetSlide.style.left;
    track.style.transform = "translateX(-" + amountToMove + ")";
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");
};

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove("current-slide");
    targetDot.classList.add("current-slide");
};

const toggleArrows = (targetIndex, prevButton, nextButton, slides) => {
    if (targetIndex === 0) {
        prevButton.classList.add("hide");
        nextButton.classList.remove("hide");
    }
    else if (targetIndex === slides.length - 1) {
        nextButton.classList.add("hide");
        prevButton.classList.remove("hide");
    }
    else {
        nextButton.classList.remove("hide");
        prevButton.classList.remove("hide");
    }
};

nextButton?.addEventListener("click", () => {
    const currentSlide = track.querySelector(".current-slide");
    const nextSlide = currentSlide.nextElementSibling;
    if (nextSlide !== null) {
        moveToSlide(track, currentSlide, nextSlide);
        const currentDot = dotsNav.querySelector(".current-slide");
        const nextDot = currentDot.nextElementSibling;
        updateDots(currentDot, nextDot);
        const targetIndex = dots.findIndex((dot) => nextDot === dot);
        toggleArrows(targetIndex, prevButton, nextButton, slides);
    }
});

prevButton?.addEventListener("click", () => {
    const currentSlide = track.querySelector(".current-slide");
    const prevSlide = currentSlide.previousElementSibling;

    if (prevSlide !== null) {
        moveToSlide(track , currentSlide, prevSlide);
        const currentDot = dotsNav.querySelector(".current-slide");
        const prevDot = currentDot.previousElementSibling;
        updateDots(currentDot, prevDot);

        const targetIndex = dots.findIndex((dot) => prevDot === dot);
        toggleArrows(targetIndex, prevButton, nextButton, slides);
    };
});

dotsNav?.addEventListener("click", (event) => {
    const currentSlide = track.querySelector(".current-slide");
    const currentDot = dotsNav.querySelector(".current-slide");
    const targetDot = event.target.closest("button");
    //on complete dotsNav where ever I click except button (specific dots) it will return null.

    const targetIndex = dots.findIndex((dot) => dot ===  targetDot);
    const targetSlide = slides[targetIndex];
    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    toggleArrows(targetIndex, prevButton, nextButton, slides);
});





//---------------------------------------------------------------
// dark mode

function removeClassNameFromElement(element, className) {
    element?.classList.remove(className);
}

function addClassNameToElement(element, className) {
    element?.classList.add(className);
}

function checkIfClassExistsOnElement(element, className) {
    return element?.classList.contains(className);
}

function setItemtoLocalStorage(item, value) {
    localStorage.setItem(item, value);
}


const toggleMode = document.querySelectorAll(".btn.btn-toggle#theme-toggler");
//console.log({toggleMode})
const mainBodyKaali = document.querySelector(".body-style-development-purpose");
const darkIcons = document.querySelectorAll("#dark-icon");
const currentTheme = localStorage.getItem("theme");
if(currentTheme === "light") {
    addClassNameToElement(mainBodyKaali, "light");
    darkIcons?.forEach(darkIcon => {
        removeClassNameFromElement(darkIcon, "fa-sun");
    });
    darkIcons?.forEach(darkIcon => {
        addClassNameToElement(darkIcon, "fa-moon");
    });

    setItemtoLocalStorage("theme", "light");
}

else {
    mainBodyKaali?.classList.remove("light");
}

toggleMode?.forEach((element) => {
    element?.addEventListener("click", () => {
        darkIcons?.forEach(darkIcon => {
            if(checkIfClassExistsOnElement(darkIcon, "fa-sun")) {
                removeClassNameFromElement(darkIcon, "fa-sun");
                addClassNameToElement(darkIcon, "fa-moon");
                setItemtoLocalStorage("theme", "light");
            }
            else {
                addClassNameToElement(darkIcon, "fa-sun");
                removeClassNameFromElement(darkIcon, "fa-moon");
                setItemtoLocalStorage("theme", "dark");
            }
        });
        mainBodyKaali?.classList.toggle("light");
    });
});


