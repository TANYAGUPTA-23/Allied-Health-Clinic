const blogCards = document.querySelectorAll('.blog-card');
const firstCard = blogCards[0];

// Initialize: first card active, others small
firstCard.classList.add('active');
blogCards.forEach(c => {
  if (c !== firstCard) c.classList.add('small');
});

// Function to update top-right visibility
function updateTopRight() {
  blogCards.forEach(card => {
    const topRight = card.querySelector('.top-right');
    if (!topRight) return;

    if (card.classList.contains('active')) {
      topRight.style.display = 'none'; // hide on active
    } else {
      topRight.style.display = 'block'; // show on small
    }
  });
}

// Initial update
updateTopRight();

// Hover logic
blogCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    blogCards.forEach(c => {
      c.classList.remove('active');
      c.classList.add('small');
    });
    card.classList.add('active');
    card.classList.remove('small');

    updateTopRight(); // update top-right display
  });

  card.addEventListener('mouseleave', () => {
    blogCards.forEach(c => {
      c.classList.remove('active');
      c.classList.add('small');
    });
    firstCard.classList.add('active');
    firstCard.classList.remove('small');

    updateTopRight(); // update top-right display
  });
});


  
  function toggleMenu() {
      const mobileMenu = document.querySelector('.mobile-menu');
      const hamburger = document.querySelector('.hamburger');
      mobileMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
      // Optional: Add body scroll lock when open
      document.body.classList.toggle('menu-open');
  }

  // Close menu on link or button click
  document.querySelectorAll('.mobile-menu a, .mobile-menu button').forEach(element => {
      element.addEventListener('click', () => {
          document.querySelector('.mobile-menu').classList.remove('active');
          document.querySelector('.hamburger').classList.remove('active');
          document.body.classList.remove('menu-open');
      });
  });

  // Close menu on resize to desktop
  window.addEventListener('resize', () => {
      if (window.innerWidth > 767) {
          document.querySelector('.mobile-menu').classList.remove('active');
          document.querySelector('.hamburger').classList.remove('active');
          document.body.classList.remove('menu-open');
      }
  });





  
