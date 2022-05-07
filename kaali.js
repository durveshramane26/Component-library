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
console.log({toggleMode})
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


