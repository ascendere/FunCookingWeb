# Documentación de Ofuscación en FunCookingWeb

## 1. ¿Qué es la ofuscación?

La ofuscación es una técnica que transforma el código fuente para hacerlo difícil de leer y entender. Su objetivo principal es proteger la lógica de negocio y evitar que terceros puedan copiar, modificar o analizar fácilmente el funcionamiento interno de la aplicación.

## 2. Herramientas utilizadas

- **webpack-obfuscator**:  
  Es un plugin para Webpack que permite ofuscar archivos JavaScript automáticamente durante el proceso de compilación.  
  Convierte el código en una versión difícil de leer, protegiendo la lógica de negocio.

- **@angular-builders/custom-webpack**:  
  Permite personalizar la configuración de Webpack en proyectos Angular.  
  Gracias a este paquete, puedes agregar plugins adicionales (como el obfuscador) al proceso de build de Angular.

- **glob** (devDependency):  
  Utilidad para buscar archivos usando patrones.  
  Se usaba en el script manual de ofuscación, pero ya no es necesario con la integración automática.

- **javascript-obfuscator** (devDependency):  
  Librería de ofuscación para JavaScript.  
  Se usaba en el script manual, pero ahora se utiliza indirectamente a través de `webpack-obfuscator`.

- **webpack-obfuscator** (devDependency):  
  Plugin que integra la funcionalidad de `javascript-obfuscator` directamente en Webpack, permitiendo ofuscar archivos durante el build.

## 3. Proceso paso a paso

### 3.1. Instalación de dependencias

Instala las dependencias necesarias ejecutando el siguiente comando en la raíz del proyecto:

```bash
npm install --save-dev webpack-obfuscator @angular-builders/custom-webpack
```

**¿Qué hace cada paquete?**
- `webpack-obfuscator`: Ofusca los archivos `.js` automáticamente en el build.
- `@angular-builders/custom-webpack`: Permite modificar el proceso de build de Angular para agregar el obfuscador.

### 3.2. Configuración de Angular para usar Webpack personalizado

Abre el archivo `angular.json` y modifica la sección de build para que utilice el builder personalizado:

```json
"build": {
  "builder": "@angular-builders/custom-webpack:browser",
  "options": {
    "customWebpackConfig": {
      "path": "webpack.config.js"
    },
    // ...otras opciones...
  }
}
```

Esto permite que Angular utilice el archivo `webpack.config.js` para agregar plugins adicionales.

### 3.3. Configuración del obfuscador en Webpack

Crea o edita el archivo `webpack.config.js` en la raíz del proyecto y añade la siguiente configuración:

```javascript
const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
  plugins: [
    new JavaScriptObfuscator({
      rotateStringArray: true,
      stringArray: true,
      stringArrayEncoding: ['base64'],
      compact: true,
      debugProtection: true,
      disableConsoleOutput: true
    }, [
      'main.*.js',      // <--- EXCLUIDO para mejor rendimiento
      'runtime.*.js',
      'polyfills.*.js',
      'styles.*.js',
      'vendor.*.js'
    ])
  ]
};
```

**¿Qué significa cada opción?**
- `rotateStringArray`, `stringArray`, `stringArrayEncoding`: Ofuscan las cadenas de texto y las variables.
- `compact`: Minimiza el código.
- `debugProtection`, `disableConsoleOutput`: Dificultan el análisis en consola del navegador.

### 3.4. ¿Por qué se excluye `main.*.js`?

El archivo `main.*.js` contiene la mayor parte de la lógica de la aplicación Angular. Ofuscarlo puede hacer que la carga inicial de la página sea mucho más lenta, especialmente en dispositivos móviles o conexiones lentas. Por eso, para aplicaciones públicas, se recomienda **no ofuscar** `main.*.js` y priorizar la experiencia del usuario.

**Ejemplo visual:**
- Si excluyes `main.*.js`, el código fuente principal será legible y la app cargará rápido.
- Si lo incluyes, el código será ilegible pero la carga será más lenta.

### 3.5. ¿Qué archivos se ofuscan?

Todos los archivos `.js` generados por Angular **excepto** los que están en la lista de exclusión.  
Si tu aplicación usa lazy loading (carga diferida de módulos), se generarán chunks secundarios que sí serán ofuscados.

**Ejemplo:**
- `main.123abc.js` (no ofuscado)
- `123.abcdef.js` (ofuscado si no está en la lista de exclusión)

### 3.6. ¿Cómo verificar la ofuscación?

1. Haz el build de producción:
   ```
   ng build --configuration production
   ```
2. Ve a la carpeta `dist/fun-cooking`.
3. Abre los archivos `.js` que **no estén en la lista de exclusión**.
4. Si ves código ilegible, con nombres y cadenas extrañas, está ofuscado.

**Visualización en el navegador:**
- Abre DevTools (F12) y ve a la pestaña "Sources".
- Busca los archivos `.js` generados.
- Los archivos ofuscados tendrán código difícil de leer.

**¿Por qué a veces no aparecen los archivos `.js` en "Sources"?**
- Si ejecutas tu app en modo desarrollo (`ng serve`), los archivos pueden estar en memoria y no verse como archivos físicos.
- Para ver los archivos `.js` generados por el build de producción, debes servir la carpeta `dist/fun-cooking` con un servidor web estático (por ejemplo, Firebase Hosting, http-server, Nginx, Apache, etc.).
- Una vez desplegada la app, abre la URL pública en tu navegador y revisa "Sources" para ver los archivos `.js` reales.
- Si tu app no usa lazy loading, solo verás los archivos principales (`main.js`, `runtime.js`, etc.) y los que estén ofuscados serán los chunks secundarios.

### 3.7. Consideraciones de rendimiento

Ofuscar archivos grandes como `main.*.js` puede afectar negativamente la velocidad de carga.  
La configuración actual prioriza el rendimiento y la protección parcial del código.

**Recomendación:**  
Solo ofusca chunks secundarios si tu app es pública y necesitas buena velocidad de carga.

### 3.8. Despliegue en Firebase Hosting

- El contenido generado en `dist/fun-cooking` se sube a Firebase Hosting.
- La configuración en `firebase.json` apunta a esa carpeta y asegura el correcto funcionamiento de rutas en Angular.

**Pasos para desplegar:**
1. Instala la CLI de Firebase:
   ```
   npm install -g firebase-tools
   ```
2. Inicia sesión:
   ```
   firebase login
   ```
3. Inicializa el hosting (solo la primera vez):
   ```
   firebase init hosting
   ```
4. Despliega:
   ```
   firebase deploy --only hosting
   ```

### 3.9. Preguntas frecuentes

**¿Puedo ofuscar todo el código?**  
Sí, pero afectará el rendimiento. Hazlo solo si la protección es más importante que la velocidad.

**¿Qué pasa si no tengo chunks secundarios?**  
Solo el archivo principal (`main.*.js`) contendrá tu lógica y, si está excluido, no estará ofuscado.

**¿Cómo puedo forzar la generación de chunks secundarios?**  
Implementa lazy loading en tus módulos Angular.

## 4. Resumen

- Se implementó ofuscación avanzada solo en archivos secundarios para proteger la lógica sin sacrificar el rendimiento.
- El archivo principal `main.*.js` **no se ofusca** para mantener la carga rápida.
- Si necesitas máxima protección y no te preocupa el rendimiento, puedes eliminar `'main.*.js'` de la lista de exclusión.

---

**Autor:** GitHub Copilot  
**Fecha:** 2024
