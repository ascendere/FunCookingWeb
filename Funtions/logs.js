const admin = require('firebase-admin');
const { buildLog } = require('./logger');

// Función genérica
async function logEvento({ uid, evento, detalle, tipo = "INFO", ruta = "" }) {
  await admin.firestore().collection("logs").add(buildLog({ uid, evento, detalle, tipo, ruta }));
}

// Funciones específicas
async function logLoginExitoso({ uid, detalle = "Inicio de sesión exitoso", ruta = "/login" }) {
  await logEvento({ uid, evento: "LOGIN_EXITOSO", detalle, tipo: "INFO", ruta });
}

async function logLoginFallido({ uid = null, detalle = "Intento fallido de inicio de sesión", ruta = "/login" }) {
  await logEvento({ uid, evento: "LOGIN_FALLIDO", detalle, tipo: "ERROR", ruta });
}

// Logout
async function logLogout({ uid, detalle = "Cierre de sesión", ruta = "/logout" }) {
  await logEvento({ uid, evento: "LOGOUT", detalle, tipo: "INFO", ruta });
}

// Productos
async function logCreateProduct({ uid, nombre, ruta = "/create-producto" }) {
  await logEvento({ uid, evento: "CREATE_PRODUCT", detalle: `Producto creado: ${nombre}` , tipo: "INFO", ruta });
}
async function logEditProduct({ uid, id, ruta = "/update-producto" }) {
  await logEvento({ uid, evento: "EDIT_PRODUCT", detalle: `Producto editado: ${id}` , tipo: "INFO", ruta });
}
async function logDeleteProduct({ uid, id, ruta = "/products" }) {
  await logEvento({ uid, evento: "DELETE_PRODUCT", detalle: `Producto eliminado: ${id}` , tipo: "INFO", ruta });
}
async function logErrorCreateProduct({ uid, nombre, error, ruta = "/create-producto" }) {
  await logEvento({ uid, evento: "ERROR_CREATE_PRODUCT", detalle: `Error al crear producto: ${nombre} - ${error}` , tipo: "ERROR", ruta });
}
async function logErrorEditProduct({ uid, id, error, ruta = "/update-producto" }) {
  await logEvento({ uid, evento: "ERROR_EDIT_PRODUCT", detalle: `Error al editar producto: ${id} - ${error}` , tipo: "ERROR", ruta });
}
async function logErrorDeleteProduct({ uid, id, error, ruta = "/products" }) {
  await logEvento({ uid, evento: "ERROR_DELETE_PRODUCT", detalle: `Error al eliminar producto: ${id} - ${error}` , tipo: "ERROR", ruta });
}

// Recetas
async function logCreateRecipe({ uid, nombre, ruta = "/create-recipe" }) {
  await logEvento({ uid, evento: "CREATE_RECIPE", detalle: `Receta creada: ${nombre}` , tipo: "INFO", ruta });
}
async function logEditRecipe({ uid, id, ruta = "/update-recipe" }) {
  await logEvento({ uid, evento: "EDIT_RECIPE", detalle: `Receta editada: ${id}` , tipo: "INFO", ruta });
}
async function logDeleteRecipe({ uid, id, ruta = "/recipes" }) {
  await logEvento({ uid, evento: "DELETE_RECIPE", detalle: `Receta eliminada: ${id}` , tipo: "INFO", ruta });
}
async function logErrorCreateRecipe({ uid, nombre, error, ruta = "/create-recipe" }) {
  await logEvento({ uid, evento: "ERROR_CREATE_RECIPE", detalle: `Error al crear receta: ${nombre} - ${error}` , tipo: "ERROR", ruta });
}
async function logErrorEditRecipe({ uid, id, error, ruta = "/update-recipe" }) {
  await logEvento({ uid, evento: "ERROR_EDIT_RECIPE", detalle: `Error al editar receta: ${id} - ${error}` , tipo: "ERROR", ruta });
}
async function logErrorDeleteRecipe({ uid, id, error, ruta = "/recipes" }) {
  await logEvento({ uid, evento: "ERROR_DELETE_RECIPE", detalle: `Error al eliminar receta: ${id} - ${error}` , tipo: "ERROR", ruta });
}

module.exports = {
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
};
