export interface User {
  id: number;
  username: string;
  password?: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSession {
  auth: boolean;
  status: number;
  message: string;
  session: {
    token: string;
    expires: number;
    issued: number;
    user_data: {
      id: number;
      email: string;
      username: string;
    };
  };
}
