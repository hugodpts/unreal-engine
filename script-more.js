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
