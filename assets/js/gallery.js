/**
 * Rajan Maharjan - Photography Portfolio & 500px Integration
 * Features: Responsive Masonry Filter, Full-Screen Lightbox, Keyboard Controls, EXIF Overlay
 */

document.addEventListener('DOMContentLoaded', () => {
  const masonryContainer = document.querySelector('.photo-masonry');
  const filterTabs = document.querySelectorAll('.photo-filter-tab');
  const photoItems = document.querySelectorAll('.photo-item');

  // Lightbox elements
  const lightboxModal = document.getElementById('photoLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxLocation = document.getElementById('lightboxLocation');
  const lightboxExif = document.getElementById('lightboxExif');
  const lightbox500px = document.getElementById('lightbox500px');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  let currentPhotosList = [];
  let currentIndex = 0;

  // Initialize photo items list
  function updateVisiblePhotos() {
    currentPhotosList = Array.from(document.querySelectorAll('.photo-item:not([style*="display: none"])'));
  }

  // Filtering
  if (filterTabs.length > 0) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filterVal = tab.getAttribute('data-filter');

        photoItems.forEach(item => {
          if (filterVal === '*' || item.classList.contains(filterVal.replace('.', ''))) {
            item.style.display = 'block';
            setTimeout(() => { item.style.opacity = '1'; }, 10);
          } else {
            item.style.opacity = '0';
            item.style.display = 'none';
          }
        });

        updateVisiblePhotos();
      });
    });
  }

  // Open Lightbox
  function openLightbox(index) {
    if (!lightboxModal || currentPhotosList.length === 0) return;

    currentIndex = index;
    const targetItem = currentPhotosList[currentIndex];
    if (!targetItem) return;

    const fullSrc = targetItem.getAttribute('data-full-img') || targetItem.querySelector('img').src;
    const title = targetItem.getAttribute('data-title') || 'Photograph by Rajan Maharjan';
    const location = targetItem.getAttribute('data-location') || 'Nepal';
    const camera = targetItem.getAttribute('data-camera') || 'Mobile Photography';
    const link500px = targetItem.getAttribute('data-500px') || 'https://500px.com/p/rajan_maharjan';

    lightboxImg.src = fullSrc;
    lightboxImg.alt = title;
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxLocation) lightboxLocation.textContent = location;
    if (lightboxExif) lightboxExif.textContent = camera;
    if (lightbox500px) lightbox500px.href = link500px;

    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showNextPhoto() {
    if (currentPhotosList.length === 0) return;
    currentIndex = (currentIndex + 1) % currentPhotosList.length;
    openLightbox(currentIndex);
  }

  function showPrevPhoto() {
    if (currentPhotosList.length === 0) return;
    currentIndex = (currentIndex - 1 + currentPhotosList.length) % currentPhotosList.length;
    openLightbox(currentIndex);
  }

  // Click on items to open
  photoItems.forEach(item => {
    item.addEventListener('click', (e) => {
      updateVisiblePhotos();
      const idx = currentPhotosList.indexOf(item);
      if (idx !== -1) {
        openLightbox(idx);
      }
    });
  });

  // Modal control buttons
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNextPhoto(); });
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrevPhoto(); });

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextPhoto();
    if (e.key === 'ArrowLeft') showPrevPhoto();
  });

  // Initial update
  updateVisiblePhotos();
});
