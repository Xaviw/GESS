export enum MESSAGE_MODE {
  success = "success",
  error = "error",
  info = "info",
  warn = "warn",
  loading = "loading",
}

export interface IUserForm {
  account: string;
  password: string;
  confirm?: string;
}

export interface ISecTag {
  id: string;
  name: string;
}

export interface IFirTag extends ISecTag {
  children: ISecTag[];
}

export interface IUserInfo {
  id: string;
  account: string;
  name: string;
  face: string;
  type: ROLE;
  sex: SEX;
  phone: string;
  birthday: string;
}

export enum SEX {
  male,
  female,
}

export enum ROLE {
  user,
  administrator,
}

export function isValidKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return key in object;
}

export enum ArticleStatus {
  "未通过",
  "审核中",
  "已通过",
}

export interface IArticle {
  id: string;
  createTime: string;
  title: string;
  url: string;
  status: ArticleStatus;
  reason?: string;
  views: number;
  likes: number;
}

export interface IArticleInfo {
  id: string;
  articleId: string;
  userName: string;
  userId: string;
  createTime: string;
  face?: string;
  title: string;
  url: string;
  views: number;
  likes: number;
  isLikes: 0 | 1;
  tags: { id: string; name: string }[];
  content: string;
  comment?: {
    id: string;
    userId: string;
    userName: string;
    createTime: string;
    comment: string;
    parentName?: string;
    face: string;
  }[];
}

export interface IPageQuery {
  page?: number;
  pageSize?: number;
}

export interface IPageData<T> {
  total: number;
  data: T[];
}
