export interface IPost {
  author: string;
  authorID: string;
  datePublish: string;
  text: string;
  _id: string;
  whoLikes: string[];
  whoIgnore: string[];
}
export interface IInitialStatePostst {
  posts: IPost[];
  allPostsCount: number;
}
