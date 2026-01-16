window.addEventListener("load", function () {
  gnbHandler();
});
window.addEventListener("resize", function () {
  gnbHandler();
  resetEvent();
});

window.addEventListener("scroll", function () {
  headerHandler();
});

// menu control
const navWrap = document.querySelector(".nav-items-wrap");
const nav = document.querySelector(".nav-inner");
const gnbItems = document.querySelectorAll(".gnb-items > li");
function clickMenuControl(event) {
  const target = event.currentTarget;
  if (target.classList.contains("btn__menu-open")) {
    scrollT = window.scrollY;
    navWrap.classList.add("is-open");
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.position = "fixed";
    document.documentElement.style.top = -scrollT;
  } else if (target.classList.contains("btn__menu-close") || target.classList.contains("dimmed")) {
    navWrap.classList.remove("is-open");
    document.documentElement.style.overflow = "";
    document.documentElement.style.position = "";
    document.documentElement.style.top = "";
    window.scrollTo(0, scrollT);
  }
}

// menu control
function clickSearchHandler(event) {
  const target = event.currentTarget;
  const srchBox = document.querySelector(".header__search-layer");
  if (target.classList.contains("btn-close-search")) {
    srchBox.classList.remove("is-open");
    return;
  }
  srchBox.classList.toggle("is-open");
}

function resetEvent() {
  gnbItems.forEach((item) => {
    item.classList.remove("is-on");
  });
  nav.classList.remove("is-open");
  navWrap.classList.remove("is-open");
  document.documentElement.style.overflow = "";
  document.documentElement.style.position = "";
  document.documentElement.style.top = "";
}

function gnbHandler() {
  // gnb
  //console.log("gnbHandler");
  if (gnbItems.length) {
    gnbItems.forEach((menu, idx) => {
      const children = menu.querySelector("a");
      if (!children) return;
      if (window.innerWidth > 991) {
        children.addEventListener("mouseenter", function (e) {
          //console.log(window.innerWidth);
          const target = e.currentTarget;
          menu.classList.add("is-on");

          const siblings = [...gnbItems].filter((x) => x !== menu);
          siblings.forEach((s) => {
            s.classList.remove("is-on");
          });
        });
      } else {
        children.addEventListener("click", function (e) {
          //console.log(window.innerWidth);
          const target = e.currentTarget;
          menu.classList.toggle("is-on");

          const siblings = [...gnbItems].filter((x) => x !== menu);
          siblings.forEach((s) => {
            s.classList.remove("is-on");
          });
        });
      }
    });
  }
  if (nav) {
    nav.addEventListener("mouseleave", function () {
      gnbItems.forEach((item) => {
        item.classList.remove("is-on");
      });
    });
  }
}

function headerHandler() {
  const header = document.querySelector("#header.header-renew");
  const headerHeight = header.offsetHeight;
  //console.log(headerHeight);
  if (!header) return;
  if (window.scrollY > headerHeight + 5) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
}
