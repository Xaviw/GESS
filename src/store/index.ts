import { IFirTag, isValidKey, IUserInfo, ROLE } from "./../types/common";
import { InjectionKey } from "@vue/runtime-dom";
import { createStore, Store, useStore } from "vuex";

interface IState {
  alreadyLogin: boolean;
  userInfo: IUserInfo | null;
  role: ROLE;
  tags: IFirTag[];
}

export default createStore<IState>({
  state: {
    alreadyLogin: false,
    userInfo: null,
    role: ROLE.user,
    tags: [],
  },
  mutations: {
    modify(state: IState, payload: Partial<IState>) {
      Object.keys(payload).forEach((e) => {
        if (state.hasOwnProperty(e) && isValidKey(e, state)) {
          state[e] = payload[e];
        } else {
          console.error("Vuex更新失败：属性" + e + "在state中未定义！");
        }
      });
    },
  },
});

export const key: InjectionKey<Store<IState>> = Symbol("vuex");

export function myStore() {
  return useStore(key);
}
