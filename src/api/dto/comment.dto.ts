export type CreateCommentDTO = {
  user_id: number;
  post_id: number;
  content: string;
};

export type UpdateCommentDTO = CreateCommentDTO;
