const leaders = [
  { name: "Ygens", file: "ygens.jpeg", testimony: "Mwen leve chak jou pou pote limyè ak enèji nan ekip la." },
  { name: "Ti Rat 2", file: "ti-rat-2.jpeg", testimony: "Travay ansanm se fòs nou; mwen toujou pote pa mwen." },
  { name: "Montina", file: "montina.jpeg", testimony: "Mwen kwè nan disiplin, respè, ak pwogrè chak jou." },
  { name: "Prez Papit", file: "prez-papit.jpg", testimony: "Lidèchip se sèvi ak kè; se sa mwen chwazi chak jou." },
  { name: "Fanfan", file: "fanfan.jpeg", testimony: "Mwen pote kouraj ak bon vibrasyon pou tout ekip la." },
  { name: "Fifi", file: "fifi.jpeg", testimony: "Lè nou ini, pa gen limit nan sa nou ka reyalize." },
  { name: "Elson", file: "elson.jpeg", testimony: "Mwen mache ak vizyon, pasyans, ak bon volonte." },
  { name: "Ti Papouch", file: "ti-papouche.jpeg", testimony: "Mwen kwè nan travay ki fèt ak lanmou ak konsistans." },
  { name: "Ti Marasa", file: "ti-marasa.jpeg", testimony: "Mwen pote balans, enèji, ak bon lespri kote m pase." },
  { name: "Ti La France", file: "ti-la-france.jpeg", testimony: "Mwen toujou chèche amelyore tèt mwen pou amelyore ekip la." },
  { name: "Roro Lajan", file: "roro-lajan.jpeg", testimony: "Mwen kwè nan efò ki pa janm sispann ak respè youn pou lòt." },
  { name: "Jeff Colin", file: "jeff.colin.jpeg", testimony: "Mwen pote estabilite, vizyon, ak bon direksyon." },
  { name: "Jij Mayan", file: "jij-mayan.jpeg", testimony: "Jistis, respè, ak disiplin se poto mitan mwen." },
  { name: "Majis Junior", file: "majis-junior.jpeg", testimony: "Mwen pote kreyativite ak enspirasyon nan chak mouvman." },
  { name: "Magistra Mauclair", file: "magistra-mauclair.jpeg", testimony: "Mwen kwè nan fòmasyon, devlopman, ak bon egzanp." },
  { name: "Mambo Fifi", file: "mambo-fifi.jpeg", testimony: "Mwen pote chalè, lespwa, ak bon enèji kote m rive." },
  { name: "Maximax60", file: "maximax60.jpeg", testimony: "Mwen mache ak detèminasyon; mwen pa janm lage." },
  { name: "Landry", file: "landry.jpeg", testimony: "Mwen kwè nan travay ki fèt ak respè ak konsyans." },
  { name: "Prez Aly", file: "prez-aly.jpeg", testimony: "Mwen sèvi ak kè, ak vizyon pou avanse ansanm." },
  { name: "Don Dodo", file: "don-dodo.png", testimony: "Lapè, respè, ak bon lespri se sa mwen pote chak jou." },
  { name: "Macu & MV", file: "macu-&-mv.png", testimony: "Nou kwè nan inyon, travay ansanm, ak pwogrè san rete." },
  { name: "Anperè", file: "anperè.jpg", testimony: "Mwen mache ak diyite, fòs, ak bon direksyon." },
  { name: "Sindy", file: "sindy.png", testimony: "Mwen pote limyè, kouraj, ak enspirasyon pou lòt yo." },
  { name: "Bouboul", file: "bouboul.png", testimony: "Mwen kwè nan travay ki fèt ak kè kontan ak disiplin." },
  { name: "Madina", file: "madina.png", testimony: "Mwen pote kalm, fòs enteryè, ak bon vibrasyon." },
  { name: "Doodly", file: "doodly.jpeg", testimony: "Mwen kwè nan kreyativite ak enèji pozitif." },
  { name: "Cange 2", file: "cange2.jpg", testimony: "Mwen pote estabilite ak bon egzanp pou tout ekip la." },
  { name: "Cange 3", file: "cange3.jpg", testimony: "Mwen mache ak respè, travay di, ak bon volonte." },
  { name: "Bawon An", file: "bawon-an.jpg", testimony: "Mwen pote prezans, konsyans, ak enspirasyon." },
  { name: "Roro 2", file: "roro2.jpg", testimony: "Mwen kwè nan pwogrè chak jou, menm nan ti pa yo." },
  { name: "Roro 23", file: "roro23.jpg", testimony: "Mwen pote enèji ki leve moral ekip la." },
  { name: "Cols 2", file: "cols2.jpg", testimony: "Mwen kwè nan disiplin ak travay ki fèt ak presizyon." },
  { name: "Doudou", file: "doudou.jpg", testimony: "Mwen pote chalè, respè, ak bon lespri nan ekip la." },
  { name: "Tania", file: "tania.jpg", testimony: "Mwen kwè nan fòs fanmi, inyon, ak travay ansanm." },
  { name: "Coucou 23", file: "coucou23.jpg", testimony: "Mwen pote souri, enèji, ak enspirasyon kote m pase." }
];

function renderSlideshow() {
  const container = document.getElementById("slideshow");

  leaders.forEach((leader) => {
    const slide = document.createElement("div");
    slide.className = "slide fade";
    slide.innerHTML = `
      <img src="assets/leaders/${leader.file}" alt="${leader.name}">
      <div class="caption">
        <div class="leader-name">${leader.name}</div>
        <div class="leader-testimony">${leader.testimony}</div>
      </div>
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

  // ⬇⬇⬇ AJISTE POU 10 SEGOND ⬇⬇⬇
  setTimeout(startSlideshow, 10000);
    }
