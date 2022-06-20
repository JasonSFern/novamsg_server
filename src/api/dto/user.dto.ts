export interface LoginUserDTO {
  username: string;
  password: string;
}

export interface CreateUserDTO extends LoginUserDTO {
  email: string;
}

export type UpdateUserPasswordDTO = {
  id: number;
  new_password: string;
  current_password: string;
};
