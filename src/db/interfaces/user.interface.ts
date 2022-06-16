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

export interface UserSessionOutput {
  auth: boolean;
  status: number;
  message: string;
  session: EncodeSessionOutput;
}
