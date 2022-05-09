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

//Alert.js 
// Close danger alert

if(document.querySelector('#btn-danger-close') != null) {
    document.querySelector('#btn-danger-close').addEventListener("click", () => {
        let alertbox = document.querySelector(".alert-content.alert-danger");
        alertbox.classList.add("fade-out-top");
        setTimeout(() => {
            if(alertbox.classList.contains("fade-out-top")) {
                document.querySelector(".alert-content.alert-danger").style.display = "none";
            }
        }, 1000);
        setTimeout(() => {
            resetDangerAlert();
            document.querySelector(".alert-content.alert-danger").style.display = "flex";
        }, 5000);
       
        //resertDangerAlert();
    });
}

//close Success Alert 
if (document.querySelector("#btn-success-close") != null) {
    document.querySelector("#btn-success-close").addEventListener("click", () => {
        resetSuccessAlert();
        document
        .querySelector(".alert-content.alert-success")
        .classList.add("fade-out-top");
        setTimeout(() => {
            //resetSuccessAlert();
            if(
                document
                .querySelector(".alert-content.alert-success")
                .classList.contains("fade-out-top")
            ) {
                document.querySelector(".alert-content.alert-success").style.display = "none";
            }
        }, 1000);

        setTimeout(() => {
            resetSuccessAlert();
            document.querySelector(".alert-content.alert-success").style.display = "flex";
        }, 5000);
    });
}

//Close info alert
if (document.querySelector("#btn-info-close") != null) {
    document.querySelector("#btn-info-close").addEventListener("click", () =>  {
        document
        .querySelector(".alert-content.alert-info")
        .classList.add("fade-out-top");
        setTimeout(() => {
            if(
                document
                .querySelector(".alert-content.alert-info")
                .classList.contains("fade-out-top")
            ) {
                document.querySelector(".alert-content.alert-info").style.display = "none";
            }
        }, 1000);

        setTimeout(() => {
            resetInfoAlert();
            document.querySelector(".alert-content.alert-info").style.display = "flex";
        }, 5000);
    });
}

// Close warning alert 
if (document.querySelector("#btn-warning-close") != null) {
    document.querySelector("#btn-warning-close").addEventListener("click", () => {
        document
        .querySelector(".alert-content.alert-warning")
        .classList.add("fade-out-top");
        setTimeout(() => {
            if (
                document
                .querySelector(".alert-content.alert-warning")
                .classList.contains("fade-out-top")
            ) {
                document.querySelector(".alert-content.alert-warning").style.display = "none";
            }
        }, 1000);

        setTimeout(() => {
            resetWarningAlert();
            document.querySelector(".alert-content.alert-warning").style.display = "flex";
        }, 5000);
    });
}

function resetAlert(className) {
    let alertbox = document.querySelector(`.${className}`);
    alertbox.classList.remove("fade-out-top");
}

function resetDangerAlert() {
    resetAlert("alert-danger");
}

function resetSuccessAlert() {
    resetAlert("alert-success");
}

function resetInfoAlert() {
    resetAlert("alert-warning");
}

function resetWarningAlert() {
    resetAlert("alert-warning");
}

//---------------------------------------------------------------



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


//modal.js
modalIsopen = false;
if (document.querySelector(".btn.btn-like") != null) {
    document.querySelector(".btn.btn-like").addEventListener("click", () => {
        removeFadeOutModal();
        removeFadeInFromModal();
        document.querySelector(".modal").style.display = "block";
        document.querySelector(".modal-bg").classList.add("modal-bg-active");
        modalIsopen = true;

        if (modalIsopen === true) {
            document.addEventListener("click", (event) => {
                /* If you click on modal-close or anything except modal iteself and open modal button close the modal */
                if (event.target.matches("#btn-modal-close") || !event.target.closest("modal, .btn.btn-like"))
                {
                    document.querySelector(".modal").style.display = "none";
                    removeFadeInFromModal();
                    document
                    .querySelector(".modal-bg")
                    .classList.remove("modal-bg-active");
                    modalIsopen = false;
                }
            });
        }
    });
}

function removeFadeInFromModal() {
    document.querySelector(".modal").classList.remove("fade-in");
}

function removeFadeOutModal() {
    document.querySelector(".modal").classList.remove("fade-out-top");
}

//close modal 

if (document.querySelector("#btn-modal-close") != null) {
    document.querySelector("#btn-modal-close").addEventListener("click", () => {
        removeFadeInFromModal();
        document.querySelector(".modal-bg").classList.remove("modal-bg-active");

        let alertbox = document.querySelector(".modal");
        if (alert != null) {
            alertbox.classList.add("fade-out-top");
            setTimeout(() => {
                if (alertbox.classList.contains(".fade-out-top")) {
                    document.querySelector(".modal").style.display = "none";
                }
            }, 1500);
        
        }
    });

    document
    .querySelector("#collection-btn-done")
    .addEventListener("click", () => {
        removeFadeOutModal();
        removeFadeInFromModal();
        let alertbox = document.querySelector(".modal");
        document.querySelector(".modal-bg").classList.remove("modal-bg-active");
        if (alertbox != null) {
            document.querySelector(".modal").classList.add("fade-out-top");
            setTimeout(() => {
                if(alertbox.classList.contains("fade-out-top")) {
                    document.querySelector(".modal").style.display = "none";
                }
            }, 1500);
        }
        let container = document.querySelector(".container");
        if (container) container.style.backgroundColor = "#2F3136";
        
    });
}






//---------------------------------------------------------------
//toast.js

function resetToast(className) {
    let element = document.querySelector(`.${className}`);
    element.style.visibility = "visible";
    setTimeout(() => {
        document.querySelector(`.${className}`).classList.add("fade-out-bottom");
    }, 1000);
    element.classList.remove("fade-out-bottom");
}
if (document.querySelector(".btn-primary.btn-toast") != null) {
    document
    .querySelector(".btn-primary.btn-toast")
    .addEventListener("click", () => {
        resetToast("toast-primary");
    });
    let target = document.querySelector(".btn-primary.btn-toast");
    removeEventListener(target, "click");
}

function removeEventListener(target, event) {
    target.removeEventListener(event, () => {});
}

if (document.querySelector(".btn-success.btn-toast") != null) {
    document
    .querySelector(".btn-success.btn-toast")
    .addEventListener("click", () => {
        resetToast("toast-success");
    });
}

if (document.querySelector(".btn-danger.btn-toast") != null) {
    document
    .querySelector(".btn-danger.btn-toast")
    .addEventListener("click", () => {
        resetToast("toast-failure");
    });
}




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


