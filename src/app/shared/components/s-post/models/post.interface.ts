export interface Post {
  _id: string;
  body?: string;
  image?: string;
  user: User;
  createdAt: string;
  comments: (CommentModel | Comments2)[];
  id: string;
}

export interface Comments2 {
  _id: string;
  content: string;
  commentCreator: User;
  post: string;
  createdAt: string;
}

export interface CommentModel {
  _id: string;
  content?: string;
  commentCreator: User;
  post: string;
  createdAt: string;
}

interface User {
  _id: string;
  name: string;
  photo: string;
}
