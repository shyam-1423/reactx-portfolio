// Cursor animation
const cursorSmall = document.querySelector(".cursor-small");
const cursorBig = document.querySelector(".cursor-big");
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Small cursor follows mouse instantly
  cursorSmall.style.left = mouseX - 5 + "px";
  cursorSmall.style.top = mouseY - 5 + "px";
});

// Smooth animation for the bigger cursor
function animateCursor() {
  // Calculate the distance between current position and target
  const dx = mouseX - cursorX;
  const dy = mouseY - cursorY;

  // Move cursor position a fraction of the way to the target
  cursorX += dx * 0.1;
  cursorY += dy * 0.2;

  // Apply the position to the big cursor
  cursorBig.style.left = cursorX - 20 + "px";
  cursorBig.style.top = cursorY - 20 + "px";

  requestAnimationFrame(animateCursor);
}

animateCursor();

let lastScroll = 0;
const navbar = document.querySelector(".navbar");
const scrollProgress = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {
  // Update scroll progress
  const scrollPercent =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;
  scrollProgress.style.width = `${scrollPercent}%`;

  // Handle navbar hide/show
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll && currentScroll > 100) {
    navbar.classList.add("navbar-hidden");
  } else {
    navbar.classList.remove("navbar-hidden");
  }

  // Add glass effect when scrolled
  if (currentScroll > 50) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }

  lastScroll = currentScroll;
});

// Mobile menu handling
const toggler = document.querySelector(".navbar-toggler");
const body = document.body;
let backdrop;

// Create backdrop element
function createBackdrop() {
  backdrop = document.createElement("div");
  backdrop.className = "menu-backdrop";
  document.body.appendChild(backdrop);
}

createBackdrop();

toggler.addEventListener("click", () => {
  body.classList.toggle("menu-open");
  backdrop.classList.toggle("show");
});

backdrop.addEventListener("click", () => {
  toggler.click();
});

// Close mobile menu and update active link on click
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    // Close mobile menu if open
    const navbarCollapse = document.querySelector(".navbar-collapse");
    if (navbarCollapse.classList.contains("show")) {
      toggler.click();
    }

    // Remove active class from all links, add to clicked link
    document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// Smooth scrolling

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Set initial active link (optional: Home by default)
document.querySelector('.nav-link[href="#Home"]').classList.add("active");

// Fade in elements when scrolling


document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".experience-card");

  // Check if we're on a mobile device to apply different settings
  const isMobile = window.innerWidth <= 768;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          // Optional: Once all cards are visible, we can show scrollbar again
          if (document.querySelectorAll(".experience-card.visible").length === cards.length) {
            document.querySelector(".container").classList.remove("hide-scrollbar");
          }
        }
      });
    },
    {
      threshold: isMobile ? 0.1 : 0.2, // Lower threshold on mobile for earlier trigger
      rootMargin: isMobile ? "0px 0px -50px 0px" : "0px 0px -100px 0px",
    }
  );

  cards.forEach((card, index) => {
    // Add alternating top/down animation classes
    if (index % 2 === 0) {
      card.classList.add("from-top");
    } else {
      card.classList.add("from-bottom");
    }

    // Add staggered delay based on index
    card.style.transitionDelay = `${0.1 * index}s`;

    observer.observe(card);
  });

  // Handle window resize events
  window.addEventListener("resize", function () {
    // Adjust for changes between mobile and desktop
    const newIsMobile = window.innerWidth <= 768;

    if (newIsMobile !== isMobile) {
      // Refresh the page or adjust settings as needed
      location.reload();
    }
  });

  // Optional: Hide scrollbar initially and show after animations
  if (isMobile) {
    document.querySelector(".container").classList.add("hide-scrollbar");

    // Show scrollbar after all animations are likely complete
    setTimeout(() => {
      document.querySelector(".container").classList.remove("hide-scrollbar");
    }, 1000 + (cards.length * 100)); // Base time + time per card
  }
});


