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