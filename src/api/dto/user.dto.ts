type Token = string | null | undefined;

export interface LoginUserDTO {
  username: string;
  password: string;
  token: Token;
}

export interface CreateUserDTO extends LoginUserDTO {
  email: string;
}

export type UpdateUserPasswordDTO = {
  id: number;
  new_password: string;
  current_password: string;
  token: Token;
};
