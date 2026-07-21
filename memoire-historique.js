// memoire-historique.js

document.addEventListener("DOMContentLoaded", () => {

    // Animation d'apparition des cartes
    const cards = document.querySelectorAll(
        ".leader-card, .instrument-card"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    }, {
        threshold: 0.15
    });

    cards.forEach(card => {

        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";
        card.style.transition = "all .6s ease";

        observer.observe(card);

    });

    // Bouton retour en haut
    const topButton = document.createElement("button");

    topButton.innerHTML = "↑";
    topButton.id = "backToTop";

    document.body.appendChild(topButton);

    Object.assign(topButton.style, {
        position: "fixed",
        bottom: "30px",
        right: "30px",
        width: "55px",
        height: "55px",
        borderRadius: "50%",
        border: "none",
        background: "#ff8c00",
        color: "#000",
        fontSize: "24px",
        fontWeight: "bold",
        cursor: "pointer",
        display: "none",
        zIndex: "9999",
        boxShadow: "0 0 20px rgba(255,140,0,.5)"
    });

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            topButton.style.display = "block";

        } else {

            topButton.style.display = "none";

        }

    });

    topButton.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

    // Affichage automatique de l'année
    const year = document.querySelector(".current-year");

    if (year) {

        year.textContent = new Date().getFullYear();

    }

});
