const leaders = [
  { name: "cange", file: "cange.jpeg", testimony: "Yon poto mitan nan BSS1815, toujou prezan, toujou solid." },
  { name: "bawon-an", file: "bawon-an.jpeg", testimony: "Yon lidè ki pote respè, disiplin ak direksyon." },
  { name: "mambo_fifi", file: "mambo_fifi.jpeg", testimony: "Yon fanm fò ki pote limyè ak estabilite nan ekip la." },
  { name: "jeff-colin", file: "jeff-colin.jpeg", testimony: "Yon motè travay ki pa janm sispann pouse ekip la pi wo." },
  { name: "jude-j", file: "jude-j.jpeg", testimony: "Yon lidè ki toujou kenbe pawòl li ak prensip li." },
  { name: "koukou-fly", file: "koukou-fly.jpeg", testimony: "Enèji, mouvman, ak prezans ki fè ekip la vivan." },
  { name: "montinat", file: "montinat.jpeg", testimony: "Yon moun ki toujou pote solisyon ak vizyon klè." },
  { name: "pdg_ti_rat", file: "pdg_ti_rat.jpeg", testimony: "Yon PDG natirèl, ak yon kapasite pou dirije san fòse." },
  { name: "prez_aly", file: "prez_aly.jpeg", testimony: "Yon prezidan ki pote respè, kalm ak direksyon." },
  { name: "prez_papit", file: "prez_papit.jpeg", testimony: "Yon lidè ki toujou kenbe ekip la ini ak fò." },
  { name: "pèrodin", file: "pèrodin.jpeg", testimony: "Yon poto moral ak yon egzanp disiplin." },
  { name: "roro-pot-pawol", file: "roro-pot-pawol.jpeg", testimony: "Yon vwa fò nan ekip la, toujou klè ak dwat." },
  { name: "tania-felix", file: "tania-felix.jpeg", testimony: "Yon fanm ki pote balans, respè ak fòs." },
  { name: "paulema", file: "paulema.jpeg", testimony: "Yon moun ki toujou prezan pou ekip la, san rete." },
  { name: "may", file: "may.jpeg", testimony: "Yon lidè ki pote estabilite ak direksyon." },
  { name: "valery", file: "valery.jpeg", testimony: "Yon moun ki toujou bay bon konsèy ak bon jijman." },
  { name: "doodly23", file: "doodly23.jpeg", testimony: "Yon moun ki pote kreyativite ak enèji pozitif." },
  { name: "sindy", file: "sindy.jpeg", testimony: "Yon fanm ki toujou kenbe ekip la nan bon vibrasyon." },
  { name: "jij-mayan", file: "jij-mayan.jpeg", testimony: "Yon jij natirèl, toujou jis, toujou egzat." },
  { name: "majis-junior", file: "majis-junior.jpeg", testimony: "Yon majisyen nan travay li, toujou pote rezilta." },
  { name: "magistra-mauclair", file: "magistra-mauclair.jpeg", testimony: "Yon moun ki pote respè ak prezans pwofesyonèl." },
  { name: "maximax60", file: "maximax60.jpeg", testimony: "Yon poto fò nan ekip la, toujou pare pou ede." },
  { name: "cols", file: "cols.jpeg", testimony: "Yon moun ki toujou kenbe ekip la motive." },
  { name: "doudou", file: "doudou.jpeg", testimony: "Yon moun ki pote chalè ak enèji pozitif." },
  { name: "koukou-fly", file: "koukou-fly.jpeg", testimony: "Yon mouvman vivan ki fè BSS1815 espesyal." },
  { name: "ti-chery", file: "ti-chery.jpeg", testimony: "Yon moun ki pote souri ak bon vibrasyon." },
  { name: "may2", file: "may2.jpg", testimony: "Yon lòt fasèt fò nan ekip la, toujou prezan." },
  { name: "michel-briyant", file: "michel-briyant.png", testimony: "Yon moun ki pote fòs ak vizyon." },
  { name: "fanfan", file: "fanfan.jpeg", testimony: "Yon lidè ki toujou kenbe ekip la sou bon wout." },
  { name: "ti-marasa", file: "ti-marasa.jpeg", testimony: "Yon moun ki pote balans ak bon jan travay." },
  { name: "roro-lajan", file: "roro-lajan.jpeg", testimony: "Yon moun ki pote estabilite ak fòs ekonomik." },
  { name: "ygens", file: "ygens.jpeg", testimony: "Yon jèn fò ki pote avni ak enèji nan ekip la." }
];

let index = 0;

function showLeader() {
  const img = document.getElementById("leader-img");
  const name = document.getElementById("leader-name");
  const testimony = document.getElementById("leader-testimony");

  img.src = "assets/leaders/" + leaders[index].file;
  name.textContent = leaders[index].name.toUpperCase();
  testimony.textContent = leaders[index].testimony;

  index = (index + 1) % leaders.length;
}

setInterval(showLeader, 3000);
showLeader();
