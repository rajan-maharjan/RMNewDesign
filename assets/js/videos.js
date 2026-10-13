/**
 * Rajan Maharjan - YouTube Video Gallery & Performance-Optimized Player
 * Lazy loads YouTube iframes to ensure zero initial page bloat and perfect Core Web Vitals
 */

document.addEventListener('DOMContentLoaded', () => {
  const filterTabs = document.querySelectorAll('.video-filter-tab');
  const videoCards = document.querySelectorAll('.video-card');
  const videoModal = document.getElementById('videoModal');
  const videoFrame = document.getElementById('videoFrame');
  const modalClose = document.querySelector('.video-modal-close');

  // Video Filtering
  if (filterTabs.length > 0) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filterVal = tab.getAttribute('data-filter');

        videoCards.forEach(card => {
          if (filterVal === '*' || card.classList.contains(filterVal.replace('.', ''))) {
            card.style.display = 'flex';
            setTimeout(() => { card.style.opacity = '1'; }, 10);
          } else {
            card.style.opacity = '0';
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Play Video in Modal
  function playVideo(youtubeId) {
    if (!videoModal || !videoFrame || !youtubeId) return;

    // Load privacy-enhanced YouTube embed with autoplay
    videoFrame.src = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function stopVideo() {
    if (!videoModal || !videoFrame) return;

    videoFrame.src = '';
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Bind click handlers on video trigger elements
  document.querySelectorAll('[data-youtube-id]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      const ytId = elem.getAttribute('data-youtube-id');
      playVideo(ytId);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', stopVideo);
  }

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        stopVideo();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
      stopVideo();
    }
  });
});
