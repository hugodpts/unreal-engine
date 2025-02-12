window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const glowBar = document.querySelector('.loader__gradient');

  // Temps configurables
  const animationDuration = 1000; // Durée de l'animation de la barre en ms
  const displayDuration = 1800; // Temps d'affichage total du loader en ms

  // Appliquer la durée d'animation à la barre avec une transition CSS
  glowBar.style.transition = `width ${animationDuration}ms linear`;
  glowBar.style.width = '100%'; // Démarrer l'animation de la barre

  // Masquer le loader après le temps défini
  setTimeout(() => {
    loader.classList.add("hide-loader")
    document.body.classList.remove('no-scroll'); // Réactiver le scroll si désactivé
    setTimeout(() => {
      loader.remove();
    }, 500);
  }, displayDuration);


});

$(document).ready(function () {
  $('#burger').click(function () {
    $('.mobile-menu').toggleClass('show');
    $(this).toggleClass('active');
  });
});

$(function () {
  function updateHeader() {
    if ($(window).scrollTop() >= $(window).height() * 0.8) {
      $(".headeranim").removeClass("active"); // Affiche la couleur finale à partir de 80% du viewport
    } else {
      $(".headeranim").addClass("active"); // Affiche le header transparent en dessous de 80%
    }
  }

  // Vérifie la position au chargement
  updateHeader();

  // Vérifie la position au scroll
  $(window).on("scroll", updateHeader);
});

window.addEventListener('scroll', () => {
  let scrollPosition = window.scrollY;
  let maxScroll = window.innerHeight;

  let blurAmount = Math.min(scrollPosition / maxScroll * 10, 10);

  let opacityAmount = Math.max(1 - (scrollPosition / (maxScroll * 0.75)), 0);

  document.querySelector('#home').style.setProperty('--blurAmount', `${blurAmount}px`);
  document.querySelector('#home').style.setProperty('--opacityAmount', opacityAmount);
});

$(function () {
  const updateStyles = () => {
    const scrollPosition = $(window).scrollTop(); // Position actuelle du défilement
    const windowHeight = $(window).height();
    const startShrink = 0.5 * windowHeight; // 50vh
    const endShrink = 0.9 * windowHeight; // 90vh

    // Points de largeur
    const fullWidth = $(window).width(); // 100vw
    const maxWidthLimit = 1000; // max-width de 1200px

    // Padding horizontal
    const minPadding = 0; // 0px
    const maxPadding = 60; // 60px

    if (scrollPosition < startShrink) {
      // Avant 50vh: max-width = 100vw, padding = 0
      $(".s-video").css("max-width", `${fullWidth}px`);
      $("#second").css("padding", `0 ${minPadding}px`);
    } else if (scrollPosition > endShrink) {
      // Après 90vh: max-width = 1200px, padding = 60px
      $(".s-video").css("max-width", `${maxWidthLimit}px`);
      $("#second").css("padding", `0 ${maxPadding}px`);
    } else {
      // Entre 50vh et 90vh: Interpolation progressive
      const progress = (scrollPosition - startShrink) / (endShrink - startShrink);
      const currentMaxWidth = fullWidth - progress * (fullWidth - maxWidthLimit);
      const currentPadding = minPadding + progress * (maxPadding - minPadding);

      $(".s-video").css("max-width", `${currentMaxWidth}px`);
      $("#second").css("padding", `0 ${currentPadding}px`);
    }
  };

  // Mettre à jour au chargement de la page et à chaque défilement
  $(window).on("scroll", updateStyles);
  $(window).on("resize", updateStyles); // Gérer les changements de taille de fenêtre
  updateStyles(); // Appel initial pour ajuster au chargement
});

$(function () {
  $('.btn-hover')
    .on('mouseenter', function (e) {
      var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
      $(this).find('span').css({ top: relY, left: relX })
    })
    .on('mouseout', function (e) {
      var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
      $(this).find('span').css({ top: relY, left: relX })
    });
});

const imagesToPreload = [
  'images/slider1.webp',
  'images/slider2.webp',
  'images/slider3.webp',
  'images/slider4.webp'
];

