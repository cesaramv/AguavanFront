import * as JsEncryptModule from 'jsencrypt';
import { cipher, util } from 'node-forge';
//import { BackendSymmetricKey } from './interfaces/backend-symmetric-key.interface';
//import { ForgeEncrypted } from './interfaces/forge-encrypted.interface';
import * as utils from './utils.security';

export class Security {
  private _subtleCryto: SubtleCrypto;

  constructor() {
    this._subtleCryto = window.crypto.subtle;
  }

  public exportPublicKey(key: CryptoKey): PromiseLike<string> {
    return this._exportKey('spki', key).then((exportedKey) => {
      const base64 = utils.convertArrayBufferToBase64(exportedKey);
      const pem = utils.addNewLines(base64);
      return `-----BEGIN PUBLIC KEY-----\r\n${pem}-----END PUBLIC KEY-----`;
    });
  }

  public exportPrivateKey(key: CryptoKey): PromiseLike<string> {
    return this._exportKey('pkcs8', key).then((exportedKey) => {
      const base64 = utils.convertArrayBufferToBase64(exportedKey);
      const pem = utils.addNewLines(base64);
      return `-----BEGIN PRIVATE KEY-----\r\n${pem}-----END PRIVATE KEY-----`;
    });
  }

  public encryptRsaPkcs1String(
    data: string,
    publicKey: string,
  ): string | false {
    const encrypt = new JsEncryptModule.JSEncrypt();
    encrypt.setPublicKey(publicKey);
    return encrypt.encrypt(data);
  }

  public decryptRsaPkcs1String(data: any, privateKey: string): string | false {
    const decrypt = new JsEncryptModule.JSEncrypt();
    decrypt.setPrivateKey(privateKey);
    return decrypt.decrypt(data);
  }

 /*  public forgeAesEncrypt(
    data: any,
    { key, iv }: BackendSymmetricKey,
  ): ForgeEncrypted {
    const forgeCipher = cipher.createCipher('AES-GCM', util.decode64(key));
    forgeCipher.start({ iv: util.decode64(iv) });
    forgeCipher.update(util.createBuffer(JSON.stringify(data)));
    forgeCipher.finish();
    const tag = util.encode64(JSON.stringify(forgeCipher.mode.tag));
    const encryptedData = util.encode64(forgeCipher.output.data);
    return { encryptedData, tag };
  } */
  /* public forgeAesDecrypt(
    data: ForgeEncrypted,
    { key, iv }: BackendSymmetricKey,
  ) {
    const decipher = cipher.createDecipher('AES-GCM', util.decode64(key));
    decipher.start({
      iv: util.decode64(iv),
      tag: JSON.parse(util.decode64(data.tag)),
    });
    decipher.update(util.createBuffer(util.decode64(data.encryptedData)));
    decipher.finish();
    const decrypted = decipher.output;
    return JSON.parse(decrypted.data);
  }
  public forgeAesEncryptAndEncodeParams(
    data: string,
    symetricKey: BackendSymmetricKey,
  ) {
    const encrypted = this.forgeAesEncrypt(data, symetricKey);
    return `encryptedData=${utils.hexEncode(
      encrypted.encryptedData,
    )}&tag=${utils.hexEncode(encrypted.tag)}`;
  } */

  public signRsaPkcs1(
    data: string,
    privateKey: CryptoKey,
  ): PromiseLike<string> {
    return this._subtleCryto
      .sign(
        'RSASSA-PKCS1-v1_5',
        privateKey,
        utils.convertStringToArrayBuffer(data),
      )
      .then((signature) => {
        return utils.convertArrayBufferToBase64(signature);
      });
  }

  public generateRsaPkcs1KeyPair(): PromiseLike<CryptoKeyPair> {
    return this._subtleCryto.generateKey(
      {
        name: 'RSASSA-PKCS1-v1_5',
        modulusLength: 2048,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: 'SHA-256',
      },
      true,
      ['sign', 'verify'],
    );
  }

  private _exportKey(
    format: 'raw' | 'pkcs8' | 'spki',
    key: CryptoKey,
  ): PromiseLike<ArrayBuffer> {
    return this._subtleCryto.exportKey(format, key);
  }
}