import CryptoJS from "crypto-js";
const key = CryptoJS.SHA256(process.env.REACT_APP_ENCRYPTION_KEY); // Make sure this is a 32-byte key

export function encryptData(text) {
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(text, key, { iv: iv }).toString();
  const finalEncryption = iv.toString() + ":" + encrypted;
  console.log(
    "Before",
    finalEncryption,
    "After Decryptiom",
    decryptData(finalEncryption),
  );
  return finalEncryption;
}

export function decryptData(text) {
  const parts = text.split(":");
  const iv = CryptoJS.enc.Hex.parse(parts.shift());
  const encryptedText = parts.join(":");
  const decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
    iv: iv,
  }).toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted);
}
