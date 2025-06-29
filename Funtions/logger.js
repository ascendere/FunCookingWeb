const admin = require('firebase-admin');

// Formato estándar de log
function buildLog({ uid = null, evento, detalle, tipo = "INFO", ruta = "" }) {
  return {
    uid,
    evento,
    detalle,
    tipo,
    ruta,
    timestamp: admin.firestore.Timestamp.now(),
  };
}

module.exports = { buildLog };