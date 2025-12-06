$(function () {

  // -------------------------------
  // 1. Tornar imagens arrastáveis
  // -------------------------------
  $(".draggable").draggable({
    start: function () {
      $(this).css("z-index", 5000);
    }
  });

  // -------------------------------
  // 2. Baralhar posições iniciais
  // -------------------------------
  const container = $(".container");

  container.children("img").each(function () {
    const randX = Math.random() * 400 - 200;
    const randY = Math.random() * 400 - 200;

    $(this).css({
      transform: `translate(-50%, -50%) translate(${randX}px, ${randY}px)`
    });
  });

  // -------------------------------
  // 3. Tocar áudio e parar o anterior
  // -------------------------------

  let currentAudio = null; // guarda o áudio ativo

  $(".sound-img").on("click", function () {
    const img = $(this);

    // --- Parar áudio anterior ---
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // --- Tocar novo áudio ---
    const soundFile = img.data("sound");
    const audio = new Audio(soundFile);
    currentAudio = audio;
    audio.play();

    // -------------------------------
    // 4. Aplicar zoom grande na imagem clicada
    // -------------------------------
    if (img.hasClass("enlarged")) {
      img.removeClass("enlarged");
    } else {
      $(".sound-img").removeClass("enlarged"); // só uma fica ampliada
      img.addClass("enlarged");
    }
  });

});
