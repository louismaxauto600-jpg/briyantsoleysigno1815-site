// 👉 KÒD SA A PRAL NAN script.js (PREMYE LIY)
window.addEventListener("DOMContentLoaded", () => {
  const koukou = document.getElementById("koukou");

  // antre
  setTimeout(() => {
    koukou.style.transform = "translateX(0)";
  }, 500);

  // rete 10 segonn
  setTimeout(() => {
    koukou.style.transform = "translateX(-150%)";
  }, 10500);
});// ------------------------------------------------------
// BSS1815 OFFICIAL SCRIPT.JS
// Fichye sa a jere tout entèlijans sit la:
// - Fan Upload Center
// - Validasyon fichye
// - Mesaj konfimasyon
// - Estrikti pou Leaders Panel
// ------------------------------------------------------


// -------------------------------
// FAN UPLOAD CENTER
// -------------------------------

const fanForm = document.getElementById("fanUploadForm");

if (fanForm) {
    fanForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Ranmase done yo
        const name = fanForm.querySelector("input[type='text']").value;
        const email = fanForm.querySelector("input[type='email']").value;
        const description = fanForm.querySelector("textarea").value;
        const file = fanForm.querySelector("input[type='file']").files[0];

        // Validasyon fichye
        if (!file) {
            alert("Tanpri chwazi yon foto oswa videyo.");
            return;
        }

        const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "video/mp4"];
        if (!allowedTypes.includes(file.type)) {
            alert("Fòma fichye a pa sipòte. Sèvi ak JPG, PNG oswa MP4.");
            return;
        }

        // Kreye done pou JSON database
        const uploadData = {
            fan_name: name,
            fan_email: email,
            description: description,
            file_name: file.name,
            file_type: file.type
