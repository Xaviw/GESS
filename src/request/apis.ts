import type {
  IArticle,
  IArticleInfo,
  IFirTag,
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
  http("post", "/user/updateUserInfo");

const modifyPwd = (data: { oldPwd: string; newPwd: string }) =>
  http("post", "/user/updateUserPassword");

const getMyArticle = (data: IPageQuery) =>
  http<IPageData<IArticle>>("get", "/article/getSelfUploadArticle", data);

const getArticle = (data: IPageQuery & { keyword?: string; type?: string }) =>
  http<IPageData<IArticleInfo>>("get", "/article/getArticle");

export {
  getTags,
  register,
  login,
  logout,
  modifyProfile,
  modifyPwd,
  getMyArticle,
  getArticle,
};
