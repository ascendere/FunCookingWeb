const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp({
  credential: admin.credential.cert(require('./firebase-key.json'))
});

// Función onCall que usa la autenticación automática de Firebase
exports.verifyFirebaseOnCall = functions.https.onCall((data, context) => {
  console.log('=== Iniciando verificación de autenticación ===');
  
  // Verificar si el usuario está autenticado usando el contexto
  if (!context.auth) {
    console.error('❌ Usuario no autenticado - context.auth es null');
    throw new functions.https.HttpsError('unauthenticated', 'Usuario no autenticado');
  }

  // El usuario está autenticado, obtener información del contexto
  const uid = context.auth.uid;
  const email = context.auth.token?.email;
  
  console.log('✅ Usuario autenticado exitosamente:');
  console.log('- UID:', uid);
  console.log('- Email:', email);

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
  logDeleteProduct,
  logErrorCreateProduct,
  logErrorEditProduct,
  logErrorDeleteProduct,
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

// Endpoints para recetas
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

// Endpoints para recetas
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


