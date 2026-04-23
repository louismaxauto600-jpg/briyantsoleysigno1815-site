// BSS1815 — SUPER ADMIN SECURE FUNCTIONS
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

// 🔐 Middleware pou SUPER ADMIN sèlman
async function verifySuperAdmin(context) {
  if (!context.auth) throw new functions.https.HttpsError("unauthenticated", "NO_AUTH");
  const user = await db.collection("admins").doc(context.auth.uid).get();
  if (!user.exists || user.data().role !== "super_admin") {
    throw new functions.https.HttpsError("permission-denied", "NOT_SUPER_ADMIN");
  }
}

// 🟠 SYSTEM OVERRIDE
exports.systemOverride = functions.https.onCall(async (data, context) => {
  await verifySuperAdmin(context);
  await db.collection("bss_admin_panel").doc("system_controls").update({
    override: true,
    updated_at: admin.firestore.FieldValue.serverTimestamp()
  });
  await db.collection("bss_admin_panel").doc("logs").collection("entries").add({
    action: "SYSTEM_OVERRIDE",
    admin_id: context.auth.uid,
    timestamp: admin.firestore.FieldValue.serverTimestamp()
  });
  return {status: "OK"};
});

// 🔵 SYSTEM RESET
exports.systemReset = functions.https.onCall(async (data, context) => {
  await verifySuperAdmin(context);
  await db.collection("bss_admin_panel").doc("system_controls").update({
    reset: true,
    updated_at: admin.firestore.FieldValue.serverTimestamp()
  });
  await db.collection("bss_admin_panel").doc("logs").collection("entries").add({
    action: "SYSTEM_RESET",
    admin_id: context.auth.uid,
    timestamp: admin.firestore.FieldValue.serverTimestamp()
  });
  return {status: "OK"};
});

// 🟣 TWILIO MASTER SWITCH
exports.twilioMasterSwitch = functions.https.onCall(async (data, context) => {
  await verifySuperAdmin(context);
  await db.collection("bss_admin_panel").doc("system_controls").update({
    twilio_master_switch: data.state === true,
    updated_at: admin.firestore.FieldValue.serverTimestamp()
  });
  await db.collection("bss_admin_panel").doc("logs").collection("entries").add({
    action: "TWILIO_MASTER_SWITCH",
    state: data.state,
    admin_id: context.auth.uid,
    timestamp: admin.firestore.FieldValue.serverTimestamp()
  });
  return {status: "OK"};
});

// 🔴 DELETE RECORD
exports.deleteRecord = functions.https.onCall(async (data, context) => {
  await verifySuperAdmin(context);
  await db.collection(data.collection).doc(data.id).delete();
  await db.collection("bss_admin_panel").doc("logs").collection("entries").add({
    action: "DELETE_RECORD",
    target: data.id,
    admin_id: context.auth.uid,
    timestamp: admin.firestore.FieldValue.serverTimestamp()
  });
  return {status: "OK"};
});

// ⚫ REMOVE ADMIN
exports.removeAdmin = functions.https.onCall(async (data, context) => {
  await verifySuperAdmin(context);
  await db.collection("admins").doc(data.admin_id).update({
    active: false,
    updated_at: admin.firestore.FieldValue.serverTimestamp()
  });
  await db.collection("bss_admin_panel").doc("logs").collection("entries").add({
    action: "REMOVE_ADMIN",
    target: data.admin_id,
    admin_id: context.auth.uid,
    timestamp: admin.firestore.FieldValue.serverTimestamp()
  });
  return {status: "OK"};
});

// 🟡 FORCE RE-UPLOAD
exports.forceReupload = functions.https.onCall(async (data, context) => {
  await verifySuperAdmin(context);
  await db.collection("bss_admin_panel").doc("system_controls").update({
    force_reupload: true,
    updated_at: admin.firestore.FieldValue.serverTimestamp()
  });
  await db.collection("bss_admin_panel").doc("logs").collection("entries").add({
    action: "FORCE_REUPLOAD",
    admin_id: context.auth.uid,
    timestamp: admin.firestore.FieldValue.serverTimestamp()
  });
  return {status: "OK"};
});
