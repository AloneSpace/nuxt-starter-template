const crypto = require("crypto");
const fs = require("fs");

const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "pem"
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem"
  }
});

//* For generate private key 🔑 🔑 🔑
fs.writeFileSync(
  `${process.cwd()}/api/utils/secret_key/private.key`,
  privateKey
);

//* For generate public key 🔑 🔑 🔑
fs.writeFileSync(`${process.cwd()}/api/utils/secret_key/public.key`, publicKey);

console.log("🔑 Generate key successful. ✅");
