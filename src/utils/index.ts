import { IUserInfo, ROLE } from "./../types/common";
import { MESSAGE_MODE } from "@/types/common";
import { message } from "ant-design-vue";
import Vrouter from "@/router";
import store from "@/store";
import Cookies from "js-cookie";
import { local } from "./storage";
import { logout } from "@/request/apis";
//导插件包
import dayjs from "dayjs";
//导相对时间插件
import relativeTime from "dayjs/plugin/relativeTime";
//导国际化插件i18n
import "dayjs/locale/zh-cn";
dayjs.extend(relativeTime);

const types = new Set();

/**
 * 不显示重复消息的Message
 * @param mode message模式
 * @param msg 消息文本
 */
function globalMessage(mode: MESSAGE_MODE, msg: string) {
  if (!types.has(msg)) {
    types.add(msg);
    message[mode](msg).then(
      () => {
        types.delete(msg);
      },
      () => {
        types.delete(msg);
      }
    );
  }
}

const redirectToLogin = () => {
  const route = Vrouter.currentRoute.value;
  const router = Vrouter;
  router.push(`/login?redirect=${route.fullPath}`);
};

const initUserState = () => {
  if (Cookies.get("user")) {
    const userInfo: IUserInfo = local.get("userInfo");
    if (userInfo) {
      store.commit("modify", {
        alreadyLogin: true,
        userInfo,
        role: userInfo.type,
      });
    } else {
      message.error("登录信息已失效，请重新登录！");
      handleLogout();
    }
  }
};

const handleLogout = () => {
  logout().then(() => {
    store.commit("modify", {
      alreadyLogin: false,
      userInfo: null,
      role: ROLE.user,
    });
    local.remove("userInfo");
    Cookies.remove("user");
    const route = Vrouter.currentRoute.value;
    const router = Vrouter;
    if (route.meta.needLogin) {
      router.replace("/");
    }
  });
};

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
}

const relTime = (strDate: string) => {
  return dayjs().locale("zh-cn").from(strDate);
};

const navigateIfLogin = (target: string, resetMenu: boolean = true) => {
  const router = Vrouter;
  if (store.state.alreadyLogin) {
    router.push(target);
    if (resetMenu) {
      store.commit("modify", {
        currentMenu: [],
      });
    }
  } else {
    router.push("/login");
  }
};

const COLOR = ["pink", "red", "orange", "green", "cyan", "blue", "purple"];

export {
  globalMessage,
  redirectToLogin,
  initUserState,
  handleLogout,
  getBase64,
  relTime,
  navigateIfLogin,
  COLOR,
};
