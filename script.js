
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    // Update the active button
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    // Show only matching gallery items
    galleryItems.forEach((item) => {
      const category = item.dataset.category;

      if (selectedFilter === "all" || category === selectedFilter) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});



const backToTopButton = document.getElementById("back-to-top");

// Show the button after scrolling down
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("visible");
  } else {
    backToTopButton.classList.remove("visible");
  }
});

// Scroll smoothly to the top when clicked
backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


/* Full-screen Gallery Viewer */

const lightboxGalleryItems = Array.from(
    document.querySelectorAll(".gallery-item")
);

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxCounter = document.getElementById("lightbox-counter");

const closeButton = document.querySelector(".lightbox-close");
const prevButton = document.querySelector(".lightbox-prev");
const nextButton = document.querySelector(".lightbox-next");

let currentImageIndex = 0;
let visibleGalleryItems = [];

function getVisibleGalleryItems() {
    return lightboxGalleryItems.filter(item => {
        return item.style.display !== "none";
    });
}

function showLightboxImage(index) {
    if (visibleGalleryItems.length === 0) return;

    currentImageIndex =
        (index + visibleGalleryItems.length) %
        visibleGalleryItems.length;

    const item = visibleGalleryItems[currentImageIndex];
    const image = item.querySelector("img");
    const caption = item.querySelector("p");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = caption
        ? caption.textContent
        : image.alt;

    lightboxCounter.textContent =
        `${currentImageIndex + 1} / ${visibleGalleryItems.length}`;
}

function openLightbox(item) {
    visibleGalleryItems = getVisibleGalleryItems();

    currentImageIndex = visibleGalleryItems.indexOf(item);

    if (currentImageIndex === -1) return;

    showLightboxImage(currentImageIndex);

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

lightboxGalleryItems.forEach(item => {
    const image = item.querySelector("img");

    image.style.cursor = "zoom-in";

    image.addEventListener("click", () => {
        openLightbox(item);
    });
});

prevButton.addEventListener("click", () => {
    showLightboxImage(currentImageIndex - 1);
});

nextButton.addEventListener("click", () => {
    showLightboxImage(currentImageIndex + 1);
});

closeButton.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("active")) return;

    if (event.key === "Escape") {
        closeLightbox();
    } else if (event.key === "ArrowLeft") {
        showLightboxImage(currentImageIndex - 1);
    } else if (event.key === "ArrowRight") {
        showLightboxImage(currentImageIndex + 1);
    }
});