// testimonial section
document.addEventListener('DOMContentLoaded', () => {
    // Testimonial Data Array
    const testimonials = [
        {
            name: "Jessica L",
            location: "Melbourne, Australia",
            quote: "This clinic is a lifesaver! The staff is caring, professional, and efficient. Every visit feels comforting, and the doctors provide excellent treatment with genuine concern for every patient’s well-being.",
            image: "./assets/p1.avif",
            alt: "Image of Sarah M, a happy patient"
        },
        {
            name: "Sarah M",
            location: "Sydney, Australia",
            quote: "This clinic is a lifesaver! The occupational therapy sessions were thorough, and I appreciated how they involved my entire family in the process. We saw great results, and my child is more confident and capable now.",
            image: "assets/patient.jpg",
            alt: "Image of David T, recovering from injury"
        },
        {
            name: "David T",
            location: "Perth, Australia",
            quote: "The speech pathology services were exceptional! The therapist was patient, understanding, and skilled, providing personalized sessions that improved communication.",
            image: "assets/p2.avif",
            alt: "Image of Jessica L, praising speech services"
        },
        {
            name: "Michael K",
            location: "Brisbane, Australia",
            quote: "Outstanding care from the moment I walked in! The warm welcome, professional staff, and attentive doctors made me feel valued.",
            image: "assets/p3.avif",
            alt: "Image of Michael K, receiving holistic care"
        }
    ];

    let currentIndex = 0;
    const prevArrow = document.getElementById('prev-arrow');
    const nextArrow = document.getElementById('next-arrow');
    const dotContainer = document.getElementById('pagination-dots');
    const quoteContainer = document.getElementById('quote-transition-container');
    const imageContainer = document.getElementById('image-transition-container');
    const imageCard = document.querySelector('.image-card');
    // Create a dedicated host for patient info above the image
    const patientInfoHost = document.createElement('div');
    patientInfoHost.id = 'patient-info-host';
    patientInfoHost.className = 'patient-info';
    // Insert patient info host after the image container so it appears below the image
    if (imageCard && imageContainer) {
        if (imageContainer.nextSibling) {
            imageCard.insertBefore(patientInfoHost, imageContainer.nextSibling);
        } else {
            imageCard.appendChild(patientInfoHost);
        }
    }

    /**
     * Renders the HTML structure for a single quote.
     * @param {Object} testimonial - The testimonial data object.
     * @param {number} index - The index of the testimonial.
     * @param {boolean} isActive - Whether this is the active slide.
     * @returns {string} The HTML string for the quote element.
     */
    const createQuoteElement = (testimonial, index, isActive) => `
        <div class="slide-content ${isActive ? 'active-quote' : ''}" data-index="${index}">
            <p class="patient-quote">${testimonial.quote}</p>
        </div>
    `;

    /**
     * Renders the HTML structure for a single image/info block.
     * @param {Object} testimonial - The testimonial data object.
     * @param {number} index - The index of the testimonial.
     * @param {boolean} isActive - Whether this is the active slide.
     * @returns {string} The HTML string for the image element.
     */
    const createImageElement = (testimonial, index, isActive) => `
        <div class="slide-image ${isActive ? 'active-image active-info' : ''}" data-index="${index}">
            <img class="patient-image" src="${testimonial.image}" alt="${testimonial.alt}" onerror="this.onerror=null;this.src='https://placehold.co/600x600/6A5ACD/FFFFFF?text=User+Image';" />
        </div>
    `;

    // Render patient info into the host (above the image)
    const renderPatientInfo = () => {
        const t = testimonials[currentIndex];
        if (!patientInfoHost) return;
        patientInfoHost.innerHTML = `
            <h3 class="patient-name">${t.name}</h3>
            <p class="patient-location">${t.location}</p>
        `;
    };

    /**
     * Renders all testimonial elements and initializes the carousel state.
     */
    const renderCarousel = () => {
        // 1. Render all quotes and images
        quoteContainer.innerHTML = testimonials.map((t, i) => createQuoteElement(t, i, i === currentIndex)).join('');
        imageContainer.innerHTML = testimonials.map((t, i) => createImageElement(t, i, i === currentIndex)).join('');

        // Render current patient info above image
        renderPatientInfo();

        // 2. Render Dots
        dotContainer.innerHTML = testimonials.map((_, i) =>
            `<div class="dot ${i === currentIndex ? 'active' : ''}" data-index="${i}"></div>`
        ).join('');

        // 3. Attach dot listeners
        document.querySelectorAll('.dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                const newIndex = parseInt(e.target.dataset.index);
                if (newIndex !== currentIndex) {
                    // Determine direction for smooth transition
                    const direction = newIndex > currentIndex ? 'left' : 'right';
                    goToSlide(newIndex, direction);
                }
            });
        });

        // 4. Update Arrows
        updateArrows();
    };

    /**
     * Manages the slide transition logic.
     * @param {number} newIndex - The index of the slide to move to.
     * @param {string} direction - 'left' (for next) or 'right' (for previous).
     */
    const goToSlide = (newIndex, direction) => {
        if (newIndex < 0 || newIndex >= testimonials.length || newIndex === currentIndex) return;

        const oldIndex = currentIndex;
        const oldQuote = quoteContainer.querySelector(`[data-index="${oldIndex}"]`);
        const newQuote = quoteContainer.querySelector(`[data-index="${newIndex}"]`);
        const oldImage = imageContainer.querySelector(`[data-index="${oldIndex}"]`);
        const newImage = imageContainer.querySelector(`[data-index="${newIndex}"]`);

        // Apply leaving transitions
        if (direction === 'left') {
            // Moving from oldIndex to newIndex (left/next)
            oldQuote.classList.add('slide-leave-left');
            newQuote.classList.add('slide-enter-right');
        } else {
            // Moving from oldIndex to newIndex (right/previous)
            oldQuote.classList.add('slide-leave-right');
            newQuote.classList.add('slide-enter-left');
        }

        // Update active class immediately for image (just fade/scale)
        oldImage.classList.remove('active-image', 'active-info');
        newImage.classList.add('active-image', 'active-info');

        // After a brief moment, transition the new quote into view and remove the old one
        setTimeout(() => {
            // 1. Cleanup old quote classes and deactivate
            oldQuote.classList.remove('active-quote', 'slide-leave-left', 'slide-leave-right');

            // 2. Set new quote as active and remove transition classes
            newQuote.classList.add('active-quote');
            newQuote.classList.remove('slide-enter-left', 'slide-enter-right');

            // 3. Update index and controls
            currentIndex = newIndex;
            renderPatientInfo();
            updateDots();
            updateArrows();

        }, 50); // Small delay to allow CSS transitions to start correctly
    };

    /**
     * Updates the active state of the pagination dots.
     */
    const updateDots = () => {
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    };

    /**
     * Updates the enabled/disabled state of the navigation arrows.
     */
    const updateArrows = () => {
        prevArrow.classList.toggle('disabled', currentIndex === 0);
        nextArrow.classList.toggle('disabled', currentIndex === testimonials.length - 1);
    };

    // Attach arrow listeners
    prevArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1, 'right');
        }
    });

    nextArrow.addEventListener('click', () => {
        if (currentIndex < testimonials.length - 1) {
            goToSlide(currentIndex + 1, 'left');
        }
    });

    // Initial render
    renderCarousel();
});
  