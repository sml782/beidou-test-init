import * as Crypto from 'crypto-js';

const AuthTokenKey = 'sssgggooolldddll'; // AES密钥
const AuthTokenIv = 'sssssmmmmmlllll0'; // AES向量

const key = Crypto.enc.Utf8.parse(AuthTokenKey); // 十六位十六进制数作为密钥
const iv = Crypto.enc.Utf8.parse(AuthTokenIv); // 十六位十六进制数作为密钥偏移量

/**
 * AES加密
 * @param {*} word -要加密的文本
 */
export function Encrypt(word) {
  const srcs = Crypto.enc.Utf8.parse(word);
  const encrypted = Crypto.AES.encrypt(srcs, key, { iv, mode: Crypto.mode.CBC, padding: Crypto.pad.Pkcs7 });
  return encrypted.ciphertext.toString().toUpperCase();
}

/**
 * AES解密
 * @param {*} word -要解密的文本
 */
export function Decrypt(word) {
  const encryptedHexStr = Crypto.enc.Hex.parse(word);
  const srcs = Crypto.enc.Base64.stringify(encryptedHexStr);
  const decrypt = Crypto.AES.decrypt(srcs, key, { iv, mode: Crypto.mode.CBC, padding: Crypto.pad.Pkcs7 });
  const decryptedStr = decrypt.toString(Crypto.enc.Utf8);
  return decryptedStr.toString();
}
