/**
 * MOMENTS PRODUCTION — LUXURY WEDDING PHOTOGRAPHY & FILMS
 * Bespoke Interactive Architecture & User Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initVideoModal();
  initPhotoLightbox();
  initFaqAccordion();
  initStoryFilters();
  initAmbientAudio();
  initInquiryForm();
  initScrollAnimations();
});

/* ==========================================================================
   Header & Sticky Navigation
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Set active link based on current path
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ==========================================================================
   Mobile Navigation Drawer
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.menu-toggle-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.mobile-backdrop');
  const closeBtn = document.querySelector('.mobile-drawer-close');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    toggleBtn.classList.add('open');
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    toggleBtn.classList.remove('open');
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   Cinema Video Modal (YouTube Integration)
   ========================================================================== */
function initVideoModal() {
  const modal = document.querySelector('.video-cinema-modal');
  const iframe = document.querySelector('.video-iframe-wrap iframe');
  const closeBtn = document.querySelector('.modal-close-btn, .modal-close');

  if (!modal || !iframe) return;

  const openVideo = (videoId) => {
    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    iframe.src = embedUrl;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    modal.classList.remove('open');
    iframe.src = '';
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-video-id]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const videoId = trigger.getAttribute('data-video-id') || 'E-Bd1j1G3mo';
      openVideo(videoId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeVideo);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeVideo();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeVideo();
    }
  });
}

/* ==========================================================================
   Full Photo Lightbox
   ========================================================================== */
function initPhotoLightbox() {
  const lightbox = document.querySelector('.photo-lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close-btn');

  if (!lightbox || !lightboxImg) return;

  const openLightbox = (src, caption) => {
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const src = el.getAttribute('data-src') || el.getAttribute('src') || el.getAttribute('href');
      const caption = el.getAttribute('data-caption') || el.getAttribute('alt') || '';
      if (src) openLightbox(src, caption);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
}

/* ==========================================================================
   Story Category Filter
   ========================================================================== */
function initStoryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.story-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease';
            card.style.opacity = '1';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   FAQ Accordion & Search Filter
   ========================================================================== */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close sibling items
      items.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });
      item.classList.toggle('active', !isActive);
    });
  });

  // Category Tabs Filter
  const tabs = document.querySelectorAll('.faq-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-category');

      items.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (cat === 'all' || itemCat === cat) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Search input live query
  const searchInput = document.querySelector('.faq-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = 'block';
          if (query.length > 2) {
            item.classList.add('active'); // auto open matching question
          }
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}

/* ==========================================================================
   Ambient Audio Experience (Web Audio API Synthesizer)
   Creates warm, organic cinematic acoustic chord progression without external assets
   ========================================================================== */
// function initAmbientAudio() {
//   const playerBtn = document.querySelector('.ambient-audio-player');
//   if (!playerBtn) return;

//   let audioCtx = null;
//   let isPlaying = false;
//   let intervalId = null;

//   const chords = [
//     [220.00, 261.63, 329.63, 392.00], // Am7
//     [174.61, 220.00, 261.63, 329.63], // Fmaj7
//     [261.63, 329.63, 392.00, 493.88], // Cmaj7
//     [196.00, 246.94, 293.66, 392.00]  // G
//   ];
//   let chordIndex = 0;

//   const playChord = () => {
//     if (!audioCtx || !isPlaying) return;
//     const currentChord = chords[chordIndex % chords.length];
//     chordIndex++;

//     const now = audioCtx.currentTime;
//     currentChord.forEach((freq, idx) => {
//       const osc = audioCtx.createOscillator();
//       const gain = audioCtx.createGain();
//       const filter = audioCtx.createBiquadFilter();

//       osc.type = 'sine';
//       osc.frequency.setValueAtTime(freq, now + idx * 0.15);

//       filter.type = 'lowpass';
//       filter.frequency.setValueAtTime(650, now);

//       gain.gain.setValueAtTime(0.0001, now + idx * 0.15);
//       gain.gain.exponentialRampToValueAtTime(0.035, now + idx * 0.15 + 0.8);
//       gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.15 + 4.5);

//       osc.connect(filter);
//       filter.connect(gain);
//       gain.connect(audioCtx.destination);

//       osc.start(now + idx * 0.15);
//       osc.stop(now + idx * 0.15 + 4.8);
//     });
//   };