// Smooth scrolling for links (if any are added later)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Accurate icon orbit animation
const icons = document.querySelectorAll('.icons foreignObject');
const svg = document.querySelector('svg');
const orbits = document.querySelectorAll('.orbit-path');
const viewBoxWidth = 1200;
const viewBoxHeight = 400;

function updateOrbits() {
  const svgRect = svg.getBoundingClientRect();
  const scaleX = svgRect.width / viewBoxWidth;
  const scaleY = svgRect.height / viewBoxHeight;

  icons.forEach((icon, index) => {
    const orbitIndex = parseInt(icon.getAttribute('data-orbit'));
    const ellipse = orbits[orbitIndex];
    const cx = parseFloat(ellipse.getAttribute('cx'));
    const cy = parseFloat(ellipse.getAttribute('cy'));
    let rx = parseFloat(ellipse.getAttribute('rx'));
    let ry = parseFloat(ellipse.getAttribute('ry'));

    // Adjust radii based on current animation state
    const rxAnim = ellipse.querySelector('animate[attributeName="rx"]');
    const ryAnim = ellipse.querySelector('animate[attributeName="ry"]');
    const rxValues = rxAnim.getAttribute('values').split(';').map(Number);
    const ryValues = ryAnim.getAttribute('values').split(';').map(Number);
    const animProgress = (Date.now() % (parseFloat(rxAnim.getAttribute('dur')) * 1000)) / (parseFloat(rxAnim.getAttribute('dur')) * 1000);
    rx = rxValues[0] + (rxValues[1] - rxValues[0]) * Math.sin(animProgress * Math.PI * 2);
    ry = ryValues[0] + (ryValues[1] - ryValues[0]) * Math.sin(animProgress * Math.PI * 2);

    const angleOffset = (index / icons.length) * 360;
    const speed = 0.3 - (orbitIndex * 0.05);

    function animateIcon() {
      const time = Date.now() * 0.001 * speed;
      const angle = angleOffset + time * 180 / Math.PI;
      const theta = angle * Math.PI / 180;

      // Calculate position on ellipse
      const x = cx + rx * Math.cos(theta);
      const y = cy + ry * Math.sin(theta);

      // Center the icon
      icon.setAttribute('x', x - 12);
      icon.setAttribute('y', y - 12);

      requestAnimationFrame(animateIcon);
    }

    requestAnimationFrame(animateIcon);
  });
}

// Initial call and resize listener
updateOrbits();
window.addEventListener('resize', updateOrbits);

