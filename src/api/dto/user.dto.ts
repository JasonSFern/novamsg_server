export interface LoginUserDTO {
  username: string;
  password: string;
}

export interface CreateUserDTO extends LoginUserDTO {
  email: string;
}