// Précharger les images
imagesToPreload.forEach((image) => {
  const img = new Image();
  img.src = image;
});

// Fonction pour gérer l'image sticky
function updateStickyImage() {
  const textBlocks = document.querySelectorAll(".text-block");
  const stickyImage = document.getElementById("image-display");
  const section = document.querySelector(".interactive-section");
  const sectionRect = section.getBoundingClientRect();

  // Si la section est entièrement hors de l'écran, afficher les images par défaut
  if (sectionRect.bottom < 0) {
    stickyImage.style.backgroundImage = `url('images/${textBlocks[textBlocks.length - 1].getAttribute("data-image")}')`;
    stickyImage.style.opacity = "1";
    return;
  } else if (sectionRect.top > window.innerHeight) {
    stickyImage.style.backgroundImage = `url('images/${textBlocks[0].getAttribute("data-image")}')`;
    stickyImage.style.opacity = "1";
    return;
  }

  // Si une partie de la section est visible, chercher le bloc visible
  let imageSet = false; // Permet de savoir si une image a été définie
  textBlocks.forEach((block) => {
    const rect = block.getBoundingClientRect();
    const isInViewport =
      rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;

    if (isInViewport) {
      const imageUrl = block.getAttribute("data-image");
      stickyImage.style.backgroundImage = `url('images/${imageUrl}')`;
      stickyImage.style.opacity = "1"; // S'assurer que l'image est visible
      imageSet = true;
    }
  });

  // Si aucun bloc n'est trouvé visible, afficher l'image du premier bloc par défaut
  if (!imageSet) {
    const sectionMidPoint = sectionRect.top + sectionRect.height / 2;
    if (sectionMidPoint > window.innerHeight / 2) {
      // Si on est encore au-dessus du centre de la section
      stickyImage.style.backgroundImage = `url('images/${textBlocks[0].getAttribute("data-image")}')`;
    } else {
      // Si on est en dessous du centre de la section
      stickyImage.style.backgroundImage = `url('images/${textBlocks[textBlocks.length - 1].getAttribute("data-image")}')`;
    }
    stickyImage.style.opacity = "1";
  }
}

// Initialiser l'image au chargement et mettre à jour au scroll
document.addEventListener("DOMContentLoaded", updateStickyImage);
document.addEventListener("scroll", updateStickyImage);
document.addEventListener("resize", updateStickyImage);


document.addEventListener("DOMContentLoaded", () => {
  const canvases = [
    document.getElementById("backgroundBlur1"),
    document.getElementById("backgroundBlur2"),
    document.getElementById("backgroundBlur3"),
    document.getElementById("backgroundBlur4"),
  ];
  const textBlocks = document.querySelectorAll(".text-block");
  const section = document.querySelector(".interactive-section");
  const sectionBottomLimit = 300; // Réduction en pixels de la partie basse de la section
  let activeCanvasIndex = -1; // Aucun canvas actif au début

  // Fonction de throttling pour réduire les recalculs fréquents lors du défilement
  let lastExecution = 0;
  function throttle(callback, delay) {
    return function (...args) {
      const now = Date.now();
      if (now - lastExecution >= delay) {
        lastExecution = now;
        callback(...args);
      }
    };
  }

  // Fonction qui gère la visibilité des canvases en fonction du défilement
  function updateCanvasVisibility() {
    const sectionRect = section.getBoundingClientRect();
    const sectionBottomAdjusted = sectionRect.bottom - sectionBottomLimit; // Ajustement en bas

    // Si la section est en dehors de la vue, cacher tous les canvas
    if (sectionBottomAdjusted < 0 || sectionRect.top > window.innerHeight) {
      canvases.forEach((canvas) => (canvas.style.opacity = "0"));
      activeCanvasIndex = -1;
      return;
    }

    // Identifier le bloc visible
    let visibleBlockIndex = -1;
    textBlocks.forEach((block, index) => {
      const rect = block.getBoundingClientRect();
      const isInViewport =
        rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;

      if (isInViewport) {
        visibleBlockIndex = index;
      }
    });

    // Si aucun bloc n'est visible, ne rien faire
    if (visibleBlockIndex === -1) return;

    // Activer le canvas correspondant
    if (visibleBlockIndex !== activeCanvasIndex) {
      canvases.forEach((canvas, index) => {
        canvas.style.opacity = index === visibleBlockIndex ? "0.2" : "0";
      });
      activeCanvasIndex = visibleBlockIndex;
    }
  }

  // Initialiser l'état et écouter les événements avec throttling
  const throttledUpdate = throttle(updateCanvasVisibility, 50);  // Limiter à une exécution toutes les 100 ms
  updateCanvasVisibility();
  window.addEventListener("scroll", throttledUpdate);
  window.addEventListener("resize", throttledUpdate);
});



