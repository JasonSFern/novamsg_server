interface Session {
  issued: number;
  expires: number;
  user_data: {
    id: number;
    email: string;
    username: string;
  };
}

interface VerifySession extends Session {
  token: string;
}

interface InitialSession extends Session {
  dateCreated: number;
}

export interface User {
  id: number;
  username: string;
  password?: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserSession {
  auth: boolean;
  status: number;
  message: string;
  session?: InitialSession | VerifySession;
}
