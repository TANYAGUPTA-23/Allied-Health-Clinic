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
    const testimonials = [
        {
            name: "Ethan M",
            location: "Toronto, Canada",
            quote: "This clinic is a lifesaver! The staff is caring, professional, and efficient. Every visit feels comforting, and the doctors provide excellent treatment with genuine concern for every patient’s well-being.",
            image: "./assets/p1.avif",
            alt: "Toronto, Canada"
        },
        {
            name: "Sarah M",
            location: "Sydney, Australia",
            quote: "This clinic is a lifesaver! The occupational therapy sessions were thorough, and I appreciated how they involved my entire family in the process. We saw great results, and my child is more confident and capable now.",
            image: "assets/patient.jpg",
            alt: "Sarah M"
        },
        {
            name: "Sophia R",
            location: "London, United Kingdom",
            quote: "The speech pathology services were exceptional! The therapist was patient, understanding, and skilled, providing personalized sessions that improved communication.",
            image: "assets/p2.avif",
            alt: "Sophia R"
        },
        {
            name: "Olivia T",
            location: "Sydney, Australia",
            quote: "Outstanding care from the moment I walked in! The warm welcome, professional staff, and attentive doctors made me feel valued.",
            image: "assets/p3.avif",
            alt: "Olivia T"
        }
    ];

    let currentIndex = 0;
    const prevArrow = document.getElementById('prev-arrow');
    const nextArrow = document.getElementById('next-arrow');
    const dotContainer = document.getElementById('pagination-dots');
    const quoteContainer = document.getElementById('quote-transition-container');
    const imageContainer = document.getElementById('image-transition-container');
    const imageCard = document.querySelector('.image-card');
    const patientInfoHost = document.createElement('div');
    patientInfoHost.id = 'patient-info-host';
    patientInfoHost.className = 'patient-info';
    if (imageCard && imageContainer) {
        if (imageContainer.nextSibling) {
            imageCard.insertBefore(patientInfoHost, imageContainer.nextSibling);
        } else {
            imageCard.appendChild(patientInfoHost);
        }
    }

    const createQuoteElement = (testimonial, index, isActive) => `
        <div class="slide-content ${isActive ? 'active-quote' : ''}" data-index="${index}">
            <p class="patient-quote">${testimonial.quote}</p>
        </div>
    `;

    const createImageElement = (testimonial, index, isActive) => `
        <div class="slide-image ${isActive ? 'active-image active-info' : ''}" data-index="${index}">
            <img class="patient-image" src="${testimonial.image}" alt="${testimonial.alt}" onerror="this.onerror=null;this.src='https://placehold.co/600x600/6A5ACD/FFFFFF?text=User+Image';" />
        </div>
    `;

    const renderPatientInfo = () => {
        const t = testimonials[currentIndex];
        if (!patientInfoHost) return;
        patientInfoHost.innerHTML = `
            <h3 class="patient-name">${t.name}</h3>
            <p class="patient-location">${t.location}</p>
        `;
    };

    const renderCarousel = () => {
        quoteContainer.innerHTML = testimonials.map((t, i) => createQuoteElement(t, i, i === currentIndex)).join('');
        imageContainer.innerHTML = testimonials.map((t, i) => createImageElement(t, i, i === currentIndex)).join('');
        renderPatientInfo();
        dotContainer.innerHTML = testimonials.map((_, i) =>
            `<div class="dot ${i === currentIndex ? 'active' : ''}" data-index="${i}"></div>`
        ).join('');
        document.querySelectorAll('.dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                const newIndex = parseInt(e.target.dataset.index);
                if (newIndex !== currentIndex) {
                    const direction = newIndex > currentIndex ? 'left' : 'right';
                    goToSlide(newIndex, direction);
                }
            });
        });
        updateArrows();
    };

    const goToSlide = (newIndex, direction) => {
        if (newIndex < 0 || newIndex >= testimonials.length || newIndex === currentIndex) return;
        const oldIndex = currentIndex;
        const oldQuote = quoteContainer.querySelector(`[data-index="${oldIndex}"]`);
        const newQuote = quoteContainer.querySelector(`[data-index="${newIndex}"]`);
        const oldImage = imageContainer.querySelector(`[data-index="${oldIndex}"]`);
        const newImage = imageContainer.querySelector(`[data-index="${newIndex}"]`);
        if (direction === 'left') {
            oldQuote.classList.add('slide-leave-left');
            newQuote.classList.add('slide-enter-right');
        } else {
            oldQuote.classList.add('slide-leave-right');
            newQuote.classList.add('slide-enter-left');
        }
        oldImage.classList.remove('active-image', 'active-info');
        newImage.classList.add('active-image', 'active-info');
        setTimeout(() => {
            oldQuote.classList.remove('active-quote', 'slide-leave-left', 'slide-leave-right');
            newQuote.classList.add('active-quote');
            newQuote.classList.remove('slide-enter-left', 'slide-enter-right');
            currentIndex = newIndex;
            renderPatientInfo();
            updateDots();
            updateArrows();
        }, 50);
    };

    const updateDots = () => {
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    };

    const updateArrows = () => {
        prevArrow.classList.toggle('disabled', currentIndex === 0);
        nextArrow.classList.toggle('disabled', currentIndex === testimonials.length - 1);
    };

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

    renderCarousel();
});
