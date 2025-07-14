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
      'main.*.js',
      'runtime.*.js',
      'polyfills.*.js',
      'styles.*.js',
      'vendor.*.js'
    ])
  ]
};
