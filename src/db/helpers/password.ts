import { randomBytes, scryptSync } from 'crypto';

// Converts password string and salt to hashed password
const encryptPassword = (password: string, salt: string) => {
  return scryptSync(password, salt, 32).toString('hex');
};

// Converts the password string and returns hashed password with random salt
export const hashPassword = (password: string): string => {
  const salt = randomBytes(16).toString('hex');
  return encryptPassword(password, salt) + salt;
};
