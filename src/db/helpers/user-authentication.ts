import { randomBytes, scryptSync } from 'crypto';
import { encode, decode, TAlgorithm } from 'jwt-simple';

import {
  UserSession,
  PartialSession,
  EncodeSessionOutput,
  DecodeSessionOutput,
  UserSessionOutput,
  ExpirationStatus,
} from '../interfaces/user.interface';

const jwtSecret: string = process.env.JWT_SECRET_KEY
  ? process.env.JWT_SECRET_KEY
  : 'default_key';

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

function decodeSession(
  secretKey: string,
  tokenString: string
): DecodeSessionOutput {
  // Always use HS512 to decode the token
  const algorithm: TAlgorithm = 'HS512';

  let result: UserSession;

  try {
    result = decode(tokenString, secretKey, false, algorithm);
  } catch (error: any) {
    const e: Error = error;

    // These error strings can be found here:
    // https://github.com/hokaccha/node-jwt-simple/blob/c58bfe5e5bb049015fcd55be5fc1b2d5c652dbcd/lib/jwt.js
    if (
      e.message === 'No token supplied' ||
      e.message === 'Not enough or too many segments'
    ) {
      return {
        type: 'invalid-token',
      };
    }

    if (
      e.message === 'Signature verification failed' ||
      e.message === 'Algorithm not supported'
    ) {
      return {
        type: 'integrity-error',
      };
    }

    // Handle json parse errors, thrown when the payload is nonsense
    if (e.message.indexOf('Unexpected token') === 0) {
      return {
        type: 'invalid-token',
      };
    }

    throw e;
  }

  return {
    type: 'valid',
    session: result,
  };
}

function checkExpirationStatus(token: UserSession): ExpirationStatus {
  const now = Date.now();

  if (token.expires > now) return 'active';

  // Find the timestamp for the end of the token's grace period
  const threeHoursInMs = 3 * 60 * 60 * 1000;
  const threeHoursAfterExpiration = token.expires + threeHoursInMs;

  if (threeHoursAfterExpiration > now) return 'grace';

  return 'expired';
}

export function verifyJwtSessionToken(token: string): UserSessionOutput {
  const decodedSession: DecodeSessionOutput = decodeSession(jwtSecret, token);

  if (
    decodedSession.type === 'integrity-error' ||
    decodedSession.type === 'invalid-token'
  ) {
    return packageUserSession(
      false,
      401,
      `Failed to decode or validate authorization token. Reason: ${decodedSession.type}.`
    );
  }

  const expiration: ExpirationStatus = checkExpirationStatus(
    decodedSession.session
  );

  if (expiration === 'expired') {
    return packageUserSession(
      false,
      401,
      `Authorization token has expired. Please create a new authorization token.`
    );
  }

  let session: UserSession;

  if (expiration === 'grace') {
    // Automatically renew the session and send it back with the response
    // TODO: Secret in env
    const { token, expires, issued } = encodeSession(
      jwtSecret,
      decodedSession.session
    );
    session = {
      ...decodedSession.session,
      expires: expires,
      issued: issued,
    };
  } else {
    session = decodedSession.session;
  }

  let output = packageUserSession(
    true,
    200,
    'Authorization token has been validated or renewed',
    session
  );

  return output;
}

// Create the output object for session creation and validation
export const packageUserSession = (
  auth: boolean,
  status: number,
  message: string,
  session?: UserSession | EncodeSessionOutput
): UserSessionOutput => {
  return { auth, status, message, session };
};