// Back to Top Button Logic 
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) { // Show button after scrolling 300px
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// Get the view more button and all experience cards
const viewMoreBtn = document.querySelector('.ViewMore');
const experienceCards = document.querySelectorAll('.experience-card');

// Set initial number of visible cards and increment
const initialVisibleCards = 4;
const cardsToShow = 4;

// Hide cards beyond initial visible count
experienceCards.forEach((card, index) => {
  if (index >= initialVisibleCards) {
    card.style.display = 'none';
  } else {
    card.classList.remove('hidden');
  }
});

// Add click event listener to the button
viewMoreBtn.addEventListener('click', function () {
  let hiddenCards = Array.from(experienceCards).filter(
    card => card.style.display === 'none'
  );

  // Show next batch of cards
  hiddenCards.slice(0, cardsToShow).forEach(card => {
    card.style.display = '';
    card.classList.remove('hidden');

    // Add fade-in animation
    card.style.animation = 'fadeIn 0.5s ease-in';
  });

  // Hide button if no more cards to show
  if (hiddenCards.length <= cardsToShow) {
    viewMoreBtn.style.display = 'none';
  }
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);


document.addEventListener("DOMContentLoaded", function () {
  const testimonials = [
    {
      name: "John Doe",
      position: "Faculty Member",
      quote:
        "Shyam is a highly skilled frontend developer with a keen eye for design and responsiveness. His work is both functional and visually appealing.",
      link: "#john"
    },
    {
      name: "Sarah Smith",
      position: "Team Leader",
      quote:
        "Shyam's expertise in HTML, CSS, jQuery, and Bootstrap ensures smooth, responsive, and dynamic web experiences.",
      link: "#sarah"
    },
    {
      name: "Michael Brown",
      position: "Teammate",
      quote:
        "Creative, detail-oriented, and efficient—Shyam brings innovative solutions to every project he works on.",
      link: "#michael"
    },
    {
      name: "Emily Jones",
      position: "Client",
      quote:
        "Shyam is a problem-solver who delivers high-quality, maintainable code while ensuring excellent user experience.",
      link: "#emily"
    },
  ];

  const wrapper = document.querySelector(".slides-wrapper");
  const container = document.querySelector(".slider-container") || wrapper.parentElement;

  const createSlide = (testimonial, index) => {
    return `
        <div class="slide" data-index="${index}">
          <a href="${testimonial.link}" class="testimonial-link">
            <div class="testimonial-card">
              <h5 class="author">${testimonial.name}</h5>
              <p class="position">${testimonial.position}</p>
              <p class="quote">${testimonial.quote}</p>
            </div>
          </a>
        </div>
      `;
  };

  function initializeSlider() {
    // Keep existing slides if they're already in the DOM
    if (wrapper.children.length === 0) {
      // Add original slides if there are none
      testimonials.forEach((testimonial, index) => {
        wrapper.innerHTML += createSlide(testimonial, index);
      });

      // Add duplicate slides for infinite loop
      testimonials.forEach((testimonial, index) => {
        wrapper.innerHTML += createSlide(testimonial, index);
      });
    }

    // Add necessary inline styles for links
    const links = wrapper.querySelectorAll(".testimonial-link");
    links.forEach(link => {
      link.style.textDecoration = "none";
      link.style.color = "inherit";
      link.style.display = "block";
      link.style.height = "100%";
    });
  }

  initializeSlider();

  function getSlideWidth() {
    // Get the actual width of slides based on responsive design
    const firstSlide = document.querySelector(".slide");
    return firstSlide.offsetWidth;
  }

  function getGapSize() {
    // Detect gap size based on media queries
    return window.innerWidth <= 768 ? 10 : 20;
  }

  function updateSliderDimensions() {
    return {
      slideWidth: getSlideWidth(),
      gap: getGapSize()
    };
  }

  let currentIndex = 0;
  let isTransitioning = false;
  let autoSlideInterval;

  // Variables for drag functionality
  let isDragging = false;
  let startPositionX = 0;
  let currentTranslateX = 0;
  let previousTranslateX = 0;
  let animationID = null;

  function updateSlides(instant = false) {
    const { slideWidth, gap } = updateSliderDimensions();

    wrapper.style.transition = instant ? "none" : "transform 0.5s ease";
    const translateX = -currentIndex * (slideWidth + gap);
    currentTranslateX = translateX;
    previousTranslateX = translateX;
    wrapper.style.transform = `translateX(${translateX}px)`;
  }

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;

    updateSlides();

    // Reset to first slide when reaching the end of duplicated slides
    if (currentIndex >= testimonials.length * 2 - 1) {
      setTimeout(() => {
        currentIndex = currentIndex % testimonials.length;
        updateSlides(true);
        isTransitioning = false;
      }, 500);
    } else {
      setTimeout(() => (isTransitioning = false), 500);
    }
  }

  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentIndex > 0) {
      currentIndex--;
    } else {
      // If at the beginning, jump to the end of original set
      currentIndex = testimonials.length - 1;
    }

    updateSlides();
    setTimeout(() => (isTransitioning = false), 500);
  }

  // Handle window resize
  window.addEventListener("resize", () => {
    updateSlides(true);
  });

  // Start auto-slide
  function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  // Pause auto-slide when user interacts
  function pauseAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }
  }

  function resumeAutoSlide() {
    startAutoSlide();
  }

  // Pause auto-slide when hovering
  container.addEventListener("mouseenter", pauseAutoSlide);
  container.addEventListener("mouseleave", resumeAutoSlide);

  // Drag functionality
  function dragStart(event) {
    if (isTransitioning) return;

    pauseAutoSlide();

    // Detect if it's a touch or mouse event
    startPositionX = event.type.includes('mouse')
      ? event.clientX
      : event.touches[0].clientX;

    isDragging = true;
    wrapper.style.transition = "none"; // Remove transition during drag
    animationID = requestAnimationFrame(animation);

    // Change cursor style
    wrapper.style.cursor = 'grabbing';

    // Prevent default behavior for mousedown (text selection, etc)
    if (event.type.includes('mouse')) {
      event.preventDefault();
    }

    // Set drag start flag to detect if we should prevent click
    wrapper.dataset.dragStart = Date.now().toString();
  }

  function dragMove(event) {
    if (!isDragging) return;

    // Prevent default to stop scrolling on mobile
    if (event.cancelable) {
      event.preventDefault();
    }

    // Get current position
    const currentPositionX = event.type.includes('mouse')
      ? event.clientX
      : event.touches[0].clientX;

    // Calculate how far we've dragged
    const diff = currentPositionX - startPositionX;

    // Set current position for use in animation
    currentTranslateX = previousTranslateX + diff;
  }

  function dragEnd(event) {
    if (!isDragging) return;

    isDragging = false;
    cancelAnimationFrame(animationID);

    // Record when drag ended to compare with click time
    wrapper.dataset.dragEnd = Date.now().toString();

    // Reset cursor
    wrapper.style.cursor = 'grab';

    // Calculate how far we dragged as a percentage of slide width
    const { slideWidth } = updateSliderDimensions();
    const movedDistance = currentTranslateX - previousTranslateX;

    // Determine if we should move to next/prev slide or snap back
    if (Math.abs(movedDistance) > slideWidth * 0.2) {
      if (movedDistance < 0) {
        // Dragged left (next slide)
        nextSlide();
      } else {
        // Dragged right (previous slide)
        prevSlide();
      }
    } else {
      // Not dragged far enough, snap back to current slide
      wrapper.style.transition = "transform 0.3s ease";
      wrapper.style.transform = `translateX(${previousTranslateX}px)`;
      isTransitioning = true;
      setTimeout(() => {
        isTransitioning = false;
      }, 300);
    }

    // Resume auto sliding after a delay
    setTimeout(resumeAutoSlide, 2000);
  }

  function animation() {
    if (isDragging) {
      setSliderPosition();
      requestAnimationFrame(animation);
    }
  }

  function setSliderPosition() {
    wrapper.style.transform = `translateX(${currentTranslateX}px)`;
  }

  // Handle click events
  wrapper.addEventListener('click', function (event) {
    // If this was a drag that ended recently, prevent the click
    const dragStart = parseInt(wrapper.dataset.dragStart || '0');
    const dragEnd = parseInt(wrapper.dataset.dragEnd || '0');
    const now = Date.now();

    // If the drag just ended very recently (within 300ms), this is likely an 
    // unintended click resulting from a drag, so prevent it
    if (dragEnd > 0 && (now - dragEnd) < 300) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }

    // Otherwise, allow the click to navigate if it's on a link
    if (event.target.tagName === 'A' || event.target.closest('a')) {
      // Normal link click - allow default behavior
      return true;
    }

    // For clicks on the card that aren't links, go to the slide's link
    const slide = event.target.closest('.slide');
    if (slide) {
      const link = slide.querySelector('a');
      if (link && link.href) {
        window.location.href = link.href;
        event.preventDefault();
      }
    }
  });

  // Mouse events with passive: false to prevent default scrolling
  wrapper.addEventListener('mousedown', dragStart);
  wrapper.addEventListener('mousemove', dragMove);
  wrapper.addEventListener('mouseup', dragEnd);
  wrapper.addEventListener('mouseleave', dragEnd);

  // Touch events
  wrapper.addEventListener('touchstart', dragStart, { passive: true });
  wrapper.addEventListener('touchmove', dragMove, { passive: false });
  wrapper.addEventListener('touchend', dragEnd);

  // Initial setup
  updateSlides(true);
  startAutoSlide();

  // Set initial grab cursor
  wrapper.style.cursor = 'grab';

  // Add necessary inline styles to wrapper for dragging
  wrapper.style.userSelect = 'none';
});
