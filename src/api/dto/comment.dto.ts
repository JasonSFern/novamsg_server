type Token = string | null | undefined;

export type CreateCommentDTO = {
  user_id: number;
  post_id: number;
  content: string;
  token: Token;
};

export type UpdateCommentDTO = CreateCommentDTO;
