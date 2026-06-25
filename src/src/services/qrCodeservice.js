import QRCode from "qrcode";

export async function generateMemberQRCode(memberId) {
  const verifyUrl = `${window.location.origin}/verify/${memberId}`;

  try {
    const qrImage = await QRCode.toDataURL(verifyUrl, {
      width: 300,
      margin: 2,
    });

    return {
      memberId,
      verifyUrl,
      qrImage,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("QR Code error:", error);
    throw error;
  }
}
