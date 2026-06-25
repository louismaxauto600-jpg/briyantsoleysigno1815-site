export function generateMemberBadge(member) {
  return `
    <div class="member-badge">
      <div class="badge-header">
        <h2>BSS1815 PRO-MAX DMP</h2>
        <p>DEVAN DEVAN NÈT</p>
      </div>

      <img class="badge-photo" src="${member.photoURL}" alt="Member Photo" />

      <h3>${member.fullName}</h3>
      <p><strong>ID:</strong> ${member.memberId}</p>
      <p><strong>Role:</strong> ${member.role}</p>
      <p><strong>Status:</strong> ${member.status}</p>

      <img class="badge-qr" src="${member.qrCodeURL}" alt="QR Code" />

      <div class="badge-footer">
        <p>Bati pou Jodi a. Pare pou Demen.</p>
      </div>
    </div>
  `;
}
