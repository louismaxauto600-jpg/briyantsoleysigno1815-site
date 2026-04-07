const instruments = [
  { name: "Trompèt", file: "trompet.jpeg" },
  { name: "Trombone", file: "trombone-bss1815.jpeg" },
  { name: "Tanbou", file: "tanbou.jpeg" },
  { name: "Senbal", file: "senbal.jpeg" },
  { name: "Graj", file: "gwaj.jpeg" },
  { name: "Caisse", file: "caisse.jpeg" },
  { name: "Assiette", file: "assiette.jpeg" },
  { name: "Charlemagne", file: "charlemagne.jpeg" },
  { name: "Vaksen", file: "vaksen.jpeg" }
];

function renderInstruments() {
  const container = document.getElementById("instruments-grid");
  instruments.forEach(inst => {
    const card = document.createElement("div");
    card.className = "instrument-card";
    card.innerHTML = `
      <img src="assets/instruments/${inst.file}" alt="${inst.name}">
      <h3>${inst.name}</h3>
    `;
    container.appendChild(card);
  });
}
