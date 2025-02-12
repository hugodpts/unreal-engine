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

document.getElementById("cards").onmousemove = e => {
    for (const card of document.getElementsByClassName("card")) {
        const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    };
}

document.getElementById("cards2").onmousemove = e => {
    for (const card of document.getElementsByClassName("card")) {
        const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    };
}

document.addEventListener('DOMContentLoaded', function () {
    // Références des radios et du root
    const monthlyRadio = document.getElementById('switchMonthly');
    const yearlyRadio = document.getElementById('switchYearly');
    const root = document.documentElement;

    // Variables CSS pour les deux plans
    const monthlyValues = {
        '--contour-hover': 'rgba(188, 254, 5, 0.596)',
        '--shadow-color': 'rgba(188, 254, 5, 0.15)',
        '--shadow-colorv2': 'rgba(188, 254, 5, 0.05)',
        '--colorv2': '#BDFE05',
        '--colorv3': 'var(--ue-black)',
        '--colorv4': 'var(--ue-black)',
        '--btn-high': '#BDFE05',
        '--cards1': '0vw',
        '--cards2': '100vw',
        '--retard1': '0s',
        '--retard2': '0.6s',
        '--opacity1': '1',
        '--opacity2': '0'
    };

    const yearlyValues = {
        '--contour-hover': 'rgba(96, 17, 255, 0.767)',
        '--shadow-color': 'rgba(96, 17, 255, 0.15)',
        '--shadow-colorv2': 'rgba(96, 17, 255, 0.08)',
        '--colorv2': '#6011ff',
        '--colorv3': 'white',
        '--colorv4': 'white',
        '--btn-high': '#6011ff',
        '--cards1': '-100vw',
        '--cards2': '0vw',
        '--retard2': '0s',
        '--retard1': '0.6s',
        '--opacity2': '1',
        '--opacity1': '0'
    };

    // Fonction pour appliquer les variables CSS
    function updateCSSVariables(values) {
        Object.keys(values).forEach(key => {
            root.style.setProperty(key, values[key]);
        });
    }

    // Initialisation de l'état selon le bouton radio coché
    function initializeState() {
        if (yearlyRadio.checked) {
            updateCSSVariables(yearlyValues);
        } else {
            updateCSSVariables(monthlyValues);
        }
    }

    // Ajout d'un observateur pour détecter les changements d'état
    function observeRadioState() {
        // Fonction appelée lorsque l'utilisateur change un bouton radio
        monthlyRadio.addEventListener('change', () => {
            if (monthlyRadio.checked) updateCSSVariables(monthlyValues);
        });

        yearlyRadio.addEventListener('change', () => {
            if (yearlyRadio.checked) updateCSSVariables(yearlyValues);
        });
    }

    // Synchronisation au retour du navigateur
    window.addEventListener('pageshow', initializeState);

    // Initialisation au chargement de la page
    initializeState();
    observeRadioState();
});



$(function () {
    function updateHeader() {
        if ($(window).scrollTop() >= $(window).height() * 0.2) {
            $(".headeranim").removeClass("active"); // Affiche la couleur finale à partir de 80% du viewport
        } else {
            $(".headeranim").addClass("active"); // Affiche le header transparent en dessous de 80%
        }
    }

    // Vérifie la position au chargement
    updateHeader();

    // Vérifie la position au scroll
    $(window).on("scroll", updateHeader);
});


const radios = document.querySelectorAll('input[name="switchPlan"]');
let cooldown = false; // État de cooldown
const cooldownTime = 3000; // Temps en millisecondes (3 secondes)

radios.forEach((radio) => {
    radio.addEventListener('click', () => {
        if (cooldown) {
            // Empêche l'action si le cooldown est actif
            radio.checked = !radio.checked; // Annule le changement
            return;
        }

        // Active le cooldown
        cooldown = true;
        radios.forEach((r) => (r.disabled = true)); // Désactive les boutons radio

        // Réactive après la durée du cooldown
        setTimeout(() => {
            cooldown = false;
            radios.forEach((r) => (r.disabled = false)); // Réactive les boutons radio
        }, cooldownTime);
    });
});