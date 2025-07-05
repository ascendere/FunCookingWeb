const fs = require("fs");
const glob = require("glob");
const obfuscator = require("javascript-obfuscator");

const files = glob.sync("dist/fun-cooking-obfuscated/main*.js");

files.forEach((file) => {
    const code = fs.readFileSync(file, "utf8");

    const result = obfuscator.obfuscate(code, {
        compact: true,
        stringArray: true,
        stringArrayEncoding: ["base64"],
        stringArrayThreshold: 0.75
    });

    fs.writeFileSync(file, result.getObfuscatedCode(), "utf8");
    console.log("✔ Ofuscado:", file);
});
