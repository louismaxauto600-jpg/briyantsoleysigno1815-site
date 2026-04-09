const leaders = [
  { name: "Cange", file: "cange.jpeg" },
  { name: "Bawon An", file: "bawon-an.jpeg" },
  { name: "Fifi 1", file: "fifi-1.jpeg" },
  { name: "Jeff Colin", file: "jeff_colin.jpeg" },
  { name: "Jude J", file: "jude-j.jpeg" },
  { name: "Koukou Fly", file: "koukou-fly.jpeg" },
  { name: "Macu V", file: "macu-v.jpeg" },
  { name: "Montinat", file: "montinat.jpeg" },
  { name: "PDG Ti Rat", file: "pdg_ti_rat.jpeg" },
  { name: "Prez Aly", file: "prez_aly.jpeg" },
  { name: "Prez Papit", file: "prez_papit.jpeg" },
  { name: "Pèrodin", file: "pèrodin.jpeg" },
  { name: "Roro Pot Pawol", file: "roro-pot-pawol.png" },
  { name: "Tania Felix", file: "tania-felix.png" },
  { name: "Paulema", file: "paulema.jpeg" },
  { name: "May", file: "may.png" },
  { name: "Valery", file: "valery.png" },
  { name: "Doodly 2", file: "doodly2.jpeg" },
  { name: "Sindy", file: "sindy.png" },
  { name: "Anperè", file: "anperè.jpg" },
  { name: "Cange 2", file: "cange2.jpg" },
  { name: "Cange 3", file: "cange3.jpg" },
  { name: "Jij Mayan", file: "jij-mayan.jpeg" },
  { name: "Majis Junior", file: "majis-junior.jpeg" },
  { name: "Magistra Mauclair", file: "magistra-mauclair.jpeg" },
  { name: "Mambo Fifi", file: "mambo-fifi.jpeg" },
  { name: "Maximax60", file: "maximax60.jpeg" },
  { name: "Doodly", file: "doodly.jpeg" },
  { name: "Roro 2", file: "roro2.jpg" },
  { name: "Roro 23", file: "roro23.jpg" },
  { name: "Cols 2", file: "cols2.jpg" },
  { name: "Doudou", file: "doudou.jpg" },
  { name: "Tania", file: "tania.jpg" },
  { name: "Coucou 23", file: "coucou23.jpg" },
  { name: "Ti Chery", file: "ti-chery.jpg" },
  { name: "May 2", file: "may2.jpg" },
  { name: "Cols", file: "cols.jpeg" },
  { name: "Michel Briyant", file: "michel-briyant.png" },
  { name: "Fanfan", file: "fanfan.jpeg" },
  { name: "Doudou 2", file: "doudou.jpeg" },
  { name: "Ti Marasa", file: "ti-marasa.jpeg" }
];

function renderSlideshow() {
  const container = document.getElementById("slideshow");

  leaders.forEach((leader) => {
    const slide = document.createElement("div");
    slide.className = "slide fade";
    slide.innerHTML = `
      <img src="assets/leaders/${leader.file}" alt="${leader.name}">
      <div class="caption">${leader.name}</div>
    `;
    container.appendChild(slide);
  });

  startSlideshow();
}

let slideIndex = 0;

function startSlideshow() {
  const slides = document.getElementsByClassName("slide");
  if (!slides.length) return;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;

  slides[slideIndex - 1].style.display = "block";

  setTimeout(startSlideshow, 3000);
}
