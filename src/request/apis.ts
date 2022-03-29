import type {
  IArticle,
  IArticleInfo,
  IFirTag,
  INoticeData,
  IPageData,
  IPageQuery,
  IUserForm,
  IUserInfo,
} from "./../types/common";
import type { IModifyInfo } from "@views/personal/Profile.vue";
import { http } from ".";

const getTags = () => http<IFirTag[]>("get", "/tags/getTags");

const register = (data: Required<IUserForm>) =>
  http("post", "/user/register", data);

const login = (data: Omit<IUserForm, "confirm">) => {
  let url =
    import.meta.env.MODE == "mock"
      ? "http://localhost:3001/user/login"
      : "/user/login";
  return http<IUserInfo>("post", url, data);
};

const logout = () => http("get", "/user/logout");

const modifyProfile = (data: IModifyInfo) =>
  http("post", "/user/updateUserInfo", data);

const modifyPwd = (data: { oldPwd: string; newPwd: string }) =>
  http("post", "/user/updateUserPassword", data);

const getMyArticle = (data: IPageQuery) =>
  http<IPageData<IArticle>>("get", "/article/getSelfUploadArticle", data);

const getArticle = (data: IPageQuery & { keyword?: string; type?: string }) =>
  http<IPageData<IArticleInfo>>("get", "/article/getArticle", data);

const uploadArticle = (data: any) =>
  http<string>("post", "/article/uploadArticle", data);

const getArticleDetail = (id: string) =>
  http<IArticleInfo>("get", "/article/getArticleDetail", { id });

const likes = (data: { id: string; operation: number; type: number }) =>
  http("post", "/comment/addLikes", data);

const deleteArticle = (data: { objectId: string; type: number }) =>
  http("post", "/article/deleteArticle", data);

const comment = (data: {
  objectId: string;
  parentId?: string;
  comment: string;
  type: number;
}) => http("post", "/comment/commentArticle", data);

const getNotice = (data: IPageQuery & { type: number }) =>
  http<IPageData<INoticeData>>("get", "/notice/getNotice", data);

const addNotice = (data: { title: string; content: string; type: number }) =>
  http("post", "/notice/addNotice", data);

const getNoticeDetail = (id: string) =>
  http<IArticleInfo>("get", "/notice/getNoticeById", { id });

const deleteComment = (data: { type: number; id: string }) =>
  http("post", "/comment/deleteComment", data);

const getSensitiveWords = () =>
  http<{ id: string; word: string }[]>("get", "/tags/updateSensitives");

const deleteTag = (data: { id: string; isParent: number }) =>
  http("post", "/tags/delTags");

export {
  getTags,
  register,
  login,
  logout,
  modifyProfile,
  modifyPwd,
  getMyArticle,
  getArticle,
  uploadArticle,
  getArticleDetail,
  likes,
  deleteArticle,
  comment,
  getNotice,
  addNotice,
  getNoticeDetail,
  deleteComment,
  getSensitiveWords,
  deleteTag,
};
