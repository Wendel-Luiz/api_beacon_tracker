const bcrypt = require('bcrypt');

export async function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err: Error, hash: string) => {
      err ? reject(err) : resolve(hash);
    });
  });
}

export async function validatePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err: Error, result: boolean) => {
      err ? reject(err) : resolve(result);
    });
  });
}
