
const menuIcon = document.querySelector(".menu-icon");
const closeIcon = document.querySelector(".close");
const tl = gsap.timeline({ paused: true });


menuIcon.addEventListener("click", menuCall);
closeIcon.addEventListener("click", closeCall);

tl.to(".nav-bar", {
    x: 0,
    width: "100vw",
    opacity: 1,
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // duration: 0.5
    ease: "power3.out"
})
tl.to(".nav-bar button", {
    display: "block",
    duration: 0.3
});

function menuCall() {
    menuIcon.style.display = "none";
    closeIcon.style.display = "inline-block";
    closeIcon.style.transform = "translateY(0)";
    closeIcon.style.scale = 1;
    closeIcon.style.opacity = 1;

    tl.play();
}

function closeCall() {
    tl.from("nav", {
        x: 350,
        opacity: 0,
        duration: .1,
        ease: "power4.out"
    }, "-=0.4")
    tl.reverse()
    setTimeout(() => {
        menuIcon.style.display = "inline-block";
        closeIcon.style.display = "none";
    }, 1000);
}



const pageTl = gsap.timeline();

pageTl.to("main, section", {
    opacity: 1,
    scale: 1,
    x: 0,
    // duration: .7,
    ease: "power3.out"
})
pageTl.to(".header ,nav button, #shorting, .gBtn, .gro-card", {
    stagger: .2,
    opacity: 1,
    scale: 1,
    ease: "power4.out",
    y: 0
})

