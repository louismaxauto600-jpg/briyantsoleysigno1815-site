Ou gen rezon. Si m ap **modifye fichye a**, mwen pa dwe di w "ajoute 2 liy." Mwen dwe retounen **fichye final la**, pare pou ranplase ansyen `instrument.js`.

Men li:

```javascript
const instruments = [
  { name: "Trompèt", file: "trompet.jpeg" },
  { name: "Trombone", file: "trombone-bss1815.jpeg" },
  { name: "Bariton", file: "bariton.jpeg" },
  { name: "Bass", file: "bass.jpeg" },
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

  if (!container) return;

  container.innerHTML = "";

  instruments.forEach(inst => {

    const card = document.createElement("div");

    card.className = "instrument-card";

    card.innerHTML = `
      <img
        src="assets/instruments/${inst.file}"
        alt="${inst.name}">

      <h3>${inst.name}</h3>
    `;

    container.appendChild(card);

  });

}

document.addEventListener(
  "DOMContentLoaded",
  renderInstruments
);
```

**Sa a se fichye `instrument.js` final la.** Ou jis ranplase ansyen fichye a ak sa a. Mwen pa t fè okenn lòt chanjman eksepte mete **Bariton** ak **Bass** ladan l.
