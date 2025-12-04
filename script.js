$(document).ready(function () {
  const $imgs = $(".draggable");
  let currentAudio = null;
  let activeImg = null;

  // Posição inicial aleatória
  $imgs.each(function () {
    const left = `${Math.random() * 70 + 10}%`;
    const top = `${Math.random() * 60 + 10}%`;
    $(this).css({ left, top });
  });

  // Draggable com controlo de camadas
  $imgs.draggable({
    containment: ".container",

    start: function () {
      // A imagem arrastada vem para a frente
      $(this).css("z-index", 9999);
    },

    stop: function () {
      // Quando parar:
      // - Se for a imagem ativa, mantém-se na frente
      // - Se não for, volta ao valor base
      if (!$(this).hasClass("active")) {
        $(this).css("z-index", "");
      }
    }
  });

  // Clique → tocar som + destacar imagem
  $imgs.on("click", function () {
    const $el = $(this);
    const soundSrc = $el.data("sound");

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    if (activeImg) {
      activeImg.removeClass("active glow");
      // repõe o z-index da anterior
      activeImg.css("z-index", "");
    }

    currentAudio = new Audio(soundSrc);
    currentAudio.play();

    // destacar imagem atual
    $el.addClass("active glow");

    // garantir que a imagem ativa fica no topo
    $el.css("z-index", 9998);

    activeImg = $el;

    setTimeout(() => $el.removeClass("glow"), 300);
  });
});