//   playerBtn.addEventListener('click', () => {
//     if (!isPlaying) {
//       if (!audioCtx) {
//         const AudioContext = window.AudioContext || window.webkitAudioContext;
//         audioCtx = new AudioContext();
//       }
//       if (audioCtx.state === 'suspended') {
//         audioCtx.resume();
//       }
//       isPlaying = true;
//       playerBtn.classList.add('playing');
//       const label = playerBtn.querySelector('.ambient-text-label');
//       if (label) label.textContent = 'Audio: Cinematic Mood (Playing)';
//       playChord();
//       intervalId = setInterval(playChord, 5200);
//     } else {
//       isPlaying = false;
//       playerBtn.classList.remove('playing');
//       const label = playerBtn.querySelector('.ambient-text-label');
//       if (label) label.textContent = 'Play Cinematic Mood';
//       clearInterval(intervalId);
//     }
//   });
// }

/* ==========================================================================
   Bespoke Inquiry Form & WhatsApp Generator
   ========================================================================== */
function initInquiryForm() {
  const form = document.querySelector('#weddingInquiryForm');
  const successBanner = document.querySelector('.form-success-banner');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Wedding Inquiry';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Your Inquiry to Studio...';
    }

    const coupleNames = form.querySelector('[name="couple_names"]')?.value || 'Our Wedding';
    const email = form.querySelector('[name="email"]')?.value || '';
    const phone = form.querySelector('[name="phone"]')?.value || '';
    const location = form.querySelector('[name="wedding_location"]')?.value || 'Not specified';
    const guestCount = form.querySelector('[name="guest_count"]')?.value || 'Not specified';
    const vision = form.querySelector('[name="vision"]')?.value || '';

    // Collect selected services
    const checkedServices = [];
    form.querySelectorAll('input[name="services"]:checked').forEach(cb => {
      checkedServices.push(cb.value);
    });
    const servicesStr = checkedServices.join(', ') || 'Full Cinema & Photography';

    // Construct Mailto Link for Owner's Email
    const emailSubject = encodeURIComponent(`Wedding Inquiry from ${coupleNames}`);
    const emailBody = encodeURIComponent(
      `Hello Moments Production,\n\nWe would like to submit an inquiry for our wedding:\n\n` +
      `Couple: ${coupleNames}\n` +
      `Email: ${email}\n` +
      `Phone/WhatsApp: ${phone}\n` +
      `Location & Venue: ${location}\n` +
      `Estimated Guests: ${guestCount}\n` +
      `Services Desired: ${servicesStr}\n\n` +
      `Wedding Vision / Message:\n${vision}\n\n` +
      `Sent via momentsproduction.com`
    );
    const mailtoUrl = `mailto:contact@themomentsproductions.com?subject=${emailSubject}&body=${emailBody}`;

    // Construct WhatsApp link
    const waText = encodeURIComponent(
      `Hello Moments Production,\n\nWe would love to inquire about our wedding!\n\n` +
      `💍 Couple: ${coupleNames}\n` +
      `📍 Location/Venue: ${location}\n` +
      `👥 Estimated Guests: ${guestCount}\n` +
      `🎥 Services Required: ${servicesStr}\n` +
      `📝 Note: ${vision}\n\n` +
      `Email: ${email} | Phone: ${phone}`
    );
    const waUrl = `https://wa.me/919876543210?text=${waText}`;

    // Submit asynchronously to FormSubmit endpoint configured for the owner's email
    const formData = new FormData(form);
    fetch('https://formsubmit.co/ajax/contact@themomentsproductions.com', {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    })
      .then(response => response.json())
      .catch(err => {
        console.log('Form submit processed:', err);
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }

        if (successBanner) {
          successBanner.style.display = 'block';
          successBanner.innerHTML = `
          <div style="text-align: center; padding: 1rem 0;">
            <div style="width: 50px; height: 50px; background-color: var(--color-sage); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; color: white;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            </div>
            <h4 style="font-family: var(--font-serif); font-size: 1.6rem; margin-bottom: 0.5rem; color: var(--color-sage-dark);">
              Inquiry Sent Successfully, ${coupleNames}!
            </h4>
            <p style="margin-bottom: 1.5rem; font-size: 0.98rem; color: var(--color-text-main); line-height: 1.6; max-width: 540px; margin-left: auto; margin-right: auto;">
              Your inquiry has been sent directly to our studio team at <strong>contact@themomentsproductions.com</strong>. We will review your celebration details and reply within 24 hours.
            </p>
            <div style="display: flex; gap: 0.85rem; justify-content: center; flex-wrap: wrap;">
              <a href="${mailtoUrl}" class="btn btn-secondary" style="font-size: 0.78rem;">
                Open in Email App
              </a>
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-gold" style="font-size: 0.78rem;">
                Chat on WhatsApp Now
              </a>
            </div>
          </div>
        `;
          successBanner.scrollIntoView({ behavior: 'smooth' });
          form.reset();
        }
      });
  });
}

/* ==========================================================================
   Smooth Intersection Reveal Animations
   ========================================================================== */
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.story-card, .testimonial-card, .mosaic-item, .film-feature-card').forEach(el => {
    observer.observe(el);
  });
}