//SLIDER

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const slideWidth = slides[0].getBoundingClientRect().width + 36; // Inclut la marge
  const btnLeft = document.getElementById('goleft');
  const btnRight = document.getElementById('goright');

  // Clone les slides pour l'effet infini
  slides.forEach(slide => {
    const cloneBefore = slide.cloneNode(true);
    const cloneAfter = slide.cloneNode(true);
    carousel.insertBefore(cloneBefore, slides[0]);
    carousel.appendChild(cloneAfter);
  });

  let currentIndex = slides.length;
  carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  // Variable pour gérer l'état de transition
  let isTransitioning = false;

  // Fonction pour réinitialiser après une transition
  const handleTransitionEnd = () => {
    if (currentIndex >= slides.length * 2) {
      currentIndex = slides.length;
      carousel.style.transition = 'none';
      carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    } else if (currentIndex < slides.length) {
      currentIndex = slides.length * 2 - 1;
      carousel.style.transition = 'none';
      carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
    isTransitioning = false; // Réactiver les boutons
  };

  carousel.addEventListener('transitionend', handleTransitionEnd);

  // Gère le défilement vers la droite
  btnRight.addEventListener('click', () => {
    if (isTransitioning) return; // Bloque si une transition est déjà en cours
    isTransitioning = true;

    currentIndex++;
    carousel.style.transition = 'transform 0.5s ease-in-out';
    carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  });

  // Gère le défilement vers la gauche
  btnLeft.addEventListener('click', () => {
    if (isTransitioning) return; // Bloque si une transition est déjà en cours
    isTransitioning = true;

    currentIndex--;
    carousel.style.transition = 'transform 0.5s ease-in-out';
    carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  });
});

// Données des slides
const slidesData = [
  {
    title: "Unreal Engine 5.5 is now available",
    tags: ["Featured", "News"],
    image: "images/s1.webp",
  },
  {
    title: "Fab content marketplace launches in October",
    tags: ["Indies", "Fab"],
    image: "images/s2.webp",
  },
  {
    title: "Featured free Unreal Engine Marketplace",
    tags: ["Assets", "Community"],
    image: "images/s3.webp",
  },
  {
    title: "Get over <br> 500 free animations",
    tags: ["Animation", "Learning"],
    image: "images/s4.webp",
  },
  // Ajoutez plus de slides ici
];

// Conteneur du carousel
const carousel = document.querySelector(".carousel");

// Fonction pour créer une slide
function createSlide({ title, tags, image }) {
  const slide = document.createElement("div");
  slide.className = "slide";

  slide.innerHTML = `
    <div class="slide-content" style="background-image: linear-gradient(0deg, rgba(6, 8, 10, 1) 0%, rgba(6, 8, 10, 0.41) 50%), url('${image}');">
      <div class="tags">
        ${tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
      </div>
      <h3 class="title">${title}</h3>
      <a href="tarif.html" class="button1 btn-hover">
                                    <span>Take a look</span>
                                    <svg width="11" height="11" viewBox="0 0 11 11" stroke="#06080A" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 10.5L10 1.5M10 1.5H1M10 1.5V10.5" stroke-width="1.3" />
                                    </svg>
                                    <span></span>
                                </a>
    </div>
  `;

  return slide;
}

// Générer et ajouter les slides au carousel
slidesData.forEach(slideData => {
  const slide = createSlide(slideData);
  carousel.appendChild(slide);
});

