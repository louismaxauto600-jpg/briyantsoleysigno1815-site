export function generateCertificate(member, certificateTitle) {
  return `
    <div class="certificate">
      <h1>BSS1815 PRO-MAX DMP</h1>
      <h2>${certificateTitle}</h2>

      <p>This certificate is proudly presented to</p>

      <h3>${member.fullName}</h3>

      <p><strong>Member ID:</strong> ${member.memberId}</p>
      <p><strong>Role:</strong> ${member.role}</p>
      <p><strong>Status:</strong> ${member.status}</p>

      <div class="certificate-footer">
        <p>DEVAN DEVAN NÈT</p>
        <p>Bati pou Jodi a. Pare pou Demen.</p>
      </div>
    </div>
  `;
}
