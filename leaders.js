const leaders = [
  { name: "Ygen", file: "ygen.jpeg" },
  { name: "Ti-Rat 2", file: "ti-rat-2.jpeg" },
  { name: "Montina", file: "montina.jpeg" },
  { name: "Prez Papit", file: "prez-papit.jpeg" },
  { name: "Fanfan", file: "fanfan.jpeg" },
  { name: "Fifi", file: "fifi.jpeg" },
  { name: "Elson", file: "elson.jpeg" },
  { name: "Ti Papouch", file: "ti-papouche.jpeg" },
  { name: "Ti Marasa", file: "ti-marasa.jpeg" },
  { name: "Ti Lafrance", file: "ti-lafrance.jpeg" },
  { name: "Roro Lajan", file: "roro-lajan.jpeg" },
  { name: "Jeff", file: "jeff.jpeg" },
  { name: "Jij Mayan", file: "jij-mayan.jpeg" },
  { name: "Mario", file: "mario.jpeg" },
  { name: "Majis Junior", file: "majis-junior.jpeg" },
  { name: "Magistra Mauclair", file: "magistra-mauclair.jpeg" },
  { name: "Mambo Fifi", file: "mambo-fifi.jpeg" },
  { name: "Maximax60", file: "maximax60.jpeg" },
  { name: "Landry", file: "landry.jpeg" },
  { name: "Paulema", file: "paulema.jpeg" },
  { name: "Prez Aly", file: "prez-aly.jpeg" }
];

function renderSlideshow() {
  const container = document.getElementById("slideshow");
  leaders.forEach(leader => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.innerHTML = `
      <img src="assets/leaders/${leader.file}" alt="${leader.name}">
    `;
    container.appendChild(slide);
  });
}
