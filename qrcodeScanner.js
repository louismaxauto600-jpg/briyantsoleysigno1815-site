import { Html5QrcodeScanner } from "html5-qrcode";

export function startQRCodeScanner() {
  const scanner = new Html5QrcodeScanner(
    "reader",
    {
      fps: 10,
      qrbox: 250,
    },
    false
  );

  scanner.render(
    (decodedText) => {
      console.log("QR Code Detected:", decodedText);

      // Ouvri lyen QR Code la otomatikman
      window.location.href = decodedText;
    },
    (error) => {
      console.warn(error);
    }
  );
}
