import crypto from "node:crypto";

/**
 * Compare a password with a hashed password.
 */
export function comparePassword(password: string, hashedPassword: string) {
  return new Promise<boolean>((resolve, reject) => {
    const [salt, key] = hashedPassword.split(":");
    if (!salt || !key) throw new Error("Invalid hash");
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(key === derivedKey.toString("hex"));
    });
  });
}
