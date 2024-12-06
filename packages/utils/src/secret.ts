export class Secret {
  readonly password: string;

  constructor(password: string) {
    this.password = password;
  }

  private async getPasswordHash(): Promise<ArrayBuffer> {
    const pwUtf8 = new TextEncoder().encode(this.password);
    return await crypto.subtle.digest("SHA-256", pwUtf8);
  }

  private async importKey(
    pwHash: ArrayBuffer,
    iv: Uint8Array
  ): Promise<CryptoKey> {
    const alg = { name: "AES-GCM", iv };
    return await crypto.subtle.importKey("raw", pwHash, alg, false, [
      "encrypt",
      "decrypt",
    ]);
  }

  async encrypt<T>(data: T): Promise<string> {
    const plainText = JSON.stringify(data);
    const ptUtf8 = new TextEncoder().encode(plainText);
    const pwHash = await this.getPasswordHash();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encryptKey = await this.importKey(pwHash, iv);

    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      encryptKey,
      ptUtf8
    );

    return [
      Buffer.from(iv).toString("base64"),
      Buffer.from(encrypted).toString("base64"),
    ].join("|");
  }

  async decrypt<T>(encrypted: string): Promise<T> {
    const [ivBase64, encryptedBase64] = encrypted.split("|");
    const iv = Buffer.from(ivBase64, "base64");
    const encryptedBuffer = Buffer.from(encryptedBase64, "base64");

    const pwHash = await this.getPasswordHash();
    const decryptKey = await this.importKey(pwHash, Uint8Array.from(iv));

    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      decryptKey,
      encryptedBuffer
    );

    const decryptedText = new TextDecoder().decode(decryptedBuffer);
    return JSON.parse(decryptedText) as T;
  }
}
