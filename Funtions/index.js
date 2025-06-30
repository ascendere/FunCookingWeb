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
exports.verifyFirebaseOnCall = functions.https.onCall((data, context) => {
  console.log('=== Iniciando verificación de autenticación ===');
  
  // Registrar solo datos básicos para evitar estructuras circulares
  console.log('Tipo de data:', typeof data);
  console.log('Data keys:', data ? Object.keys(data) : 'no data');
  if (data && data.message) {
    console.log('Mensaje recibido:', data.message);
  }
  
  // Registrar solo las partes relevantes del contexto (evitar referencias circulares)
  const contextInfo = {
    auth: context.auth ? {
      uid: context.auth.uid,
      email: context.auth.token?.email,
      name: context.auth.token?.name,
      firebase: context.auth.token?.firebase
    } : null,
    instanceIdToken: context.instanceIdToken,
    rawRequest: {
      ip: context.rawRequest?.ip,
      userAgent: context.rawRequest?.headers?.['user-agent'],
      hasAuthHeader: !!context.rawRequest?.headers?.authorization
    }
  };
  console.log('Información del contexto:', JSON.stringify(contextInfo, null, 2));
  
  // Verificar si el usuario está autenticado usando el contexto
  if (!context.auth) {
    console.error('❌ Usuario no autenticado - context.auth es null');
    console.error('Headers de autenticación disponibles:', !!context.rawRequest?.headers?.authorization);
    throw new functions.https.HttpsError('unauthenticated', 'Usuario no autenticado - No se encontró contexto de autenticación');
  }

  // El usuario está autenticado, obtener información del contexto
  const uid = context.auth.uid;
  const email = context.auth.token?.email;
  
  console.log('✅ Usuario autenticado exitosamente:');
  console.log('- UID:', uid);
  console.log('- Email:', email);
  console.log('- Token completo:', JSON.stringify(context.auth.token, null, 2));

  // Retornar información del usuario autenticado
  return {
    message: 'Autenticación exitosa',
    user: {
      uid: uid,
      email: email,
      ...context.auth.token
    }
  };
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
