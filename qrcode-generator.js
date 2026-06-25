import QRCode from "qrcode";

export async function generateMemberQRCode(memberId) {
  const qrData = `${window.location.origin}/member/${memberId}`;

  try {
    const qrImage = await QRCode.toDataURL(qrData);
    return qrImage;
  } catch (error) {
    console.error("QR Code generation failed:", error);
    return null;
  }
}
