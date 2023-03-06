const body = document.querySelector("body");

const hambugerMenu = document.querySelector("[hamburger-menu]");
const mobileNav = document.querySelector("[header-navigation]");
const header = document.querySelector(".header");

const cartBtn = document.querySelector("[cart-btn]");
const cartContainer = document.querySelector("[cart-container]");

const carouselButtons = document.querySelectorAll("[data-caorusel-button]");
const carouselParent = document.querySelector("[carousel-parent]");
const slides = carouselParent.querySelectorAll("[carousel-child]");

const caoruselThumbnails = document.querySelectorAll("[carousel-thumbnail]");
const modalCarouselBtns = document.querySelectorAll("[data-modal-carousel-button]");
const modalCaoruselThumbnails = document.querySelectorAll("[modal-carousel-thumbnail]");

const modal = document.querySelector("[modal-container]");
const closeModal = document.querySelector(".closeModal");

const addSubtractBtn = document.querySelectorAll("[data-button-item]");
const numberOfItem = document.querySelector("[data-number-of-item]");

const checkOutItemNumber = document.querySelector(".number-of-items");
const checkOutTotalPrice = document.querySelector(".total-price");
let value1 = document.querySelector("[data-number-of-item]");

const addToCartBtn = document.querySelector("[add-to-cart]");
const cartItem = document.querySelector(".cart__wrapper");
const emptyCartText = document.querySelector(".empty-cart");

const trashBtn = document.querySelector("[trash-button]");
const cartNotif = document.querySelector("[cart-notif]");

addToCartBtn.disabled = true;

const storage = {
  numberOfItems: 0,
  totalPrice: 0,
};

trashBtn.addEventListener("click", () => {
  cartItem.classList.remove("active");
  emptyCartText.classList.remove("disable");
  cartNotif.classList.remove("active");
});

addSubtractBtn.forEach((button) => {
  button.addEventListener("click", () => {
    let value = parseInt(numberOfItem.getAttribute("data-number-of-item"));
    // const addOrSubtract = button.dataset.buttonItem === "add" ? 1 : -1;
    // numberOfItem.textContent = value;

    if (button.dataset.buttonItem === "add") {
      const newVal = (numberOfItem.dataset.numberOfItem = value + 1);
      numberOfItem.innerText = newVal;
      storage.numberOfItems = newVal;
      storage.totalPrice = `$${125.0 * newVal}.00`;
      addToCartBtn.disabled = false;

      // checkOutItemNumber.innerText = newVal;
      // checkOutTotalPrice.innerText = `$${125.0 * newVal}.00`;
    }
    if (button.dataset.buttonItem === "subtract" && value !== 0) {
      const newVal = (numberOfItem.dataset.numberOfItem = value - 1);
      numberOfItem.innerText = newVal;
      storage.numberOfItems = newVal;
      storage.totalPrice = `$${125.0 * newVal}.00`;

      // checkOutItemNumber.innerText = newVal;
      // checkOutTotalPrice.innerText = `$${125.0 * newVal}.00`;
    }
  });
});

addToCartBtn.addEventListener("click", () => {
  value1.dataset.numberOfItem = "0";
  numberOfItem.innerText = 0;

  checkOutItemNumber.innerText = storage.numberOfItems;
  checkOutTotalPrice.innerText = storage.totalPrice;
  cartNotif.innerText = storage.numberOfItems;

  cartNotif.classList.add("active");
  cartItem.classList.add("active");
  emptyCartText.classList.add("disable");

  setTimeout(clearStorage, 1000);
});

function clearStorage() {
  storage.numberOfItems = 0;
  storage.totalPrice = 0;
  addToCartBtn.disabled = true;
  console.log("cleared");
}

if (window.innerWidth >= 1000) {
  slides.forEach((slide) => {
    slide.addEventListener("click", () => {
      modal.classList.add("active");
    });
  });
}

closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

hambugerMenu.addEventListener("click", () => {
  mobileNav.classList.toggle("active");
  header.classList.toggle("overlay");
  carouselParent.classList.toggle("zedidx");
  hambugerMenu.classList.toggle("active");
  body.classList.toggle("activeMobileMenu");
});

// document.addEventListener("click", (e) => {
//   const target = e.target;
//   const cartSvg = target.matches("[cart-svg]");
//   const cart = target.matches("[cart-btn]");
//   if (!cart || !cartSvg) {
//     cartContainer.classList.remove("active");
//   }
//   console.log(cart, cartSvg);
// });

cartBtn.addEventListener("click", () => {
  cartContainer.classList.toggle("active");
});

carouselButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const offset = button.dataset.caoruselButton === "next" ? 1 : -1;

    const activeSlide = carouselParent.querySelector("[data-active-pic]");
    let newIdx = [...slides].indexOf(activeSlide) + offset;

    if (newIdx < 0) {
      newIdx = slides.length - 1;
    }
    if (newIdx >= slides.length) {
      newIdx = 0;
    }

    slides[newIdx].dataset.activePic = true;
    // let newSlide = slides[newIdx];
    // storage.activeState = newSlide;
    delete activeSlide.dataset.activePic;
  });
});

caoruselThumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", (e) => {
    const target = e.target;
    const activeTumbnail = target.closest("[tumbnail-carousel-container]").querySelector("[data-active]");

    const thumbnailAttrbt = target.getAttribute("carousel-thumbnail");
    const activeSlide = carouselParent.querySelector("[data-active-pic]");

    const slide = thumbnail.closest("[carousel-parent]").querySelector(`[carousel-child='${thumbnailAttrbt}']`);
    if (slide.hasAttribute(`data-active-pic`)) return;
    else {
      slide.dataset.activePic = true;
      delete activeSlide.dataset.activePic;

      target.dataset.active = true;
      delete activeTumbnail.dataset.active;
    }
  });
});

modalCarouselBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const offset = button.dataset.modalCarouselButton === "next" ? 1 : -1;
    const modalParent = button.closest("[modal-carousel-parent]");
    const slides = modalParent.querySelectorAll("[modal-carousel-child]");
    const activeSlide = modalParent.querySelector("[ data-modal-active-pic]");
    const activeTumbnail = modalParent.querySelector("[modal-tumbnail-parent]").querySelector("[data-active]");

    let newIdx = [...slides].indexOf(activeSlide) + offset;
    if (newIdx < 0) newIdx = slides.length - 1;
    if (newIdx >= slides.length) newIdx = 0;

    slides[newIdx].dataset.modalActivePic = true;
    delete activeSlide.dataset.modalActivePic;

    const nextSlide = slides[newIdx].getAttribute("modal-carousel-child");
    const nextActiveTumbnail = document.querySelector(`[modal-carousel-thumbnail='${nextSlide}']`);
    nextActiveTumbnail.dataset.active = true;
    delete activeTumbnail.dataset.active;
  });
});

modalCaoruselThumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", (e) => {
    const target = e.target;

    const thumbnailParent = thumbnail.closest("[modal-carousel-parent]");
    const attributeNo = target.getAttribute(`modal-carousel-thumbnail`);

    const activeModalTumbnail = target.closest("[modal-tumbnail-parent]").querySelector("[data-active]");

    const pic = thumbnailParent.querySelector(`[modal-carousel-child='${attributeNo}']`);
    const activeSlide = thumbnailParent.querySelector("[ data-modal-active-pic]");

    if (pic.hasAttribute("data-modal-active-pic")) return;
    else {
      pic.dataset.modalActivePic = true;
      delete activeSlide.dataset.modalActivePic;

      target.dataset.active = true;
      delete activeModalTumbnail.dataset.active;
    }
  });
});
