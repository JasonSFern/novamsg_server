export interface UserAttributes {
  id: number;
  username: string;
  password: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserSession {
  dateCreated: number;
  issued: number;
  expires: number;
  user_data: {
    id: number;
    username: string;
    email: string;
  };
}

export type PartialSession = Omit<UserSession, 'issued' | 'expires'>;

export interface EncodeSessionOutput {
  token: string;
  expires: number;
  issued: number;
  user_data: {
    id: number;
    email: string;
    username: string;
  };
}

export type DecodeSessionOutput =
  | {
      type: 'valid';
      session: UserSession;
    }
  | {
      type: 'integrity-error';
    }
  | {
      type: 'invalid-token';
    };

export type ExpirationStatus = 'expired' | 'active' | 'grace';

export interface UserSessionOutput {
  auth: boolean;
  status: number;
  message: string;
  session?: UserSession | EncodeSessionOutput;
}

export interface PasswordChangeAttributes {
  id: number;
  new_password: string;
  current_password: string;
}
