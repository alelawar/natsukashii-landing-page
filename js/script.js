const words = document.querySelectorAll('.text-word');
  const totalWords = words.length;
  const scrollContainer = document.getElementById('scroll-container');
  
  // Target completion percentage (teks sudah muncul semua pada 60% scroll)
  const completionTarget = 0.55;
  
  // Semua kata mulai dengan opacity 0
  words.forEach(word => {
    word.style.opacity = '0';
    word.style.transition = 'opacity 0.3s ease-in-out';
  });
  
  function updateTextOpacity() {
    // Hitung progress scroll (0-1)
    const scrollHeight = scrollContainer.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY;
    const scrollProgress = Math.min(scrollTop / scrollHeight, 1);
    
    // Normalisasi progress untuk mencapai 1.0 pada 60% scroll
    const normalizedProgress = Math.min(scrollProgress / completionTarget, 1);
    
    // Persentase per kata
    const percentPerWord = 1 / totalWords;
    
    // Update opacity untuk setiap kata
    words.forEach(word => {
      const index = parseInt(word.getAttribute('data-index'));
      
      // Batas awal dan akhir untuk kata ini
      const startThreshold = index * percentPerWord;
      const endThreshold = (index + 1) * percentPerWord;
      
      // Tidak tampil jika scroll belum mencapai threshold
      if (normalizedProgress < startThreshold) {
        word.style.opacity = '0';
      }
      // Transisi opacity jika scroll berada di antara start dan end threshold
      else if (normalizedProgress >= startThreshold && normalizedProgress <= endThreshold) {
        // Normalisasi progress untuk kata ini (0-1)
        const wordProgress = (normalizedProgress - startThreshold) / percentPerWord;
        word.style.opacity = wordProgress.toString();
      }
      // Tampilkan penuh jika sudah melewati end threshold
      else {
        word.style.opacity = '1';
      }
    });
  }
  
  // Pasang event listener untuk scroll
  window.addEventListener('scroll', updateTextOpacity);
  
  // Panggil sekali saat halaman dimuat
  updateTextOpacity();