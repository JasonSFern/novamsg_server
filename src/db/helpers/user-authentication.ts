import { randomBytes, scryptSync } from 'crypto';
import { encode, TAlgorithm } from 'jwt-simple';

import {
  UserSession,
  PartialSession,
  EncodeSessionOutput,
  UserSessionOutput,
} from '../interfaces/user.interface';

// Converts password string and salt to hashed password
const encryptPassword = (password: string, salt: string) => {
  return scryptSync(password, salt, 32).toString('hex');
};

// Converts the password string and returns hashed password with random salt
export const hashPassword = (password: string): string => {
  const salt = randomBytes(16).toString('hex');
  return encryptPassword(password, salt) + salt;
};

// Match incoming password against the stored hash
export const matchPassword = (password: string, hash: string): Boolean => {
  // extract salt from the hashed string
  // our hex password length is 32*2 = 64
  const salt = hash.slice(64);
  const originalPassHash = hash.slice(0, 64);
  const currentPassHash = encryptPassword(password, salt);
  return originalPassHash === currentPassHash;
};

// Return encoded user session object
export function encodeSession(
  secretKey: string,
  partialSession: PartialSession
): EncodeSessionOutput {
  // Always use HS512 to sign the token
  const algorithm: TAlgorithm = 'HS512';
  // Determine when the token should expire
  const issued = Date.now();
  const fifteenMinutesInMs = 15 * 60 * 1000;
  const expires = issued + fifteenMinutesInMs;
  const session: UserSession = {
    ...partialSession,
    issued: issued,
    expires: expires,
  };

  return {
    token: encode(session, secretKey, algorithm),
    issued: issued,
    expires: expires,
    user_data: session.user_data,
  };
}

// Create the output object for session creation and validation
export const packageUserSession = (
  auth: boolean,
  status: number,
  message: string,
  session: EncodeSessionOutput
): UserSessionOutput => {
  return { auth, status, message, session };
};
