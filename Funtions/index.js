const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp({
  credential: admin.credential.cert(require('./firebase-key.json'))
});

// HTTP tradicional
exports.verifyFirebaseAuth = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    // Headers de seguridad recomendados
    res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
    res.setHeader('Permissions-Policy', 'geolocation=(), microphone=()');
    res.setHeader('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none';");

    if (req.method !== 'POST') return res.status(405).send(); // Método no permitido
    const { token, email } = req.body;
    if (!token || !email) return res.status(400).send('Petición incorrecta'); // Petición incorrecta
    
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);

      // Verifica si el correo del token coincide con el correo enviado
      if (decodedToken.email !== email) {
        return res.status(403).send('Acceso denegado: el correo no coincide');
      }

      return res.status(200).send(); // Solicitud válida
    } catch {
      return res.status(401).send(); // No autorizado
    }
  });
});



// Función onCall que usa la autenticación automática de Firebase
exports.verifyFirebaseOnCall = functions.https.onCall(async (data, context) => {
  // 1. Verificación automática de autenticación (Firebase lo maneja)
  if (!context.auth || !context.auth.uid) {
    throw new functions.https.HttpsError(
      'unauthenticated', 
      'Debes estar autenticado para llamar a esta función'
    );
  }

  // 2. Verificar que el UID exista en Firebase Authentication
  try {
    const userRecord = await admin.auth().getUser(context.auth.uid);
    // Si el usuario existe, permitir acceso
    // ...puedes agregar lógica adicional si lo necesitas...
    return {
      status: 'success',
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        emailVerified: userRecord.emailVerified
      },
      timestamp: new Date().toISOString(),
      message: 'Autenticación verificada correctamente por UID'
    };
  } catch (error) {
    // Si el UID no existe en Firebase Auth, rechazar
    throw new functions.https.HttpsError(
      'not-found',
      'El usuario no existe en Firebase Authentication'
    );
  }
});
  


const {
  logEvento,
  logLoginExitoso,
  logLoginFallido,
  logLogout,
  logCreateProduct,
  logEditProduct,
  logDeleteProduct,
  logErrorCreateProduct,
  logErrorEditProduct,
  logErrorDeleteProduct,
  logCreateRecipe,
  logEditRecipe,
  logDeleteRecipe,
  logErrorCreateRecipe,
  logErrorEditRecipe,
  logErrorDeleteRecipe
} = require("./logs");

// Endpoint HTTP para log genérico
exports.logEvent = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      await logEvento(req.body);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});

// Endpoint HTTP para login exitoso
exports.logLoginExitoso = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      await logLoginExitoso(req.body);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});

// Endpoint HTTP para login fallido
exports.logLoginFallido = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      await logLoginFallido(req.body);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});

// Endpoint HTTP para logout
exports.logLogout = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      await logLogout(req.body);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});

// Endpoints para productos
/*
exports.logCreateProduct = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      await logCreateProduct(req.body);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});
exports.logEditProduct = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      await logEditProduct(req.body);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});
exports.logDeleteProduct = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      await logDeleteProduct(req.body);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});
exports.logErrorCreateProduct = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      await logErrorCreateProduct(req.body);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});
exports.logErrorEditProduct = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      await logErrorEditProduct(req.body);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});
exports.logErrorDeleteProduct = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      await logErrorDeleteProduct(req.body);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});
*/

// Endpoints para recetas
/*
exports.logCreateRecipe = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      await logCreateRecipe(req.body);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});
exports.logEditRecipe = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      await logEditRecipe(req.body);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});
exports.logDeleteRecipe = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      await logDeleteRecipe(req.body);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});
exports.logErrorCreateRecipe = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      await logErrorCreateRecipe(req.body);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});
exports.logErrorEditRecipe = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      await logErrorEditRecipe(req.body);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});
exports.logErrorDeleteRecipe = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      await logErrorDeleteRecipe(req.body);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});
*/
