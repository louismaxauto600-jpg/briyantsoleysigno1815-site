"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const translations = {
    ht: {
      navHome: "Akèy",
      navVision: "Vizyon",
      navCommitment: "Angajman",
      navPillars: "Prensip",
      navMovement: "Mouvman",
      navContact: "Kontak",

      heroEyebrow: "YON MOUVMAN. YON VIZYON. YON AVNI.",
      heroLead:
        "Nou pa tann demen pou nou kòmanse. Nou bati jodi a avèk vizyon, kouraj, teknoloji ak entèlijans.",
      readCommitment: "Li angajman an",
      joinMovement: "Antre nan mouvman an",
      heroSignature:
        "Bati pou jodi a. Pare pou demen. Toujou devan.",
      orbitMessage:
        "NOUVÈL MOND LAN • VIZYON • INOVASYON • PWOGRÈ",

      visionEyebrow: "VIZYON NOU",
      visionTitle: "Nou chwazi avanse",
      visionStatement:
        "DEVAN DEVAN NÈT se yon mouvman ki ankouraje chak moun leve tèt li, devlope kapasite li epi sèvi ak zouti modèn yo pou konstwi yon avni ki pi solid.",
      actionTitle: "Aksyon",
      actionText:
        "Nou transfòme lide an aksyon konkrè ki pote rezilta.",
      futureTitle: "Lavni",
      futureText:
        "Nou prepare jenerasyon jodi a pou opòtinite demen yo.",

      commitmentEyebrow: "DEKLARASYON ANGAJMAN",
      commitmentTitle:
        "Nou pap viv ap gade mond lan pase devan nou.",
      commitmentLead:
        "Nou refize rete prizonye laperèz, reta, konfizyon ak sistèm ki pa adapte ak epòk nou an.",
      commitmentLine1:
        "Nou kwè nan edikasyon ki louvri lespri.",
      commitmentLine2:
        "Nou kwè nan teknoloji ki ranfòse kapasite moun.",
      commitmentLine3:
        "Nou kwè nan disiplin, kolaborasyon ak responsablite.",
      commitmentLine4:
        "Nou kwè pwogrè kòmanse lè nou deside aji.",
      commitmentQuote:
        "“Nou pa la pou nou swiv tras lavni. Nou la pou nou trase chemen li.”",

      pillarsEyebrow: "PRENSIP MOUVMAN AN",
      pillarsTitle: "Kat fòs ki pouse nou devan",
      pillarVisionTitle: "Vizyon",
      pillarVisionText:
        "Wè pi lwen pase pwoblèm jodi a pou prepare solisyon demen yo.",
      pillarEducationTitle: "Edikasyon",
      pillarEducationText:
        "Aprann, pataje konesans epi devlope tout kapasite nou.",
      pillarInnovationTitle: "Inovasyon",
      pillarInnovationText:
        "Sèvi ak teknoloji ak entèlijans atifisyèl avèk sajès.",
      pillarUnityTitle: "Inite",
      pillarUnityText:
        "Rasanble eksperyans ansyen yo ak enèji nouvo jenerasyon an.",

      aiCommand: "SANT KÒMAND DIJITAL",
      aiTitle:
        "Teknoloji pa ranplase vizyon. Li bay vizyon plis pouvwa.",
      aiText:
        "Nou itilize entèlijans atifisyèl pou aprann pi vit, òganize pi byen, kreye plis opòtinite epi sèvi kominote nou an avèk plis efikasite.",
      aiAssistant: "AI ASISTAN",
      aiWriter: "AI REDAKTÈ",
      voiceStudio: "ESTIDYO VWA",
      digitalNetwork: "REZO DIJITAL",

      movementEyebrow: "MOMAN AN RIVE",
      movementTitle:
        "Pa rete dèyè. Pran plas ou nan mouvman an.",
      movementText:
        "DEVAN DEVAN NÈT se pou moun ki pare pou aprann, konstwi, kolabore epi avanse. Chak moun gen yon kapasite. Chak kapasite gen yon plas.",
      contactUs: "Kontakte nou",
      backPlatform:
        "Retounen nan BSS1815 PRO-MAX DMP",

      contactEyebrow: "KONEKTE AK NOU",
      contactTitle:
        "Kontak ofisyèl ak rezo sosyal yo",
      phoneTitle: "Nimewo telefòn",
      digitalTitle: "Kontak dijital",

      footerSlogan:
        "Bati pou jodi a. Pare pou demen.",
      founderCredit:
        "Yon vizyon Max Louis, alias Le Baron",
      backTop: "Retounen anlè ↑",
      rights: "Tout dwa rezève."
    },

    fr: {
      navHome: "Accueil",
      navVision: "Vision",
      navCommitment: "Engagement",
      navPillars: "Principes",
      navMovement: "Mouvement",
      navContact: "Contacts",

      heroEyebrow:
        "UN MOUVEMENT. UNE VISION. UN AVENIR.",
      heroLead:
        "Nous n’attendons pas demain pour commencer. Nous construisons aujourd’hui avec vision, courage, technologie et intelligence.",
      readCommitment: "Lire notre engagement",
      joinMovement: "Rejoindre le mouvement",
      heroSignature:
        "Construire pour aujourd’hui. Prêts pour demain. Toujours devant.",
      orbitMessage:
        "NOUVELLES DU MONDE • VISION • INNOVATION • PROGRÈS",

      visionEyebrow: "NOTRE VISION",
      visionTitle: "Nous choisissons d’avancer",
      visionStatement:
        "DEVAN DEVAN NÈT est un mouvement qui encourage chacun à se relever, à développer ses capacités et à utiliser les outils modernes pour bâtir un avenir plus solide.",
      actionTitle: "Action",
      actionText:
        "Nous transformons les idées en actions concrètes porteuses de résultats.",
      futureTitle: "Avenir",
      futureText:
        "Nous préparons la génération actuelle aux possibilités de demain.",

      commitmentEyebrow:
        "DÉCLARATION D’ENGAGEMENT",
      commitmentTitle:
        "Nous ne regarderons pas le monde avancer sans nous.",
      commitmentLead:
        "Nous refusons de rester prisonniers de la peur, des retards, de la confusion et de systèmes inadaptés à notre époque.",
      commitmentLine1:
        "Nous croyons en une éducation qui ouvre les esprits.",
      commitmentLine2:
        "Nous croyons en une technologie qui renforce les capacités humaines.",
      commitmentLine3:
        "Nous croyons en la discipline, la collaboration et la responsabilité.",
      commitmentLine4:
        "Nous croyons que le progrès commence lorsque nous décidons d’agir.",
      commitmentQuote:
        "« Nous ne sommes pas ici pour suivre les traces de l’avenir. Nous sommes ici pour en tracer le chemin. »",

      pillarsEyebrow:
        "PRINCIPES DU MOUVEMENT",
      pillarsTitle:
        "Quatre forces qui nous poussent vers l’avant",
      pillarVisionTitle: "Vision",
      pillarVisionText:
        "Voir au-delà des problèmes actuels afin de préparer les solutions de demain.",
      pillarEducationTitle: "Éducation",
      pillarEducationText:
        "Apprendre, partager les connaissances et développer toutes nos capacités.",
      pillarInnovationTitle: "Innovation",
      pillarInnovationText:
        "Utiliser la technologie et l’intelligence artificielle avec discernement.",
      pillarUnityTitle: "Unité",
      pillarUnityText:
        "Réunir l’expérience des anciens et l’énergie de la nouvelle génération.",

      aiCommand:
        "CENTRE DE COMMANDE NUMÉRIQUE",
      aiTitle:
        "La technologie ne remplace pas la vision. Elle lui donne davantage de puissance.",
      aiText:
        "Nous utilisons l’intelligence artificielle pour apprendre plus rapidement, mieux nous organiser, créer davantage de possibilités et servir notre communauté plus efficacement.",
      aiAssistant: "ASSISTANT IA",
      aiWriter: "RÉDACTEUR IA",
      voiceStudio: "STUDIO VOCAL",
      digitalNetwork: "RÉSEAU NUMÉRIQUE",

      movementEyebrow: "LE MOMENT EST VENU",
      movementTitle:
        "Ne restez pas en arrière. Prenez votre place dans le mouvement.",
      movementText:
        "DEVAN DEVAN NÈT s’adresse aux personnes prêtes à apprendre, construire, collaborer et avancer. Chaque personne possède une capacité. Chaque capacité a sa place.",
      contactUs: "Nous contacter",
      backPlatform:
        "Retour à BSS1815 PRO-MAX DMP",

      contactEyebrow: "RESTEZ CONNECTÉS",
      contactTitle:
        "Contacts officiels et réseaux sociaux",
      phoneTitle: "Numéros de téléphone",
      digitalTitle: "Contacts numériques",

      footerSlogan:
        "Construire pour aujourd’hui. Prêts pour demain.",
      founderCredit:
        "Une vision de Max Louis, alias Le Baron",
      backTop: "Retour en haut ↑",
      rights: "Tous droits réservés."
    },

    en: {
      navHome: "Home",
      navVision: "Vision",
      navCommitment: "Commitment",
      navPillars: "Principles",
      navMovement: "Movement",
      navContact: "Contact",

      heroEyebrow:
        "ONE MOVEMENT. ONE VISION. ONE FUTURE.",
      heroLead:
        "We do not wait for tomorrow to begin. We build today with vision, courage, technology and intelligence.",
      readCommitment: "Read our commitment",
      joinMovement: "Join the movement",
      heroSignature:
        "Building for today. Ready for tomorrow. Always forward.",
      orbitMessage:
        "WORLD NEWS • VISION • INNOVATION • PROGRESS",

      visionEyebrow: "OUR VISION",
      visionTitle: "We choose to move forward",
      visionStatement:
        "DEVAN DEVAN NÈT is a movement that encourages everyone to rise, develop their abilities and use modern tools to build a stronger future.",
      actionTitle: "Action",
      actionText:
        "We turn ideas into concrete actions that produce results.",
      futureTitle: "Future",
      futureText:
        "We prepare today’s generation for tomorrow’s opportunities.",

      commitmentEyebrow:
        "DECLARATION OF COMMITMENT",
      commitmentTitle:
        "We will not watch the world move ahead without us.",
      commitmentLead:
        "We refuse to remain prisoners of fear, delays, confusion and systems that no longer fit our time.",
      commitmentLine1:
        "We believe in education that opens minds.",
      commitmentLine2:
        "We believe in technology that strengthens human abilities.",
      commitmentLine3:
        "We believe in discipline, collaboration and responsibility.",
      commitmentLine4:
        "We believe progress begins when we decide to act.",
      commitmentQuote:
        "“We are not here to follow the footsteps of the future. We are here to chart its course.”",

      pillarsEyebrow:
        "MOVEMENT PRINCIPLES",
      pillarsTitle:
        "Four forces that move us forward",
      pillarVisionTitle: "Vision",
      pillarVisionText:
        "See beyond today’s problems to prepare tomorrow’s solutions.",
      pillarEducationTitle: "Education",
      pillarEducationText:
        "Learn, share knowledge and develop our full potential.",
      pillarInnovationTitle: "Innovation",
      pillarInnovationText:
        "Use technology and artificial intelligence wisely.",
      pillarUnityTitle: "Unity",
      pillarUnityText:
        "Bring together the experience of elders and the energy of the new generation.",

      aiCommand: "DIGITAL COMMAND CENTER",
      aiTitle:
        "Technology does not replace vision. It gives vision more power.",
      aiText:
        "We use artificial intelligence to learn faster, organize better, create more opportunities and serve our community more effectively.",
      aiAssistant: "AI ASSISTANT",
      aiWriter: "AI WRITER",
      voiceStudio: "VOICE STUDIO",
      digitalNetwork: "DIGITAL NETWORK",

      movementEyebrow: "THE TIME IS NOW",
      movementTitle:
        "Do not stay behind. Take your place in the movement.",
      movementText:
        "DEVAN DEVAN NÈT is for people ready to learn, build, collaborate and move forward. Everyone has an ability. Every ability has a place.",
      contactUs: "Contact us",
      backPlatform:
        "Return to BSS1815 PRO-MAX DMP",

      contactEyebrow: "CONNECT WITH US",
      contactTitle:
        "Official contacts and social networks",
      phoneTitle: "Phone numbers",
      digitalTitle: "Digital contacts",

      footerSlogan:
        "Building for today. Ready for tomorrow.",
      founderCredit:
        "A vision by Max Louis, alias Le Baron",
      backTop: "Back to top ↑",
      rights: "All rights reserved."
    }
  };

  const languageButtons =
    document.querySelectorAll(".lang-btn");

  const translatableElements =
    document.querySelectorAll("[data-i18n]");

  function saveLanguage(language) {
    try {
      localStorage.setItem(
        "devan-devan-net-language",
        language
      );
    } catch (error) {
      console.warn("Lang lan pa t kapab anrejistre.");
    }
  }

  function getSavedLanguage() {
    try {
      return localStorage.getItem(
        "devan-devan-net-language"
      );
    } catch (error) {
      return null;
    }
  }

  function setLanguage(language) {
    if (!translations[language]) {
      language = "ht";
    }

    const selectedTranslation =
      translations[language];

    document.documentElement.lang = language;

    translatableElements.forEach(function (element) {
      const translationKey =
        element.getAttribute("data-i18n");

      if (
        translationKey &&
        Object.prototype.hasOwnProperty.call(
          selectedTranslation,
          translationKey
        )
      ) {
        element.textContent =
          selectedTranslation[translationKey];
      }
    });

    languageButtons.forEach(function (button) {
      const buttonLanguage =
        button.getAttribute("data-lang");

      const isActive =
        buttonLanguage === language;

      button.classList.toggle(
        "active",
        isActive
      );

      button.setAttribute(
        "aria-pressed",
        isActive ? "true" : "false"
      );
    });

    saveLanguage(language);
  }

  languageButtons.forEach(function (button) {
    button.addEventListener(
      "click",
      function (event) {
        event.preventDefault();
        event.stopPropagation();

        const selectedLanguage =
          button.getAttribute("data-lang");

        setLanguage(selectedLanguage);
      }
    );

    button.addEventListener(
      "touchend",
      function (event) {
        event.preventDefault();

        const selectedLanguage =
          button.getAttribute("data-lang");

        setLanguage(selectedLanguage);
      },
      {
        passive: false
      }
    );
  });

  const menuToggle =
    document.getElementById("menuToggle");

  const mainNav =
    document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener(
      "click",
      function () {
        const isOpen =
          mainNav.classList.toggle("open");

        menuToggle.setAttribute(
          "aria-expanded",
          isOpen ? "true" : "false"
        );
      }
    );

    mainNav
      .querySelectorAll("a")
      .forEach(function (link) {
        link.addEventListener(
          "click",
          function () {
            mainNav.classList.remove("open");

            menuToggle.setAttribute(
              "aria-expanded",
              "false"
            );
          }
        );
      });
  }

  const animatedVideos =
    document.querySelectorAll(
      ".animated-logo-video, .brand-mark video"
    );

  animatedVideos.forEach(function (video) {
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    const playPromise = video.play();

    if (
      playPromise &&
      typeof playPromise.catch === "function"
    ) {
      playPromise.catch(function () {
        video.controls = true;
      });
    }
  });

  const currentYear =
    document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent =
      new Date().getFullYear();
  }

  const savedLanguage =
    getSavedLanguage();

  if (translations[savedLanguage]) {
    setLanguage(savedLanguage);
  } else {
    setLanguage("ht");
  }
});
