import * as sha512 from 'js-sha512';

export const chars = 'ABCDEFGHIJKLMNOPQRSTUWXYZabcdefghijklmnopqrstuwxyz0123456789+/';

export function sha(value: string): any {
    return sha512.sha512(value);
}

export function hmac(value: string, key: string): any {
    return sha512.sha512.hmac(key, value);
}

export function addNewLines(str: string): any {
    let finalString = '';
    while (str.length > 0) {
        finalString += `${str.substring(0, 64)}\r\n`;
        str = str.substring(64);
    }
    return finalString;
}

export function convertArrayBufferToString(arrayBuffer: ArrayBuffer): string {
    let str = '';
    const buffer = new Uint8Array(arrayBuffer);
    for (let iii = 0; iii < buffer.byteLength; iii++) {
        str += String.fromCharCode(buffer[iii]);
    }
    return str;
}

//TODO: Verificar logica.
export function convertStringToArrayBuffer(str: string): ArrayBuffer {
    let arrayBuffer = new ArrayBuffer[str.length];
    const bytes = new Uint8Array(arrayBuffer);
    for (let iii = 0; iii < str.length; iii++) {
        bytes[iii] = str.charCodeAt(iii);
    }
    return arrayBuffer;
}

export function convertArrayBufferToBase64(arrayBuffer: ArrayBuffer): string {
    const bytes = new Uint8Array(arrayBuffer);
    let i = 0;
    const len = bytes.length;
    let base64 = '';

    /* tslint:disable */
    for (let i = 0; i < len; i += 3) {
        base64 += chars[bytes[i] >> 2];
        base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
        base64 += chars[bytes[i + 2] & 63];
    }

    /* tslint:enable */
    if (len % 3 == 2) {
        base64 = base64.substring(0, base64.length - 1);
        base64 = `${base64}=`;
    } else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2);
        base64 = `${base64}==`;
    }

    return base64;
}

export function hexEncode(data: string): string {
    let result = '';
    for (const character of data) {
        const hexChar = character.charCodeAt(0).toString(16);
        result += `000${hexChar}`.slice(-4);
    }
    return result;
}