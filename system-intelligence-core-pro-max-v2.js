// =======================================================
// SYSTEM INTELLIGENCE CORE PRO‑MAX v2
// - Fusion done ant tout modil yo
// - Real-time reasoning
// - Auto-defense
// - Auto-optimization
// - System health score
// - Self-explanation
// =======================================================

import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  addDoc,
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { showLoader, hideLoader } from "./ui-ux-pro-max-final.js";

const db = getFirestore();

// -------------------------------------------------------
// UTILS
// -------------------------------------------------------
async function logIntelligence(event, details = "", level = "INFO") {
  try {
    await addDoc(collection(db, "intelligence_logs"), {
      event,
      details,
      level,
      timestamp: serverTimestamp()
    });
  } catch (err) {
    console.warn("Intelligence log failed:", err);
  }
}

async function getRecent(collectionName, field = "timestamp", count = 50) {
  const snap = await getDocs(
    query(collection(db, collectionName), orderBy(field, "desc"), limit(count))
  );
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// -------------------------------------------------------
// CORE ANALYSIS
// -------------------------------------------------------
async function analyzeFirewall() {
  const fw = await getRecent("firewall_logs");
  const count = fw.length;

  let tamper = 0;
  let rapidClick = 0;
  let flood = 0;

  fw.forEach(e => {
    if (e.event?.includes("TAMPER")) tamper++;
    if (e.event?.includes("RAPID_CLICK")) rapidClick++;
    if (e.event?.includes("FLOOD")) flood++;
  });

  return {
    total: count,
    tamper,
    rapidClick,
    flood
  };
}

async function analyzeAuditLogs() {
  const logs = await getRecent("audit_logs");
  let roleChanges = 0;
  let backups = 0;
  let errors = 0;

  logs.forEach(l => {
    if (l.action === "CHANGE_ROLE") roleChanges++;
    if (l.action === "BACKUP_CREATED") backups++;
    if (l.level === "ERROR") errors++;
  });

  return {
    total: logs.length,
    roleChanges,
    backups,
    errors
  };
}

async function analyzeDeployConfig() {
  const snap = await getDoc(doc(db, "system", "deploy_config"));
  if (!snap.exists()) return { environment: "development", safeMode: false, version: null };

  const data = snap.data();
  return {
    environment: data.environment || "development",
    safeMode: !!data.safeMode,
    version: data.version || null
  };
}

async function analyzeSystemMonitor() {
  // Sa a se entèlijans sou done System Monitor si ou vle elaji pita.
  // Pou kounya, nou sipoze li log latency / erè nan audit_logs.
  return {};
}

// -------------------------------------------------------
// HEALTH SCORE
// -------------------------------------------------------
function computeHealthScore({ firewall, audit, deploy }) {
  let score = 100;

  // Firewall
  if (firewall.tamper > 3) score -= 15;
  if (firewall.flood > 0) score -= 15;
  if (firewall.rapidClick > 10) score -= 10;

  // Audit
  if (audit.errors > 5) score -= 20;
  if (audit.roleChanges > 5) score -= 10;
  if (audit.backups === 0) score -= 15;

  // Deploy
  if (deploy.safeMode) score -= 5; // safe mode = gen risk

  if (score < 0) score = 0;
  if (score > 100) score = 100;

  return score;
}

// -------------------------------------------------------
// AUTO-DEFENSE & AUTO-ACTIONS
// -------------------------------------------------------
async function autoDefense({ firewall, audit, deploy }) {
  // 1) Firewall tampering + flood
  if (firewall.tamper >= 3 || firewall.flood > 0) {
    if (!deploy.safeMode) {
      await setDoc(
        doc(db, "system", "deploy_config"),
        { safeMode: true },
        { merge: true }
      );

      await addDoc(collection(db, "deploy_history"), {
        type: "SAFE_MODE_ON_AUTO",
        reason: "Firewall tampering/flood",
        timestamp: serverTimestamp()
      });

      await logIntelligence(
        "AUTO_SAFE_MODE_ON",
        "Aktive Safe Mode akoz firewall tampering/flood",
        "CRITICAL"
      );
    }
  }

  // 2) Pa gen backup resan
  if (audit.backups === 0) {
    await logIntelligence(
      "NO_RECENT_BACKUP",
      "Pa gen backup resan. Rekòmande pou kreye youn.",
      "WARNING"
    );
  }

  // 3) Twòp chanjman wòl
  if (audit.roleChanges > 5) {
    await logIntelligence(
      "ROLE_CHANGE_SPIKE",
      "Gen anpil chanjman wòl. Rekòmande pou revize aktivite admin yo.",
      "WARNING"
    );
  }

  // 4) Twòp erè
  if (audit.errors > 5) {
    await logIntelligence(
      "ERROR_SPIKE",
      "Gen anpil erè resan. Rekòmande pou tcheke System Monitor.",
      "WARNING"
    );
  }
}

// -------------------------------------------------------
// SELF-EXPLANATION SNAPSHOT
// -------------------------------------------------------
async function writeIntelligenceSnapshot(healthScore, firewall, audit, deploy) {
  const explanation = [];

  explanation.push(`Nòt sante sistèm nan: ${healthScore}/100.`);

  if (firewall.tamper > 0) {
    explanation.push(`Firewall detekte ${firewall.tamper} evènman tampering.`);
  }
  if (firewall.flood > 0) {
    explanation.push(`Firewall detekte ${firewall.flood} evènman flood.`);
  }
  if (audit.errors > 0) {
    explanation.push(`Gen ${audit.errors} erè resan nan audit logs.`);
  }
  if (audit.backups === 0) {
    explanation.push("Pa gen backup resan. Sa ogmante risk pèdi done.");
  }
  if (audit.roleChanges > 0) {
    explanation.push(`Gen ${audit.roleChanges} chanjman wòl resan.`);
  }
  if (deploy.safeMode) {
    explanation.push("Sistèm nan kounya nan Safe Mode.");
  }

  await setDoc(
    doc(db, "system", "intelligence_snapshot"),
    {
      healthScore,
      firewall,
      audit,
      deploy,
      explanation,
      updatedAt: serverTimestamp()
    },
    { merge: true }
  );
}

// -------------------------------------------------------
// MAIN INTELLIGENCE LOOP
// -------------------------------------------------------
async function runIntelligenceCycle() {
  try {
    showLoader();

    const [firewall, audit, deploy] = await Promise.all([
      analyzeFirewall(),
      analyzeAuditLogs(),
      analyzeDeployConfig()
    ]);

    const healthScore = computeHealthScore({ firewall, audit, deploy });

    await autoDefense({ firewall, audit, deploy });
    await writeIntelligenceSnapshot(healthScore, firewall, audit, deploy);

    await logIntelligence(
      "INTELLIGENCE_CYCLE",
      `HealthScore=${healthScore}, FW=${firewall.total}, AUD=${audit.total}`,
      "INFO"
    );

  } catch (err) {
    console.error("Intelligence Core Error:", err);
    await logIntelligence("INTELLIGENCE_ERROR", String(err), "ERROR");
  } finally {
    hideLoader();
  }
}

// -------------------------------------------------------
// AUTO-RUN
// -------------------------------------------------------
// Kouri yon fwa lè paj la chaje
runIntelligenceCycle();

// Rekouri chak 30 segonn
setInterval(runIntelligenceCycle, 30000);

// -------------------------------------------------------
// EXPORT
// -------------------------------------------------------
export {
  runIntelligenceCycle
};
