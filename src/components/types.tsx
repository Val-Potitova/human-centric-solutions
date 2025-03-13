export interface PostComment {
  id: number;
  postId: number;
  text: string;
  name: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  date: string;
  image: string;
}
  
export interface RootState {
  posts: Post[];
  comments: Comment[];
}