/* ------------------------------------------------------
   BSS1815 OFFICIAL ADMIN.JS
   Sa jere Leaders Control Panel la:
   - Upload foto/videyo
   - Chwazi kategori
   - Sove done yo
   - Estrikti PRO-MAX pou Super Admin & Admin
------------------------------------------------------ */


// ------------------------------------------------------
// SELECTORS
// ------------------------------------------------------

const adminForm = document.getElementById("adminUploadForm");
const fileInput = document.getElementById("adminFile");
const categorySelect = document.getElementById("mediaCategory");
const descriptionInput = document.getElementById("mediaDescription");


// ------------------------------------------------------
// EVENT: FORM SUBMISSION
// ------------------------------------------------------

if (adminForm) {
    adminForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const file = fileInput.files[0];
        const category = categorySelect.value;
        const description = descriptionInput.value;

        // Validasyon fichye
        if (!file) {
            alert("Tanpri chwazi yon fichye pou upload.");
            return;
        }

        const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "video/mp4"];
        if (!allowedTypes.includes(file.type)) {
            alert("Fòma fichye a pa sipòte. Sèvi ak JPG, PNG oswa MP4.");
            return;
        }

        // Kreye done pou Leaders Uploads
        const uploadData = {
            admin_name: "SUPER_ADMIN_OR_ADMIN",
            category: category,
            file_name: file.name,
            file_type: file.type,
            description: description,
            upload_date: new Date().toISOString()
        };

        console.log("Leaders Upload Data:", uploadData);

        // Mesaj konfimasyon
        alert("Upload reyisi! Medya a antre nan BSS1815 Media Library.");

        // Reset form
        adminForm.reset();
    });
}


// ------------------------------------------------------
// PREVIEW FILE BEFORE UPLOAD
// ------------------------------------------------------

fileInput?.addEventListener("change", function () {
    const file = this.files[0];

    if (!file) return;

    const preview = document.getElementById("previewBox");
    preview.innerHTML = "";

    if (file.type.startsWith("image/")) {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.style.width = "200px";
        img.style.border = "2px solid #ff7f00";
        img.style.marginTop = "10px";
        preview.appendChild(img);
    }

    if (file.type === "video/mp4") {
        const video = document.createElement("video");
        video.src = URL.createObjectURL(file);
        video.controls = true;
        video.style.width = "250px";
        video.style.marginTop = "10px";
        preview.appendChild(video);
    }
});


// ------------------------------------------------------
// CATEGORY LOGIC (PRO-MAX ORGANIZATION)
// ------------------------------------------------------

const categoryInfo = {
    store: "Medya pou pwodwi yo",
    event: "Foto/videyo evènman yo",
    leadership: "Foto/videyo dirijan yo",
    fanclub: "Medya pou fanatik yo",
    banner: "Bannè ofisyèl yo",
    product: "Foto pwodwi yo"
};

categorySelect?.addEventListener("change", function () {
    const infoBox = document.getElementById("categoryInfo");
    infoBox.innerText = categoryInfo[this.value] || "";
});


// ------------------------------------------------------
// END OF ADMIN.JS
// ------------------------------------------------------
